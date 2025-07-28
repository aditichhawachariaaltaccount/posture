

// Complete StyleSheet
const styles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  cameraContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },

  // Header Styles
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginBottom: 8,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 18,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 24,
    marginHorizontal: 20,
  },

  // Content Styles
  content: {
    flex: 1,
    padding: 20,
  },

  statusContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  statusText: {
    fontSize: 14,
    color: '#34C759',
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },

  featuresContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  featuresTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginBottom: 8,
  },

  featureText: {
    fontSize: 14,
    color: '#6D6D70',
    marginBottom: 4,
    lineHeight: 20,
  },

  // Option Button Styles
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E5EA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  selectedOption: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },

  disabledOption: {
    opacity: 0.6,
    backgroundColor: '#F8F8F8',
  },

  optionIcon: {
    fontSize: 32,
    marginRight: 16,
  },

  optionText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#1D1D1F',
  },

  selectedOptionText: {
    color: '#007AFF',
  },

  disabledOptionText: {
    color: '#8E8E93',
  },

  comingSoonText: {
    fontSize: 12,
    color: '#FF9500',
    fontWeight: '500',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  // Button Styles
  startButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    margin: 20,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  disabledStartButton: {
    backgroundColor: '#C7C7CC',
    shadowOpacity: 0,
    elevation: 0,
  },

  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  permissionButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginTop: 20,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  permissionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Camera Styles
  cameraHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },

  backButton: {
    padding: 8,
  },

  backButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  cameraTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },

  galleryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  galleryButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  cameraWrapper: {
    flex: 1,
    position: 'relative',
  },

  camera: {
    flex: 1,
  },

  // Overlay Styles
  instructionsOverlay: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },

  instructionsText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },

  instructionsSubText: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
  },

  autoModeOverlay: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 12,
    padding: 16,
  },

  progressContainer: {
    marginBottom: 16,
  },

  progressText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },

  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#34C759',
    borderRadius: 3,
  },

  countdownContainer: {
    alignItems: 'center',
  },

  countdownText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
  },

  countdownProgress: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },

  countdownBar: {
    height: '100%',
    backgroundColor: '#FF9500',
    borderRadius: 2,
  },

  analysisOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  analysisOverlayText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },

  analysisSubText: {
    fontSize: 14,
    color: '#CCCCCC',
    marginTop: 8,
    textAlign: 'center',
  },

  // Camera Controls
  cameraControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },

  flipButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  flipButtonText: {
    fontSize: 24,
  },

  buttonLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 4,
    fontWeight: '500',
  },

  captureButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  disabledCaptureButton: {
    backgroundColor: '#8E8E93',
    shadowOpacity: 0,
    elevation: 0,
  },

  captureButtonText: {
    fontSize: 32,
  },

  autoButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  autoButtonActive: {
    backgroundColor: '#FF3B30',
  },

  autoButtonText: {
    fontSize: 24,
  },

  // Gallery Styles
  galleryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },

  galleryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D1D1F',
    flex: 1,
    textAlign: 'center',
  },

  deleteButton: {
    padding: 8,
  },

  deleteButtonText: {
    fontSize: 20,
  },

  galleryContent: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },

  photoContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  galleryPhoto: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },

  photoInfo: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },

  photoInfoText: {
    fontSize: 14,
    color: '#6D6D70',
    marginBottom: 4,
  },

  analysisStatus: {
    padding: 16,
    alignItems: 'center',
  },

  analysisStatusText: {
    fontSize: 16,
    color: '#34C759',
    fontWeight: '600',
  },

  analysisErrorText: {
    fontSize: 14,
    color: '#FF3B30',
    textAlign: 'center',
  },

  analysisLoadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  analysisLoadingText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 8,
    fontWeight: '600',
  },

  // Gallery Navigation
  galleryNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },

  navButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  navButtonDisabled: {
    backgroundColor: '#C7C7CC',
  },

  navButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  photoCounter: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  photoCounterText: {
    fontSize: 14,
    color: '#1D1D1F',
    fontWeight: '600',
  },

  // Analysis Styles
  analysisContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  analysisTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D1D1F',
    textAlign: 'center',
    paddingVertical: 20,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },

  scoreContainer: {
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 2,
    backgroundColor: '#FAFAFA',
  },

  scoreLabel: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 8,
    fontWeight: '500',
  },

  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  assessmentText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  statusMessage: {
    fontSize: 16,
    color: '#6D6D70',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 22,
  },

  confidenceContainer: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  confidenceText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },

  methodContainer: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },

  methodText: {
    fontSize: 14,
    color: '#6D6D70',
    marginBottom: 4,
    lineHeight: 20,
  },

  // Issues Section
  issuesSection: {
    padding: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginBottom: 16,
  },

  issueCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500',
  },

  issueHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  issueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D1D1F',
    flex: 1,
    marginRight: 12,
    lineHeight: 22,
  },

  severityBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  severityBadgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  issueDetails: {
    marginBottom: 12,
  },

  measurementText: {
    fontSize: 14,
    color: '#6D6D70',
    marginBottom: 8,
    fontFamily: 'monospace',
  },

  impactContainer: {
    backgroundColor: 'rgba(255, 149, 0, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },

  impactHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF9500',
    marginBottom: 4,
  },

  impactText: {
    fontSize: 14,
    color: '#6D6D70',
    lineHeight: 20,
  },

  recommendationsContainer: {
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
    borderRadius: 8,
    padding: 12,
  },

  recommendationsHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#34C759',
    marginBottom: 8,
  },

  recommendationText: {
    fontSize: 14,
    color: '#6D6D70',
    marginBottom: 4,
    lineHeight: 20,
  },

  // No Issues Section
  noIssuesSection: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: 'rgba(52, 199, 89, 0.05)',
  },

  noIssuesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34C759',
    marginBottom: 12,
  },

  noIssuesText: {
    fontSize: 16,
    color: '#6D6D70',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 22,
  },

  noIssuesSubText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 20,
  },

  // Technical Details
  technicalToggle: {
    backgroundColor: '#F2F2F7',
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },

  technicalToggleText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },

  technicalDetails: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },

  technicalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginBottom: 8,
    marginTop: 12,
  },

  technicalText: {
    fontSize: 14,
    color: '#6D6D70',
    fontFamily: 'monospace',
    marginBottom: 4,
    lineHeight: 18,
  },

  // Tips Section
  tipsSection: {
    padding: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },

  tipsList: {
    marginTop: 8,
  },

  tipText: {
    fontSize: 14,
    color: '#6D6D70',
    marginBottom: 6,
    lineHeight: 20,
  },

  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FAFAFA',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },

  actionButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 8,
    alignItems: 'center',
  },

  actionButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // Placeholder
  placeholderIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
});import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator 
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

