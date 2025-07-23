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
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

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
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [cameraFacing, setCameraFacing] = useState('front'); // Changed to front for selfie
  const [isProcessing, setIsProcessing] = useState(false);
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [countdown, setCountdown] = useState(null);

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
    setCapturedPhotos([]);
    setIsCapturing(false);
    setCountdown(null);
  };

  const toggleCameraFacing = () => {
    setCameraFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  // Auto-capture functionality
  const startAutoCapture = () => {
    if (isCapturing) return;
    
    setIsCapturing(true);
    setCountdown(3);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          takePicture();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;
    
    try {
      setIsProcessing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
        exif: false,
      });
      
      await processPhoto(photo.uri);
      
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to take picture');
    } finally {
      setIsCapturing(false);
      setIsProcessing(false);
    }
  };

  const savePhotoToLibrary = async (photoUri) => {
    try {
      if (!mediaPermission?.granted) {
        const permission = await requestMediaPermission();
        if (!permission.granted) {
          Alert.alert('Permission Required', 'Media library permission is required to save photos');
          return null;
        }
      }
      const asset = await MediaLibrary.saveToLibraryAsync(photoUri);
      return asset;
    } catch (error) {
      console.error('Error saving photo:', error);
      Alert.alert('Error', 'Failed to save photo to library');
      return null;
    }
  };

  const processPhoto = async (photoUri) => {
    try {
      // Save to library
      const asset = await savePhotoToLibrary(photoUri);
      
      // Create a photo object with metadata
      const photoData = {
        id: Date.now(),
        uri: photoUri,
        timestamp: new Date().toISOString(),
        cameraFacing,
        asset,
        filename: `selfie_${Date.now()}.jpg`,
        description: `Selfie taken with ${cameraFacing} camera`
      };

      // Add to captured photos
      setCapturedPhotos(prev => [...prev, photoData]);

      // Save metadata
      await savePhotoMetadata(photoData);

      // Upload to backend (optional)
      try {
        await uploadPhotoToBackend(photoData);
        Alert.alert('Success!', 'Photo captured and uploaded successfully!');
      } catch (error) {
        Alert.alert('Partial Success', 'Photo saved locally but upload failed');
      }

    } catch (error) {
      console.error('Error processing photo:', error);
      Alert.alert('Error', 'Failed to process photo');
    }
  };

  const savePhotoMetadata = async (photoData) => {
    try {
      const metadataDir = `${FileSystem.documentDirectory}photos/`;
      await FileSystem.makeDirectoryAsync(metadataDir, { intermediates: true });
      
      const metadataPath = `${metadataDir}photo_${photoData.id}_metadata.json`;
      await FileSystem.writeAsStringAsync(metadataPath, JSON.stringify(photoData, null, 2));
      
      return metadataPath;
    } catch (error) {
      console.error('Error saving metadata:', error);
    }
  };

  const uploadPhotoToBackend = async (photoData) => {
    const formData = new FormData();
    formData.append('photo', {
      uri: photoData.uri,
      type: 'image/jpeg',
      name: photoData.filename
    });
    formData.append('metadata', JSON.stringify({
      timestamp: photoData.timestamp,
      cameraFacing: photoData.cameraFacing,
      description: photoData.description
    }));

    const response = await fetch('https://your-backend-api.com/api/process-photo', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP status ${response.status}`);
    }

    return response.json();
  };

  const renderPhotosGrid = () => {
    if (capturedPhotos.length === 0) return null;
    
    return (
      <ScrollView style={styles.photosContainer} contentContainerStyle={styles.photosContent}>
        <Text style={styles.photosTitle}>Captured Photos ({capturedPhotos.length})</Text>
        <View style={styles.photosGrid}>
          {capturedPhotos.map(photo => (
            <View key={photo.id} style={styles.photoItem}>
              <Image source={{ uri: photo.uri }} style={styles.photoThumbnail} />
              <Text style={styles.photoTimestamp}>
                {new Date(photo.timestamp).toLocaleTimeString()}
              </Text>
              <Text style={styles.photoDescription} numberOfLines={2}>
                {photo.description}
              </Text>
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
          <View style={styles.centerContainer}>
            <Text>Requesting camera permissions...</Text>
          </View>
        </SafeAreaView>
      );
    }

    if (!permission.granted) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>Camera permission not granted</Text>
            <TouchableOpacity style={styles.actionButton} onPress={requestPermission}>
              <Text style={styles.actionButtonText}>Grant Permission</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={goBack}>
              <Text style={styles.actionButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <View style={styles.cameraContainer}>
        <CameraView ref={cameraRef} style={styles.camera} facing={cameraFacing} />
        
        {/* Countdown overlay */}
        {countdown && (
          <View style={styles.countdownOverlay}>
            <Text style={styles.countdownText}>{countdown}</Text>
          </View>
        )}
        
        <View style={styles.topCameraControls}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reverseButton} onPress={toggleCameraFacing}>
            <Text style={styles.reverseButtonText}>🔄</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cameraControls}>
          <TouchableOpacity
            style={[
              styles.captureButton,
              isCapturing && styles.capturingButton,
              isProcessing && styles.processingButton
            ]}
            onPress={startAutoCapture}
            disabled={isCapturing || isProcessing}
          >
            <Text style={styles.captureButtonText}>
              {isProcessing ? 'Processing...' : 
               isCapturing ? `Get Ready! ${countdown || ''}` : 
               'Take Selfie (3s)'}
            </Text>
          </TouchableOpacity>
        </View>

        {capturedPhotos.length > 0 && !isProcessing && (
          <View style={styles.photosOverlay}>
            {renderPhotosGrid()}
          </View>
        )}

        {isProcessing && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>📸 Processing photo...</Text>
            <Text style={styles.resultText}>💾 Saving to library...</Text>
            <Text style={styles.resultText}>⬆️ Uploading to backend...</Text>
          </View>
        )}

        {capturedPhotos.length > 0 && !isProcessing && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>✅ Photos captured: {capturedPhotos.length}</Text>
            <Text style={styles.resultText}>📷 Camera: {cameraFacing}</Text>
            <Text style={styles.resultText}>💾 Storage: Local + Cloud</Text>
            <Text style={styles.resultText}>🎯 Ready for posture analysis</Text>
          </View>
        )}
      </View>
    );
  };

  const renderWiFiScreen = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
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
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
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
  countdownOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: 2 },
  countdownText: { fontSize: 120, fontWeight: 'bold', color: 'white', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: {width: -2, height: 2}, textShadowRadius: 10 },
  topCameraControls: { position: 'absolute', top: 50, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, zIndex: 1 },
  reverseButton: { backgroundColor: 'rgba(0,0,0,0.6)', padding: 12, borderRadius: 25, alignItems: 'center', justifyContent: 'center', minWidth: 50, minHeight: 50 },
  reverseButtonText: { fontSize: 20, textAlign: 'center' },
  cameraControls: { position: 'absolute', bottom: 50, left: 0, right: 0, alignItems: 'center' },
  captureButton: { backgroundColor: '#FF3B30', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 25, minWidth: 150, alignItems: 'center' },
  capturingButton: { backgroundColor: '#FF9500' },
  processingButton: { backgroundColor: '#007AFF' },
  captureButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  resultContainer: { position: 'absolute', top: 120, left: 20, right: 20, backgroundColor: 'rgba(0,0,0,0.8)', padding: 15, borderRadius: 8, zIndex: 1 },
  resultText: { color: 'white', fontSize: 14, textAlign: 'center', marginVertical: 2 },
  errorText: { fontSize: 16, color: '#FF3B30', textAlign: 'center', marginBottom: 20 },
  actionButton: { backgroundColor: '#007AFF', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 8, marginTop: 15 },
  actionButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  photosOverlay: { position: 'absolute', bottom: 150, left: 0, right: 0, maxHeight: 200, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 1 },
  photosContainer: { maxHeight: 200 },
  photosContent: { padding: 10 },
  photosTitle: { color: 'white', fontSize: 16, fontWeight: '600', textAlign: 'center', marginBottom: 10 },
  photosGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
  photoItem: { width: screenWidth / 6 - 5, marginBottom: 10, alignItems: 'center' },
  photoThumbnail: { width: '100%', aspectRatio: 1, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4 },
  photoTimestamp: { color: '#ccc', fontSize: 6, textAlign: 'center', marginTop: 2 },
  photoDescription: { color: '#ccc', fontSize: 6, textAlign: 'center', lineHeight: 8 },
});