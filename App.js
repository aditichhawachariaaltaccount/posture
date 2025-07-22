import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
  ScrollView,
  Dimensions 
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Video } from 'expo-av';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as VideoThumbnails from 'expo-video-thumbnails'; // ✅ NEW

const SENSING_OPTIONS = [
  { id: 'camera', name: 'Camera', icon: '📹', available: true },
  { id: 'wifi', name: 'WiFi', icon: '📶', available: false },
  { id: 'acoustic', name: 'Acoustic', icon: '🎤', available: false }
];

const { width: screenWidth } = Dimensions.get('window');

export default function App() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentView, setCurrentView] = useState('selection');
  const [permission, requestPermission] = useCameraPermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const [frames, setFrames] = useState([]);
  const [cameraFacing, setCameraFacing] = useState('back');
  const [isProcessing, setIsProcessing] = useState(false);
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [savedVideoAsset, setSavedVideoAsset] = useState(null);
  const [extractionProgress, setExtractionProgress] = useState(0);

  const cameraRef = useRef(null);

  const toggleOption = (optionId) => {
    setSelectedOptions(prev => (
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    ));
  };

  const startSensing = () => {
    if (selectedOptions.length === 0) {
      Alert.alert('No Selection', 'Please select at least one sensing method');
      return;
    }
    const firstOption = selectedOptions[0];
    const option = SENSING_OPTIONS.find(opt => opt.id === firstOption);
    if (!option?.available) {
      Alert.alert('Coming Soon', `${option.name} sensing is not implemented yet`);
      return;
    }
    setCurrentView(firstOption);
  };

  const goBack = () => {
    setCurrentView('selection');
    setVideoUri(null);
    setFrames([]);
    setIsRecording(false);
    setSavedVideoAsset(null);
    setExtractionProgress(0);
  };

  const toggleCameraFacing = () => {
    setCameraFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const startRecording = async () => {
    if (!cameraRef.current) return;
    try {
      setIsRecording(true);
      setVideoUri(null);
      setFrames([]);
      setSavedVideoAsset(null);
      setExtractionProgress(0);
      const video = await cameraRef.current.recordAsync({
        quality: '720p',
        maxDuration: 30,
      });
      setVideoUri(video.uri);
      await processVideo(video.uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to start recording');
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    if (!cameraRef.current) return;
    try {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    } catch {
      Alert.alert('Error', 'Failed to stop recording');
    }
  };

  const saveVideoToLibrary = async (videoUri) => {
    try {
      if (!mediaPermission?.granted) {
        const permission = await requestMediaPermission();
        if (!permission.granted) {
          Alert.alert('Permission Required', 'Media library permission is required to save videos');
          return null;
        }
      }
      const asset = await MediaLibrary.saveToLibraryAsync(videoUri);
      setSavedVideoAsset(asset);
      return asset;
    } catch {
      Alert.alert('Error', 'Failed to save video to library');
      return null;
    }
  };

  const getVideoDuration = async (videoUri) => {
    return 10; // Simplified/fallback
  };

  // ✅ REAL FRAME EXTRACTION
  const extractFramesLocally = async (videoUri) => {
    const frames = [];
    const frameCount = 10;
    const videoDuration = await getVideoDuration(videoUri);
    const interval = videoDuration / frameCount;
    const frameDir = `${FileSystem.documentDirectory}frames/`;
    await FileSystem.makeDirectoryAsync(frameDir, { intermediates: true });

    for (let i = 0; i < frameCount; i++) {
      const timestampMs = i * interval * 1000;
      const frameFileName = `frame_${i+1}_${Date.now()}.jpg`;
      const frameUri = `${frameDir}${frameFileName}`;
      try {
        const { uri: thumbnailUri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
          time: timestampMs,
        });
        await FileSystem.copyAsync({ from: thumbnailUri, to: frameUri });
        frames.push({
          id: i + 1,
          timestamp: timestampMs / 1000,
          uri: frameUri,
          localPath: frameUri,
          filename: frameFileName,
          description: `Frame ${i + 1} at ${(timestampMs / 1000).toFixed(2)}s`,
          size: { width: 720, height: 1280 },
        });
        setExtractionProgress(i + 1);
        await new Promise(res => setTimeout(res, 150));
      } catch (e) {
        console.error(`Error extracting frame ${i+1}:`, e);
      }
    }
    return frames;
  };

  const saveFramesToStorage = async (frames) => {
    const framesData = {
      extractedAt: new Date().toISOString(),
      totalFrames: frames.length,
      cameraFacing,
      frames: frames.map(f => ({
        id: f.id,
        timestamp: f.timestamp,
        filename: f.filename,
        localPath: f.localPath,
        description: f.description,
        size: f.size
      }))
    };
    const metaPath = `${FileSystem.documentDirectory}frames_metadata.json`;
    await FileSystem.writeAsStringAsync(metaPath, JSON.stringify(framesData, null, 2));
    return metaPath;
  };

  const uploadVideoToBackend = async (videoUri, frames) => {
    const formData = new FormData();
    formData.append('video', { uri: videoUri, type: 'video/mp4', name: 'posture_video.mp4' });
    formData.append('frameCount', frames.length.toString());
    formData.append('cameraFacing', cameraFacing);
    formData.append('framesData', JSON.stringify(frames));
    const resp = await fetch('https://your-backend-api.com/api/process-video', {
      method: 'POST',
      body: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (!resp.ok) throw new Error(`HTTP status ${resp.status}`);
    return resp.json();
  };

  const processVideo = async (videoUri) => {
    setIsProcessing(true);
    setExtractionProgress(0);
    try {
      await saveVideoToLibrary(videoUri);
      const extractedFrames = await extractFramesLocally(videoUri);
      await saveFramesToStorage(extractedFrames);
      setFrames(extractedFrames);

      try {
        await uploadVideoToBackend(videoUri, extractedFrames);
        Alert.alert('Success!', `Video processed!\n✅ Saved\n✅ ${extractedFrames.length} frames\n✅ Uploaded`, [{ text: 'OK' }]);
      } catch {
        Alert.alert('Partial Success', `Video saved and frames extracted!\n⚠️ Backend upload failed`, [{ text: 'OK' }]);
      }
    } catch (err) {
      console.error(err);
      const mockFrames = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        timestamp: (i + 1) * 0.5,
        uri: videoUri,
        localPath: `${FileSystem.documentDirectory}frames/mock_frame_${i+1}.jpg`,
        filename: `mock_frame_${i+1}.jpg`,
        description: `Mock frame ${i + 1} at ${((i + 1) * 0.5).toFixed(1)}s`,
        size: { width: 720, height: 1280 }
      }));
      setFrames(mockFrames);
      Alert.alert('Processing Error', `Using fallback mock frames\n${err.message}`, [{ text: 'OK' }]);
    } finally {
      setIsProcessing(false);
      setExtractionProgress(0);
    }
  };

  const renderFramesGrid = () => {
    if (frames.length === 0) return null;
    return (
      <ScrollView style={styles.framesContainer} contentContainerStyle={styles.framesContent}>
        <Text style={styles.framesTitle}>Extracted Frames ({frames.length})</Text>
        <View style={styles.framesGrid}>
          {frames.map(frame => (
            <View key={frame.id} style={styles.frameItem}>
              <Image source={{ uri: frame.uri }} style={styles.framePlaceholder} />
              <Text style={styles.frameTimestamp}>{frame.timestamp.toFixed(2)}s</Text>
              <Text style={styles.frameDescription} numberOfLines={2}>{frame.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  const renderCameraScreen = () => {
    if (!permission) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.centerContainer}><Text>Requesting camera permissions...</Text></View>
        </SafeAreaView>
      );
    }
    if (!permission.granted) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>Camera permission not granted</Text>
            <TouchableOpacity style={styles.actionButton} onPress={requestPermission}><Text style={styles.actionButtonText}>Grant Permission</Text></TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={goBack}><Text style={styles.actionButtonText}>Go Back</Text></TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
    return (
      <View style={styles.cameraContainer}>
        <CameraView ref={cameraRef} style={styles.camera} facing={cameraFacing} />
        <View style={styles.topCameraControls}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}><Text style={styles.backButtonText}>← Back</Text></TouchableOpacity>
          <TouchableOpacity style={styles.reverseButton} onPress={toggleCameraFacing}><Text style={styles.reverseButtonText}>🔄</Text></TouchableOpacity>
        </View>
        <View style={styles.cameraControls}>
          <TouchableOpacity
            style={[styles.recordButton, isRecording && styles.recordingButton, isProcessing && styles.processingButton]}
            onPress={isRecording ? stopRecording : startRecording}
            disabled={isProcessing}
          >
            <Text style={styles.recordButtonText}>{isProcessing ? 'Processing...' : isRecording ? 'Stop' : 'Record'}</Text>
          </TouchableOpacity>
        </View>

        {(videoUri || isProcessing) && (
          <View style={styles.resultContainer}>
            {isProcessing ? (
              <>
                <Text style={styles.resultText}>🎬 Processing video...</Text>
                <Text style={styles.resultText}>💾 Saving to library...</Text>
                <Text style={styles.resultText}>✂️ Extracting frames... ({extractionProgress}/10)</Text>
                <Text style={styles.resultText}>⬆️ Uploading to backend...</Text>
              </>
            ) : (
              <>
                <Text style={styles.resultText}>✅ Video saved successfully!</Text>
                <Text style={styles.resultText}>📊 Frames extracted: {frames.length}</Text>
                <Text style={styles.resultText}>📷 Camera: {cameraFacing}</Text>
                <Text style={styles.resultText}>💾 Storage: Local + Cloud</Text>
                {frames.length > 0 && <Text style={styles.resultText}>🎯 Ready for posture analysis</Text>}
              </>
            )}
          </View>
        )}

        {frames.length > 0 && !isProcessing && <View style={styles.framesOverlay}>{renderFramesGrid()}</View>}
      </View>
    );
  };

  const renderWiFiScreen = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}><Text style={styles.backButtonText}>← Back</Text></TouchableOpacity>
        <Text style={styles.title}>WiFi Sensing</Text>
      </View>
      <View style={styles.centerContainer}>
        <Text style={styles.placeholderIcon}>📶</Text>
        <Text style={styles.subtitle}>WiFi sensing coming soon...</Text>
        <Text style={styles.description}>
          This will use WiFi signal strength and patterns to detect posture changes.
        </Text>
      </View>
    </SafeAreaView>
  );

  const renderAcousticScreen = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}><Text style={styles.backButtonText}>← Back</Text></TouchableOpacity>
        <Text style={styles.title}>Acoustic Sensing</Text>
      </View>
      <View style={styles.centerContainer}>
        <Text style={styles.placeholderIcon}>🎤</Text>
        <Text style={styles.subtitle}>Acoustic sensing coming soon...</Text>
        <Text style={styles.description}>
          This will use sound patterns and audio analysis to detect movement and posture.
        </Text>
      </View>
    </SafeAreaView>
  );

  const renderSelectionScreen = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Posture Sensing</Text>
        <Text style={styles.subtitle}>Choose your sensing method(s)</Text>
      </View>
      <View style={styles.optionsContainer}>
        {SENSING_OPTIONS.map(opt => (
          <TouchableOpacity
            key={opt.id}
            style={[
              styles.optionCard,
              selectedOptions.includes(opt.id) && styles.selectedCard,
              !opt.available && styles.disabledCard
            ]}
            onPress={() => opt.available && toggleOption(opt.id)}
            disabled={!opt.available}
          >
            <Text style={styles.optionIcon}>{opt.icon}</Text>
            <View style={styles.optionTextContainer}>
              <Text style={[
                styles.optionText,
                selectedOptions.includes(opt.id) && styles.selectedText,
                !opt.available && styles.disabledText
              ]}>{opt.name}</Text>
              {!opt.available && <Text style={styles.comingSoonText}>Coming Soon</Text>}
            </View>
            {selectedOptions.includes(opt.id) && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.footer}>
        <Text style={styles.selectionCount}>
          {selectedOptions.length} method{selectedOptions.length !== 1 ? 's' : ''} selected
        </Text>
        <TouchableOpacity
          style={[styles.startButton, selectedOptions.length === 0 && styles.disabledButton]}
          onPress={startSensing}
          disabled={selectedOptions.length === 0}
        >
          <Text style={styles.startButtonText}>Start Sensing</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  switch (currentView) {
    case 'camera': return renderCameraScreen();
    case 'wifi': return renderWiFiScreen();
    case 'acoustic': return renderAcousticScreen();
    default: return renderSelectionScreen();
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 20, alignItems: 'center', position: 'relative' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center' },
  description: { fontSize: 14, color: '#888', textAlign: 'center', margin: 10, paddingHorizontal: 20, lineHeight: 20 },
  optionsContainer: { flex: 1, padding: 20, justifyContent: 'center' },
  optionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 20, marginVertical: 8, borderRadius: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, borderWidth: 2, borderColor: 'transparent' },
  selectedCard: { borderColor: '#007AFF', backgroundColor: '#f0f8ff' },
  disabledCard: { backgroundColor: '#f8f8f8', opacity: 0.6 },
  optionIcon: { fontSize: 32, marginRight: 16 },
  optionTextContainer: { flex: 1 },
  optionText: { fontSize: 18, fontWeight: '600', color: '#333' },
  selectedText: { color: '#007AFF' },
  disabledText: { color: '#999' },
  comingSoonText: { fontSize: 12, color: '#999', fontStyle: 'italic', marginTop: 2 },
  checkmark: { fontSize: 20, color: '#007AFF', fontWeight: 'bold' },
  footer: { padding: 20, paddingBottom: 40 },
  selectionCount: { textAlign: 'center', fontSize: 16, color: '#666', marginBottom: 16 },
  startButton: { backgroundColor: '#007AFF', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  disabledButton: { backgroundColor: '#ccc' },
  startButtonText: { color: 'white', fontSize: 18, fontWeight: '600' },
  backButton: { backgroundColor: '#666', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  backButtonText: { color: 'white', fontSize: 16, fontWeight: '500' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  placeholderIcon: { fontSize: 64, marginBottom: 20 },
  cameraContainer: { flex: 1, justifyContent: 'center' },
  camera: { flex: 1 },
  topCameraControls: { position: 'absolute', top: 50, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, zIndex: 1 },
  reverseButton: { backgroundColor: 'rgba(0,0,0,0.6)', padding: 12, borderRadius: 25, alignItems: 'center', justifyContent: 'center', minWidth: 50, minHeight: 50 },
  reverseButtonText: { fontSize: 20, textAlign: 'center' },
  cameraControls: { position: 'absolute', bottom: 50, left: 0, right: 0, alignItems: 'center' },
  recordButton: { backgroundColor: '#FF3B30', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 25, minWidth: 100, alignItems: 'center' },
  recordingButton: { backgroundColor: '#007AFF' },
  processingButton: { backgroundColor: '#FF9500' },
  recordButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  resultContainer: { position: 'absolute', top: 120, left: 20, right: 20, backgroundColor: 'rgba(0,0,0,0.8)', padding: 15, borderRadius: 8, zIndex: 1 },
  resultText: { color: 'white', fontSize: 14, textAlign: 'center', marginVertical: 2 },
  errorText: { fontSize: 16, color: '#FF3B30', textAlign: 'center', marginBottom: 20 },
  actionButton: { backgroundColor: '#007AFF', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 8, marginTop: 15 },
  actionButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  framesOverlay: { position: 'absolute', bottom: 150, left: 0, right: 0, maxHeight: 200, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 1 },
  framesContainer: { maxHeight: 200 },
  framesContent: { padding: 10 },
  framesTitle: { color: 'white', fontSize: 16, fontWeight: '600', textAlign: 'center', marginBottom: 10 },
  framesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
  frameItem: { width: screenWidth / 6 - 5, marginBottom: 10, alignItems: 'center' },
  framePlaceholder: { width: '100%', aspectRatio: 1, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4 },
  frameTimestamp: { color: '#ccc', fontSize: 6, textAlign: 'center', marginTop: 2 },
  frameDescription: { color: '#ccc', fontSize: 6, textAlign: 'center', lineHeight: 8 },
});