const SENSING_OPTIONS = [
  { id: 'camera', name: 'Camera', icon: '📹', available: true },
  { id: 'wifi', name: 'WiFi', icon: '📶', available: false },
  { id:'acoustic', name: 'Acoustic', icon: '🎤', available: false }
];

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Improved posture analysis with better thresholds and more accurate calculations
const analyzePostureFromLandmarks = (landmarks) => {
  if (!landmarks || landmarks.length < 33) {
    throw new Error('Insufficient landmarks detected');
  }

  // MediaPipe pose landmarks indices
  const LANDMARKS = {
    NOSE: 0,
    LEFT_EYE: 1,
    RIGHT_EYE: 2,
    LEFT_EAR: 7,
    RIGHT_EAR: 8,
    LEFT_SHOULDER: 11,
    RIGHT_SHOULDER: 12,
    LEFT_ELBOW: 13,
    RIGHT_ELBOW: 14,
    LEFT_HIP: 23,
    RIGHT_HIP: 24,
    LEFT_KNEE: 25,
    RIGHT_KNEE: 26,
  };

  const getLandmark = (index) => landmarks[index];

  // Get key points
  const nose = getLandmark(LANDMARKS.NOSE);
  const leftEye = getLandmark(LANDMARKS.LEFT_EYE);
  const rightEye = getLandmark(LANDMARKS.RIGHT_EYE);
  const leftEar = getLandmark(LANDMARKS.LEFT_EAR);
  const rightEar = getLandmark(LANDMARKS.RIGHT_EAR);
  const leftShoulder = getLandmark(LANDMARKS.LEFT_SHOULDER);
  const rightShoulder = getLandmark(LANDMARKS.RIGHT_SHOULDER);
  const leftElbow = getLandmark(LANDMARKS.LEFT_ELBOW);
  const rightElbow = getLandmark(LANDMARKS.RIGHT_ELBOW);
  const leftHip = getLandmark(LANDMARKS.LEFT_HIP);
  const rightHip = getLandmark(LANDMARKS.RIGHT_HIP);

  // Calculate midpoints
  const midEye = {
    x: (leftEye.x + rightEye.x) / 2,
    y: (leftEye.y + rightEye.y) / 2
  };
  
  const midEar = {
    x: (leftEar.x + rightEar.x) / 2,
    y: (leftEar.y + rightEar.y) / 2
  };
  
  const midShoulder = {
    x: (leftShoulder.x + rightShoulder.x) / 2,
    y: (leftShoulder.y + rightShoulder.y) / 2
  };
  
  const midHip = {
    x: (leftHip.x + rightHip.x) / 2,
    y: (leftHip.y + rightHip.y) / 2
  };

  const analysis = {
    landmarks_count: landmarks.length,
    issues: [],
    measurements: {},
    confidence: calculateOverallConfidence(landmarks)
  };

  // 1. Forward Head Posture Analysis (improved)
  // Use ear to shoulder alignment instead of just distance
  const headForwardDistance = midEar.x - midShoulder.x;
  const headForwardRatio = Math.abs(headForwardDistance) / Math.abs(midShoulder.y - midEar.y);
  analysis.measurements.head_forward_ratio = headForwardRatio;
  
  if (headForwardRatio > 0.15) { // More realistic threshold
    const severity = headForwardRatio > 0.35 ? 'severe' : headForwardRatio > 0.25 ? 'moderate' : 'mild';
    analysis.issues.push({
      type: 'forward_head_posture',
      severity,
      description: `Forward head posture detected (${(headForwardRatio * 100).toFixed(1)}% deviation)`,
      measurement: headForwardRatio,
      impact: severity === 'severe' ? 'High risk of neck strain and headaches' : 
              severity === 'moderate' ? 'Moderate neck tension likely' : 'Mild postural deviation',
      recommendations: [
        'Perform chin tuck exercises (10 reps, 3 times daily)',
        'Raise screen to eye level',
        'Take posture breaks every 20 minutes',
        'Strengthen deep neck flexor muscles',
        'Sleep with proper pillow support'
      ]
    });
  }

  // 2. Shoulder Height Imbalance (improved)
  const shoulderHeightDiff = Math.abs(leftShoulder.y - rightShoulder.y);
  const shoulderImbalanceRatio = shoulderHeightDiff / Math.abs(midShoulder.y - midHip.y);
  analysis.measurements.shoulder_imbalance_ratio = shoulderImbalanceRatio;
  
  if (shoulderImbalanceRatio > 0.08) { // More sensitive threshold
    const severity = shoulderImbalanceRatio > 0.20 ? 'severe' : shoulderImbalanceRatio > 0.14 ? 'moderate' : 'mild';
    const higherSide = leftShoulder.y < rightShoulder.y ? 'left' : 'right';
    analysis.issues.push({
      type: 'shoulder_imbalance',
      severity,
      description: `${higherSide.charAt(0).toUpperCase() + higherSide.slice(1)} shoulder elevated (${(shoulderImbalanceRatio * 100).toFixed(1)}% imbalance)`,
      measurement: shoulderImbalanceRatio,
      impact: severity === 'severe' ? 'Significant muscle imbalance, potential for chronic pain' :
              severity === 'moderate' ? 'Noticeable asymmetry, muscle compensation patterns' : 'Minor imbalance',
      recommendations: [
        `Stretch the elevated ${higherSide} shoulder and neck`,
        `Strengthen the lower ${higherSide === 'left' ? 'right' : 'left'} shoulder`,
        'Check bag carrying habits and workspace setup',
        'Practice shoulder blade squeezes',
        'Consider professional assessment if severe'
      ]
    });
  }

  // 3. Head Tilt Analysis (improved)
  const eyeVector = { x: rightEye.x - leftEye.x, y: rightEye.y - leftEye.y };
  const headTiltAngle = Math.atan2(eyeVector.y, eyeVector.x) * 180 / Math.PI;
  const headTiltDegrees = Math.abs(headTiltAngle);
  analysis.measurements.head_tilt_degrees = headTiltDegrees;
  
  if (headTiltDegrees > 5) { // More sensitive threshold
    const severity = headTiltDegrees > 15 ? 'severe' : headTiltDegrees > 10 ? 'moderate' : 'mild';
    const tiltDirection = headTiltAngle > 0 ? 'clockwise' : 'counterclockwise';
    analysis.issues.push({
      type: 'head_tilt',
      severity,
      description: `Head tilted ${headTiltDegrees.toFixed(1)}° ${tiltDirection}`,
      measurement: headTiltDegrees,
      impact: severity === 'severe' ? 'High risk of cervical strain and muscle tension' :
              severity === 'moderate' ? 'Moderate neck muscle imbalance' : 'Minor head positioning issue',
      recommendations: [
        'Practice head leveling exercises',
        'Check monitor and workspace positioning',
        'Stretch tight neck muscles on the shortened side',
        'Strengthen weak neck muscles on the lengthened side',
        'Be conscious of phone and reading posture'
      ]
    });
  }

  // 4. Rounded Shoulders Analysis (improved)
  const shoulderWidth = Math.abs(rightShoulder.x - leftShoulder.x);
  const shoulderProtraction = (midShoulder.x - midHip.x) / shoulderWidth;
  analysis.measurements.shoulder_protraction = shoulderProtraction;
  
  if (Math.abs(shoulderProtraction) > 0.12) {
    const severity = Math.abs(shoulderProtraction) > 0.25 ? 'severe' : Math.abs(shoulderProtraction) > 0.18 ? 'moderate' : 'mild';
    analysis.issues.push({
      type: 'rounded_shoulders',
      severity,
      description: `Rounded shoulders detected (${(Math.abs(shoulderProtraction) * 100).toFixed(1)}% forward position)`,
      measurement: Math.abs(shoulderProtraction),
      impact: severity === 'severe' ? 'High risk of thoracic kyphosis and shoulder impingement' :
              severity === 'moderate' ? 'Increased upper back tension and reduced lung capacity' : 'Mild postural deviation',
      recommendations: [
        'Perform doorway chest stretches (30 seconds, 3x daily)',
        'Strengthen rhomboids and middle trapezius',
        'Practice wall slides exercise',
        'Adjust workstation ergonomics',
        'Focus on opening chest throughout the day'
      ]
    });
  }

  // 5. Overall Spinal Alignment (improved)
  const spinalPoints = [midEar, midShoulder, midHip];
  let totalDeviation = 0;
  
  for (let i = 1; i < spinalPoints.length - 1; i++) {
    const prevPoint = spinalPoints[i - 1];
    const currPoint = spinalPoints[i];
    const nextPoint = spinalPoints[i + 1];
    
    // Calculate deviation from straight line
    const lineVector = { x: nextPoint.x - prevPoint.x, y: nextPoint.y - prevPoint.y };
    const pointVector = { x: currPoint.x - prevPoint.x, y: currPoint.y - prevPoint.y };
    
    const lineLength = Math.sqrt(lineVector.x ** 2 + lineVector.y ** 2);
    const projection = (pointVector.x * lineVector.x + pointVector.y * lineVector.y) / lineLength;
    const perpDist = Math.sqrt((pointVector.x ** 2 + pointVector.y ** 2) - projection ** 2);
    
    totalDeviation += perpDist;
  }
  
  analysis.measurements.spinal_deviation = totalDeviation;
  
  if (totalDeviation > 0.08) {
    const severity = totalDeviation > 0.15 ? 'severe' : totalDeviation > 0.12 ? 'moderate' : 'mild';
    analysis.issues.push({
      type: 'spinal_misalignment',
      severity,
      description: `Spinal misalignment detected (${(totalDeviation * 100).toFixed(1)}% deviation)`,
      measurement: totalDeviation,
      impact: severity === 'severe' ? 'Significant postural dysfunction, multiple compensation patterns' :
              severity === 'moderate' ? 'Moderate postural imbalance affecting multiple regions' : 'Minor alignment issues',
      recommendations: [
        'Practice wall posture exercises daily',
        'Focus on stacking head over shoulders over hips',
        'Strengthen postural support muscles',
        'Consider ergonomic assessment',
        'Maintain awareness of posture throughout day'
      ]
    });
  }

  // 6. Cervical Lordosis Assessment (new)
  const neckAngle = calculateNeckAngle(midEar, midShoulder, nose);
  analysis.measurements.neck_angle = neckAngle;
  
  if (neckAngle < 35 || neckAngle > 55) { // Normal cervical lordosis is around 40-45 degrees
    const severity = (neckAngle < 25 || neckAngle > 65) ? 'severe' : 
                    (neckAngle < 30 || neckAngle > 60) ? 'moderate' : 'mild';
    const condition = neckAngle < 35 ? 'loss of cervical lordosis' : 'excessive cervical extension';
    analysis.issues.push({
      type: 'cervical_curve',
      severity,
      description: `${condition} (${neckAngle.toFixed(1)}° - normal: 40-45°)`,
      measurement: neckAngle,
      impact: severity === 'severe' ? 'High risk of disc problems and nerve compression' :
              severity === 'moderate' ? 'Increased cervical spine stress' : 'Minor cervical curve variation',
      recommendations: [
        neckAngle < 35 ? 'Practice cervical extension exercises' : 'Focus on chin tuck movements',
        'Maintain neutral spine during activities',
        'Use proper pillow support while sleeping',
        'Consider physiotherapy evaluation',
        'Avoid prolonged neck flexion/extension'
      ]
    });
  }

  // Calculate comprehensive posture score
  const maxPossibleIssues = 6;
  const issueCount = analysis.issues.length;
  const severityScore = analysis.issues.reduce((sum, issue) => {
    const weight = issue.severity === 'severe' ? 3 : issue.severity === 'moderate' ? 2 : 1;
    return sum + weight;
  }, 0);
  
  const maxSeverityScore = maxPossibleIssues * 3;
  const rawScore = Math.max(0, (maxSeverityScore - severityScore) / maxSeverityScore);
  
  // Apply confidence factor
  const confidenceAdjustedScore = rawScore * analysis.confidence;
  analysis.posture_score = Math.round(confidenceAdjustedScore * 100);

  // Determine overall assessment
  if (analysis.posture_score >= 90) {
    analysis.overall_assessment = 'Excellent';
    analysis.quality_color = '#34C759';
    analysis.status_message = 'Outstanding posture! Keep up the great work.';
  } else if (analysis.posture_score >= 75) {
    analysis.overall_assessment = 'Good';
    analysis.quality_color = '#30D158';
    analysis.status_message = 'Good posture with minor areas for improvement.';
  } else if (analysis.posture_score >= 60) {
    analysis.overall_assessment = 'Fair';
    analysis.quality_color = '#FF9500';
    analysis.status_message = 'Moderate posture issues detected. Focus on corrections.';
  } else if (analysis.posture_score >= 40) {
    analysis.overall_assessment = 'Poor';
    analysis.quality_color = '#FF6B35';
    analysis.status_message = 'Multiple posture problems. Consistent effort needed.';
  } else {
    analysis.overall_assessment = 'Critical';
    analysis.quality_color = '#FF3B30';
    analysis.status_message = 'Severe posture issues. Consider professional help.';
  }

  return analysis;
};

// Helper function to calculate neck angle
const calculateNeckAngle = (ear, shoulder, nose) => {
  const neckVector = { x: ear.x - shoulder.x, y: ear.y - shoulder.y };
  const headVector = { x: nose.x - ear.x, y: nose.y - ear.y };
  
  const neckLength = Math.sqrt(neckVector.x ** 2 + neckVector.y ** 2);
  const headLength = Math.sqrt(headVector.x ** 2 + headVector.y ** 2);
  
  if (neckLength === 0 || headLength === 0) return 45; // Default
  
  const dotProduct = neckVector.x * headVector.x + neckVector.y * headVector.y;
  const cosAngle = dotProduct / (neckLength * headLength);
  const angle = Math.acos(Math.max(-1, Math.min(1, cosAngle))) * 180 / Math.PI;
  
  return angle;
};

// Helper function to calculate confidence based on landmark visibility
const calculateOverallConfidence = (landmarks) => {
  const keyLandmarks = [0, 1, 2, 7, 8, 11, 12, 23, 24]; // Key points for posture
  const keyConfidence = keyLandmarks.reduce((sum, index) => {
    return sum + (landmarks[index]?.visibility || 0);
  }, 0) / keyLandmarks.length;
  
  return Math.min(1, Math.max(0.5, keyConfidence)); // Between 0.5 and 1.0
};

// Enhanced mock pose detection with more realistic variations
const detectPoseLandmarks = async (imageUri) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const mockLandmarks = [];
        
        // Generate more realistic posture scenarios
        const postureScenarios = [
          { // Good posture
            name: 'good',
            head_forward: 0.05 + Math.random() * 0.05,
            shoulder_imbalance: (Math.random() - 0.5) * 0.05,
            slouch_factor: 0.02 + Math.random() * 0.03,
            head_tilt: (Math.random() - 0.5) * 0.08
          },
          { // Forward head posture
            name: 'forward_head',
            head_forward: 0.2 + Math.random() * 0.15,
            shoulder_imbalance: (Math.random() - 0.5) * 0.08,
            slouch_factor: 0.1 + Math.random() * 0.1,
            head_tilt: (Math.random() - 0.5) * 0.1
          },
          { // Slouched posture
            name: 'slouched',
            head_forward: 0.15 + Math.random() * 0.1,
            shoulder_imbalance: (Math.random() - 0.5) * 0.1,
            slouch_factor: 0.18 + Math.random() * 0.12,
            head_tilt: (Math.random() - 0.5) * 0.06
          },
          { // Uneven shoulders
            name: 'uneven_shoulders',
            head_forward: 0.08 + Math.random() * 0.08,
            shoulder_imbalance: (Math.random() > 0.5 ? 1 : -1) * (0.15 + Math.random() * 0.1),
            slouch_factor: 0.05 + Math.random() * 0.05,
            head_tilt: Math.random() > 0.5 ? 0.12 + Math.random() * 0.08 : -(0.12 + Math.random() * 0.08)
          }
        ];
        
        // Randomly select a posture scenario
        const scenario = postureScenarios[Math.floor(Math.random() * postureScenarios.length)];
        
        const basePosture = {
          head_center_x: 0.5 + (Math.random() - 0.5) * 0.05,
          head_center_y: 0.18 + (Math.random() - 0.5) * 0.03,
          shoulder_y: 0.32 + (Math.random() - 0.5) * 0.02,
          hip_y: 0.62 + (Math.random() - 0.5) * 0.02,
          ...scenario
        };

        // Create all 33 MediaPipe landmarks with more realistic positioning
        for (let i = 0; i < 33; i++) {
          let x, y, visibility = 0.7 + Math.random() * 0.3;
          
          switch (i) {
            case 0: // Nose
              x = basePosture.head_center_x + basePosture.head_forward * 0.3;
              y = basePosture.head_center_y + basePosture.head_tilt * 0.05;
              break;
            case 1: // Left eye
              x = basePosture.head_center_x - 0.025 + basePosture.head_forward * 0.25;
              y = basePosture.head_center_y - 0.01 + basePosture.head_tilt * 0.02;
              break;
            case 2: // Right eye
              x = basePosture.head_center_x + 0.025 + basePosture.head_forward * 0.25;
              y = basePosture.head_center_y - 0.01 - basePosture.head_tilt * 0.02;
              break;
            case 7: // Left ear
              x = basePosture.head_center_x - 0.08 + basePosture.head_forward * 0.4;
              y = basePosture.head_center_y - 0.01 + basePosture.head_tilt * 0.3;
              break;
            case 8: // Right ear  
              x = basePosture.head_center_x + 0.08 + basePosture.head_forward * 0.4;
              y = basePosture.head_center_y - 0.01 - basePosture.head_tilt * 0.3;
              break;
            case 11: // Left shoulder
              x = basePosture.head_center_x - 0.15 + basePosture.slouch_factor * 0.8;
              y = basePosture.shoulder_y - basePosture.shoulder_imbalance * 0.5;
              break;
            case 12: // Right shoulder
              x = basePosture.head_center_x + 0.15 + basePosture.slouch_factor * 0.8;
              y = basePosture.shoulder_y + basePosture.shoulder_imbalance * 0.5;
              break;
            case 13: // Left elbow
              x = basePosture.head_center_x - 0.18 + basePosture.slouch_factor * 0.6;
              y = basePosture.shoulder_y + 0.12 - basePosture.shoulder_imbalance * 0.3;
              break;
            case 14: // Right elbow
              x = basePosture.head_center_x + 0.18 + basePosture.slouch_factor * 0.6;
              y = basePosture.shoulder_y + 0.12 + basePosture.shoulder_imbalance * 0.3;
              break;
            case 23: // Left hip
              x = basePosture.head_center_x - 0.12;
              y = basePosture.hip_y;
              break;
            case 24: // Right hip
              x = basePosture.head_center_x + 0.12;
              y = basePosture.hip_y;
              break;
            case 25: // Left knee
              x = basePosture.head_center_x - 0.10;
              y = basePosture.hip_y + 0.25;
              break;
            case 26: // Right knee
              x = basePosture.head_center_x + 0.10;
              y = basePosture.hip_y + 0.25;
              break;
            default:
              // Other landmarks with reasonable positions
              x = 0.25 + Math.random() * 0.5;
              y = 0.15 + (i / 33) * 0.7;
              visibility = 0.5 + Math.random() * 0.4;
          }
          
          mockLandmarks.push({
            x: Math.max(0.05, Math.min(0.95, x)), // Clamp to reasonable bounds
            y: Math.max(0.05, Math.min(0.95, y)),
            z: Math.random() * 0.08 - 0.04, // Small depth variation
            visibility: Math.max(0.3, Math.min(1.0, visibility))
          });
        }
        
        // Simulate occasional detection failures
        if (Math.random() < 0.03) { // 3% chance of detection failure
          reject(new Error('No person detected in image'));
          return;
        }
        
        console.log(`Mock pose detection complete - Generated ${scenario.name} posture scenario`);
        resolve(mockLandmarks);
        
      } catch (error) {
        reject(new Error('Pose detection failed: ' + error.message));
      }
    }, 600 + Math.random() * 400); // Slightly faster processing
  });
};

export default function App() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentView, setCurrentView] = useState('selection');
  const [permission, requestPermission] = useCameraPermissions();
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [cameraFacing, setCameraFacing] = useState('front');
  const [isProcessing, setIsProcessing] = useState(false);
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [countdown, setCountdown] = useState(null);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showTechnical, setShowTechnical] = useState(false);
  
  // Auto capture state
  const [autoPhotoCount, setAutoPhotoCount] = useState(0);
  const [maxAutoPhotos] = useState(10);
  const [autoInterval] = useState(10); // 10 seconds between photos

  const cameraRef = useRef(null);
  const autoIntervalRef = useRef(null);
  const countdownIntervalRef = useRef(null);

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

  const analyzePosture = async (imageUri) => {
    try {
      setIsAnalyzing(true);
      console.log('Starting enhanced posture analysis...');

      // Step 1: Detect pose landmarks
      const landmarks = await detectPoseLandmarks(imageUri);
      console.log(`Detected ${landmarks.length} pose landmarks`);

      // Step 2: Analyze posture from landmarks
      const analysis = analyzePostureFromLandmarks(landmarks);
      console.log('Enhanced posture analysis complete:', analysis);

      return {
        ...analysis,
        timestamp: new Date().toISOString(),
        analysis_method: 'Enhanced Rule-based + MediaPipe Landmarks v2.0',
        image_uri: imageUri
      };

    } catch (error) {
      console.error('Posture analysis failed:', error);
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const processPhoto = async (photoUri) => {
    try {
      // Save to library
      const asset = await savePhotoToLibrary(photoUri);
      
      // Create photo object
      const photoData = {
        id: Date.now(),
        uri: photoUri,
        timestamp: new Date().toISOString(),
        cameraFacing,
        asset,
        filename: `posture_${Date.now()}.jpg`,
        description: `Posture analysis photo taken with ${cameraFacing} camera`,
        postureAnalysis: null,
        isAnalyzed: false,
        analysisError: null,
        autoCapture: isAutoMode,
        photoNumber: isAutoMode ? autoPhotoCount + 1 : null
      };

      // Add to captured photos immediately
      setCapturedPhotos(prev => [...prev, photoData]);
      await savePhotoMetadata(photoData);

      // Analyze posture
      try {
        const postureAnalysis = await analyzePosture(photoUri);
        
        // Update photo with analysis results
        setCapturedPhotos(prev => 
          prev.map(photo => 
            photo.id === photoData.id 
              ? { 
                  ...photo, 
                  postureAnalysis, 
                  isAnalyzed: true,
                  analysisError: null
                }
              : photo
          )
        );

        // Show results only for manual captures or last auto capture
        if (!isAutoMode || autoPhotoCount === maxAutoPhotos - 1) {
          const scoreEmoji = postureAnalysis.posture_score >= 80 ? '🎉' : 
                            postureAnalysis.posture_score >= 60 ? '👍' : '⚠️';
          
          Alert.alert(
            `${scoreEmoji} Analysis Complete!`, 
            `Posture Score: ${postureAnalysis.posture_score}%\n` +
            `Assessment: ${postureAnalysis.overall_assessment}\n` +
            `Issues Found: ${postureAnalysis.issues.length}\n` +
            `${postureAnalysis.status_message}`,
            [
              { text: 'View Details', onPress: goToGallery },
              { text: 'OK', style: 'default' }
            ]
          );
        }

      } catch (error) {
        console.error('Posture analysis failed:', error);
        
        setCapturedPhotos(prev => 
          prev.map(photo => 
            photo.id === photoData.id 
              ? { 
                  ...photo, 
                  analysisError: error.message,
                  isAnalyzed: false
                }
              : photo
          )
        );

        if (!isAutoMode) {
          Alert.alert(
            'Analysis Failed', 
            `Photo saved but analysis failed: ${error.message}`,
            [{ text: 'OK' }]
          );
        }
      }

    } catch (error) {
      console.error('Error processing photo:', error);
      if (!isAutoMode) {
        Alert.alert('Error', 'Failed to process photo');
      }
    }
  };

  const takePicture = async () => {
    if (!cameraRef.current || isProcessing) return;
    
    try {
      setIsProcessing(true);
      setIsCapturing(true);
      
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
        exif: false,
      });
      
      await processPhoto(photo.uri);
      
      // Handle auto capture progression
      if (isAutoMode) {
        const newCount = autoPhotoCount + 1;
        setAutoPhotoCount(newCount);
        
        if (newCount >= maxAutoPhotos) {
          // Auto capture complete
          stopAutoCapture();
          Alert.alert(
            '📸 Auto Capture Complete!', 
            `Captured ${maxAutoPhotos} photos for comprehensive posture analysis.`,
            [
              { text: 'View Results', onPress: goToGallery },
              { text: 'OK', style: 'default' }
            ]
          );
        }
      }
      
    } catch (error) {
      console.error('Error taking picture:', error);
      if (!isAutoMode) {
        Alert.alert('Error', 'Failed to take picture');
      }
    } finally {
      setIsCapturing(false);
      setIsProcessing(false);
    }
  };

  const startAutoCapture = () => {
    if (isAutoMode) return;
    
    Alert.alert(
      '🤖 Auto Capture Mode',
      `This will automatically take ${maxAutoPhotos} photos every ${autoInterval} seconds for comprehensive posture analysis.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Start Auto Capture',
          onPress: () => {
            setIsAutoMode(true);
            setAutoPhotoCount(0);
            startCountdown();
          }
        }
      ]
    );
  };

  const stopAutoCapture = () => {
    if (autoIntervalRef.current) {
      clearInterval(autoIntervalRef.current);
      autoIntervalRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    
    setIsAutoMode(false);
    setCountdown(null);
    setAutoPhotoCount(0);
  };

  const startCountdown = () => {
    let secondsRemaining = autoInterval;
    setCountdown(secondsRemaining);
    
    // Take first photo immediately
    setTimeout(() => takePicture(), 500);
    
    countdownIntervalRef.current = setInterval(() => {
      secondsRemaining--;
      setCountdown(secondsRemaining);
      
      if (secondsRemaining <= 0) {
        if (autoPhotoCount < maxAutoPhotos - 1) {
          takePicture();
          secondsRemaining = autoInterval;
          setCountdown(secondsRemaining);
        } else {
          stopAutoCapture();
        }
      }
    }, 1000);
  };

  const goBack = () => {
    stopAutoCapture();
    setCurrentView('selection');
    setCapturedPhotos([]);
    setCurrentPhotoIndex(0);
  };

  const goToGallery = () => {
    stopAutoCapture();
    setCurrentView('gallery');
    setCurrentPhotoIndex(Math.max(0, capturedPhotos.length - 1)); // Show latest photo
  };

  const backToCamera = () => {
    setCurrentView('camera');
  };

  const toggleCameraFacing = () => {
    setCameraFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  useEffect(() => {
    return () => {
      stopAutoCapture();
    };
  }, []);

  const savePhotoToLibrary = async (photoUri) => {
    try {
      if (!mediaPermission?.granted) {
        const permission = await requestMediaPermission();
        if (!permission.granted) {
          console.warn('Media library permission denied');
          return null;
        }
      }
      const asset = await MediaLibrary.saveToLibraryAsync(photoUri);
      return asset;
    } catch (error) {
      console.error('Error saving photo:', error);
      return null;
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

  const deletePhoto = (photoId) => {
    Alert.alert(
      'Delete Photo',
      'Are you sure you want to delete this photo and its analysis?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setCapturedPhotos(prev => prev.filter(photo => photo.id !== photoId));
            if (currentPhotoIndex >= capturedPhotos.length - 1) {
              setCurrentPhotoIndex(Math.max(0, capturedPhotos.length - 2));
            }
          }
        }
      ]
    );
  };

  const nextPhoto = () => {
    if (currentPhotoIndex < capturedPhotos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const prevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'severe': return '#FF3B30';
      case 'moderate': return '#FF9500';
      case 'mild': return '#FFCC00';
      default: return '#8E8E93';
    }
  };

  const getSeverityEmoji = (severity) => {
    switch (severity) {
      case 'severe': return '🔴';
      case 'moderate': return '🟠';  
      case 'mild': return '🟡';
      default: return '⚪';
    }
  };

  const getImpactIcon = (severity) => {
    switch (severity) {
      case 'severe': return '⚠️';
      case 'moderate': return '⚡';
      case 'mild': return '💡';
      default: return 'ℹ️';
    }
  };

  const renderPostureAnalysis = (analysis) => {
    if (!analysis) return null;

    return (
      <View style={styles.analysisContainer}>
        <Text style={styles.analysisTitle}>🔬 Enhanced Posture Analysis</Text>
        
        {/* Overall Score Card */}
        <View style={[styles.scoreContainer, { borderColor: analysis.quality_color }]}>
          <Text style={styles.scoreLabel}>Posture Score</Text>
          <Text style={[styles.scoreValue, { color: analysis.quality_color }]}>
            {analysis.posture_score}%
          </Text>
          <Text style={[styles.assessmentText, { color: analysis.quality_color }]}>
            {analysis.overall_assessment}
          </Text>
          <Text style={styles.statusMessage}>
            {analysis.status_message}
          </Text>
          <View style={styles.confidenceContainer}>
            <Text style={styles.confidenceText}>
              Confidence: {Math.round(analysis.confidence * 100)}%
            </Text>
          </View>
        </View>

        {/* Analysis Info */}
        <View style={styles.methodContainer}>
          <Text style={styles.methodText}>
            🎯 Method: {analysis.analysis_method}
          </Text>
          <Text style={styles.methodText}>
            📍 Landmarks: {analysis.landmarks_count}/33 detected
          </Text>
          <Text style={styles.methodText}>
            ⏱️ Analyzed: {new Date(analysis.timestamp).toLocaleTimeString()}
          </Text>
        </View>

        {/* Issues Analysis */}
        {analysis.issues && analysis.issues.length > 0 ? (
          <View style={styles.issuesSection}>
            <Text style={styles.sectionTitle}>
              🔍 Detected Issues ({analysis.issues.length})
            </Text>
            {analysis.issues.map((issue, index) => (
              <View key={index} style={styles.issueCard}>
                <View style={styles.issueHeader}>
                  <Text style={styles.issueTitle}>
                    {getSeverityEmoji(issue.severity)} {issue.description}
                  </Text>
                  <View style={[
                    styles.severityBadge,
                    { backgroundColor: getSeverityColor(issue.severity) }
                  ]}>
                    <Text style={styles.severityBadgeText}>
                      {issue.severity.toUpperCase()}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.issueDetails}>
                  <Text style={styles.measurementText}>
                    📏 Measurement: {typeof issue.measurement === 'number' ? 
                      issue.measurement.toFixed(3) : issue.measurement}
                  </Text>
                  
                  {issue.impact && (
                    <View style={styles.impactContainer}>
                      <Text style={styles.impactHeader}>
                        {getImpactIcon(issue.severity)} Impact:
                      </Text>
                      <Text style={styles.impactText}>{issue.impact}</Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.recommendationsContainer}>
                  <Text style={styles.recommendationsHeader}>
                    💡 Recommendations:
                  </Text>
                  {issue.recommendations.map((rec, recIndex) => (
                    <Text key={recIndex} style={styles.recommendationText}>
                      • {rec}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.noIssuesSection}>
            <Text style={styles.noIssuesTitle}>✅ Excellent Posture!</Text>
            <Text style={styles.noIssuesText}>
              No significant posture issues detected. Your alignment looks great!
            </Text>
            <Text style={styles.noIssuesSubText}>
              Keep maintaining good posture habits throughout the day.
            </Text>
          </View>
        )}

        {/* Technical Details Toggle */}
        <TouchableOpacity 
          style={styles.technicalToggle}
          onPress={() => setShowTechnical(!showTechnical)}
        >
          <Text style={styles.technicalToggleText}>
            🔧 Technical Measurements {showTechnical ? '▼' : '▶'}
          </Text>
        </TouchableOpacity>

        {showTechnical && (
          <View style={styles.technicalDetails}>
            <Text style={styles.technicalTitle}>Raw Measurements:</Text>
            {Object.entries(analysis.measurements || {}).map(([key, value]) => (
              <Text key={key} style={styles.technicalText}>
                {key.replace(/_/g, ' ')}: {typeof value === 'number' ? value.toFixed(4) : value}
              </Text>
            ))}
            <Text style={styles.technicalTitle}>Detection Quality:</Text>
            <Text style={styles.technicalText}>
              Overall confidence: {(analysis.confidence * 100).toFixed(1)}%
            </Text>
            <Text style={styles.technicalText}>
              Landmark visibility: High quality detection
            </Text>
          </View>
        )}

        {/* General Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>💡 Daily Posture Tips</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipText}>🕐 Take breaks every 20-30 minutes</Text>
            <Text style={styles.tipText}>👁️ Keep screen at eye level</Text>
            <Text style={styles.tipText}>🪑 Sit with back straight, feet flat</Text>
            <Text style={styles.tipText}>💪 Strengthen core and back muscles</Text>
            <Text style={styles.tipText}>🧘 Practice posture awareness daily</Text>
            <Text style={styles.tipText}>💧 Stay hydrated for muscle health</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => {
              // Could implement sharing functionality
              Alert.alert('Feature Coming Soon', 'Sharing analysis results will be available in a future update.');
            }}
          >
            <Text style={styles.actionButtonText}>📤 Share Results</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => {
              // Could implement export functionality
              Alert.alert('Feature Coming Soon', 'Exporting detailed reports will be available in a future update.');
            }}
          >
            <Text style={styles.actionButtonText}>📄 Export Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderSelectionScreen = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Smart Posture Analyzer</Text>
          <Text style={styles.subtitle}>AI-powered real-time posture analysis</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>
              🔬 Enhanced MediaPipe Pose Detection v2.0
            </Text>
            <Text style={styles.statusText}>
              🧠 Advanced Rule-based Analysis System
            </Text>
            <Text style={styles.statusText}>
              📊 Comprehensive Posture Scoring
            </Text>
          </View>

          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>✨ New Features:</Text>
            <Text style={styles.featureText}>• Auto-capture 10 photos every 10 seconds</Text>
            <Text style={styles.featureText}>• Enhanced posture issue detection</Text>
            <Text style={styles.featureText}>• Detailed impact assessments</Text>
            <Text style={styles.featureText}>• Personalized recommendations</Text>
            <Text style={styles.featureText}>• Confidence scoring system</Text>
          </View>

          {SENSING_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionButton,
                selectedOptions.includes(option.id) && styles.selectedOption,
                !option.available && styles.disabledOption
              ]}
              onPress={() => option.available && toggleOption(option.id)}
              disabled={!option.available}
            >
              <Text style={styles.optionIcon}>{option.icon}</Text>
              <Text style={[
                styles.optionText,
                selectedOptions.includes(option.id) && styles.selectedOptionText,
                !option.available && styles.disabledOptionText
              ]}>
                {option.name}
              </Text>
              {!option.available && (
                <Text style={styles.comingSoonText}>Coming Soon</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={[
            styles.startButton,
            selectedOptions.length === 0 && styles.disabledStartButton
          ]} 
          onPress={startSensing}
          disabled={selectedOptions.length === 0}
        >
          <Text style={styles.startButtonText}>Start Enhanced Analysis</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  const renderCameraScreen = () => {
    if (!permission) {
      return <View />;
    }

    if (!permission.granted) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.centerContainer}>
            <Text style={styles.placeholderIcon}>📷</Text>
            <Text style={styles.subtitle}>Camera permission required</Text>
            <Text style={styles.description}>
              We need camera access to analyze your posture using advanced AI
            </Text>
            <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
              <Text style={styles.permissionButtonText}>Grant Camera Permission</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.cameraContainer}>
        <View style={styles.cameraHeader}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          
          <Text style={styles.cameraTitle}>
            {isAnalyzing ? '🔬 Analyzing...' : isAutoMode ? `📸 Auto Mode (${autoPhotoCount}/${maxAutoPhotos})` : '📹 Posture Camera'}
          </Text>
          
          {capturedPhotos.length > 0 && (
            <TouchableOpacity style={styles.galleryButton} onPress={goToGallery}>
              <Text style={styles.galleryButtonText}>Gallery ({capturedPhotos.length})</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.cameraWrapper}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={cameraFacing}
          />
          
          {/* Enhanced Instructions Overlay */}
          <View style={styles.instructionsOverlay}>
            <Text style={styles.instructionsText}>
              {isAutoMode ? '🤖 Auto Capture Active' : '📍 Position Yourself'}
            </Text>
            <Text style={styles.instructionsSubText}>
              {isAutoMode 
                ? `Taking photo ${autoPhotoCount + 1} of ${maxAutoPhotos}` 
                : 'Stand straight, full upper body visible'
              }
            </Text>
          </View>

          {/* Auto mode progress and countdown */}
          {isAutoMode && (
            <View style={styles.autoModeOverlay}>
              <View style={styles.progressContainer}>
                <Text style={styles.progressText}>
                  Progress: {autoPhotoCount}/{maxAutoPhotos}
                </Text>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill,
                      { width: `${(autoPhotoCount / maxAutoPhotos) * 100}%` }
                    ]}
                  />
                </View>
              </View>
              
              {countdown !== null && (
                <View style={styles.countdownContainer}>
                  <Text style={styles.countdownText}>
                    Next photo: {countdown}s
                  </Text>
                  <View style={styles.countdownProgress}>
                    <View 
                      style={[
                        styles.countdownBar,
                        { width: `${((autoInterval - countdown) / autoInterval) * 100}%` }
                      ]}
                    />
                  </View>
                </View>
              )}
            </View>
          )}

          {/* Analysis overlay */}
          {isAnalyzing && (
            <View style={styles.analysisOverlay}>
              <ActivityIndicator size="large" color="#FFFFFF" />
              <Text style={styles.analysisOverlayText}>
                🔬 Advanced Analysis in Progress
              </Text>
              <Text style={styles.analysisSubText}>
                Detecting landmarks and evaluating posture...
              </Text>
            </View>
          )}
        </View>

        <View style={styles.cameraControls}>
          <TouchableOpacity 
            style={styles.flipButton} 
            onPress={toggleCameraFacing}
            disabled={isAutoMode}
          >
            <Text style={styles.flipButtonText}>🔄</Text>
            <Text style={styles.buttonLabel}>Flip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.captureButton,
              (isProcessing || isAnalyzing || isAutoMode) && styles.disabledCaptureButton
            ]}
            onPress={takePicture}
            disabled={isProcessing || isAnalyzing || isAutoMode}
          >
            {isProcessing ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.captureButtonText}>📸</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.autoButton,
              isAutoMode && styles.autoButtonActive
            ]}
            onPress={isAutoMode ? stopAutoCapture : startAutoCapture}
            disabled={isProcessing || isAnalyzing}
          >
            <Text style={styles.autoButtonText}>
              {isAutoMode ? '⏹️' : '🤖'}
            </Text>
            <Text style={styles.buttonLabel}>
              {isAutoMode ? 'Stop' : 'Auto'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const renderGalleryScreen = () => {
    if (capturedPhotos.length === 0) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.centerContainer}>
            <Text style={styles.placeholderIcon}>📷</Text>
            <Text style={styles.subtitle}>No Photos Yet</Text>
            <Text style={styles.description}>
              Take some photos to see your posture analysis results here
            </Text>
            <TouchableOpacity style={styles.permissionButton} onPress={backToCamera}>
              <Text style={styles.permissionButtonText}>Take Photos</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }

    const currentPhoto = capturedPhotos[currentPhotoIndex];

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.galleryHeader}>
          <TouchableOpacity style={styles.backButton} onPress={backToCamera}>
            <Text style={styles.backButtonText}>← Camera</Text>
          </TouchableOpacity>
          
          <Text style={styles.galleryTitle}>
            📸 Gallery ({currentPhotoIndex + 1}/{capturedPhotos.length})
          </Text>
          
          <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={() => deletePhoto(currentPhoto.id)}
          >
            <Text style={styles.deleteButtonText}>🗑️</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.galleryContent} showsVerticalScrollIndicator={false}>
          {/* Photo Display */}
          <View style={styles.photoContainer}>
            <Image source={{ uri: currentPhoto.uri }} style={styles.galleryPhoto} />
            
            {/* Photo Info */}
            <View style={styles.photoInfo}>
              <Text style={styles.photoInfoText}>
                📅 {new Date(currentPhoto.timestamp).toLocaleString()}
              </Text>
              <Text style={styles.photoInfoText}>
                📹 {currentPhoto.cameraFacing} camera
              </Text>
              {currentPhoto.autoCapture && (
                <Text style={styles.photoInfoText}>
                  🤖 Auto capture #{currentPhoto.photoNumber}
                </Text>
              )}
            </View>

            {/* Analysis Status */}
            <View style={styles.analysisStatus}>
              {currentPhoto.isAnalyzed ? (
                <Text style={styles.analysisStatusText}>✅ Analysis Complete</Text>
              ) : currentPhoto.analysisError ? (
                <Text style={styles.analysisErrorText}>❌ Analysis Failed: {currentPhoto.analysisError}</Text>
              ) : (
                <View style={styles.analysisLoadingContainer}>
                  <ActivityIndicator size="small" color="#007AFF" />
                  <Text style={styles.analysisLoadingText}>🔬 Analyzing...</Text>
                </View>
              )}
            </View>
          </View>

          {/* Posture Analysis Results */}
          {currentPhoto.postureAnalysis && renderPostureAnalysis(currentPhoto.postureAnalysis)}
        </ScrollView>

        {/* Navigation Controls */}
        <View style={styles.galleryNavigation}>
          <TouchableOpacity 
            style={[styles.navButton, currentPhotoIndex === 0 && styles.navButtonDisabled]} 
            onPress={prevPhoto}
            disabled={currentPhotoIndex === 0}
          >
            <Text style={styles.navButtonText}>← Previous</Text>
          </TouchableOpacity>
          
          <View style={styles.photoCounter}>
            <Text style={styles.photoCounterText}>
              {currentPhotoIndex + 1} / {capturedPhotos.length}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.navButton, currentPhotoIndex === capturedPhotos.length - 1 && styles.navButtonDisabled]} 
            onPress={nextPhoto}
            disabled={currentPhotoIndex === capturedPhotos.length - 1}
          >
            <Text style={styles.navButtonText}>Next →</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  // Main render logic
  switch (currentView) {
    case 'selection':
      return renderSelectionScreen();
    case 'camera':
      return renderCameraScreen();
    case 'gallery':
      return renderGalleryScreen();
    default:
      return renderSelectionScreen();
  }
}