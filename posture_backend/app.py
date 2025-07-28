from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import mediapipe as mp
import numpy as np
import math
from PIL import Image
import logging
import os

print("Starting simple Flask app without TensorFlow...")

app = Flask(__name__)
CORS(app)  # Enable CORS for React Native requests

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def analyze_posture(image):
    """Analyze posture using MediaPipe landmarks"""
    try:
        print("Initializing MediaPipe...")
        # Initialize MediaPipe pose detection
        mp_pose = mp.solutions.pose
        
        # Use static_image_mode=True for single images
        with mp_pose.Pose(
            static_image_mode=True,
            model_complexity=1,
            enable_segmentation=False,
            min_detection_confidence=0.5
        ) as pose:
            
            print("Processing image with MediaPipe...")
            # Convert BGR to RGB if needed
            if len(image.shape) == 3 and image.shape[2] == 3:
                # Assume it's already RGB from PIL
                results = pose.process(image)
            else:
                return None, None

        if not results.pose_landmarks:
            print("No pose landmarks detected")
            return None, None

        print("Pose landmarks detected, analyzing...")
        landmarks = results.pose_landmarks.landmark
        
        def get_landmark(landmark_id):
            lm = landmarks[landmark_id]
            return np.array([lm.x, lm.y])

        # Get key landmarks
        left_shoulder = get_landmark(mp_pose.PoseLandmark.LEFT_SHOULDER.value)
        right_shoulder = get_landmark(mp_pose.PoseLandmark.RIGHT_SHOULDER.value)
        left_ear = get_landmark(mp_pose.PoseLandmark.LEFT_EAR.value)
        right_ear = get_landmark(mp_pose.PoseLandmark.RIGHT_EAR.value)
        left_hip = get_landmark(mp_pose.PoseLandmark.LEFT_HIP.value)
        right_hip = get_landmark(mp_pose.PoseLandmark.RIGHT_HIP.value)
        nose = get_landmark(mp_pose.PoseLandmark.NOSE.value)
        
        # Calculate midpoints
        mid_shoulder = (left_shoulder + right_shoulder) / 2
        mid_ear = (left_ear + right_ear) / 2
        mid_hip = (left_hip + right_hip) / 2
        
        analysis = {}
        
        # Forward head posture
        forward_head_distance = mid_ear[0] - mid_shoulder[0]
        analysis['forward_head_distance'] = float(forward_head_distance)
        analysis['forward_head_binary'] = 1 if forward_head_distance > 0.08 else 0
        
        # Shoulder imbalance
        shoulder_height_diff = abs(left_shoulder[1] - right_shoulder[1])
        analysis['shoulder_imbalance'] = float(shoulder_height_diff)
        analysis['shoulder_imbalance_binary'] = 1 if shoulder_height_diff > 0.05 else 0
        
        # Head tilt
        head_tilt_angle = abs(math.atan2(right_ear[1] - left_ear[1], right_ear[0] - left_ear[0]))
        analysis['head_tilt'] = float(head_tilt_angle)
        analysis['head_tilt_binary'] = 1 if head_tilt_angle > 0.2 else 0
        
        # Slouching
        slouch_distance = mid_shoulder[0] - mid_hip[0]
        analysis['slouch_distance'] = float(slouch_distance)
        analysis['slouching_binary'] = 1 if slouch_distance > 0.05 else 0
        
        # Overall alignment
        head_shoulder_offset = abs(mid_ear[0] - mid_shoulder[0])
        shoulder_hip_offset = abs(mid_shoulder[0] - mid_hip[0])
        total_misalignment = head_shoulder_offset + shoulder_hip_offset
        analysis['total_misalignment'] = float(total_misalignment)
        analysis['alignment_binary'] = 1 if total_misalignment > 0.12 else 0
        
        # Neck angle
        neck_vector = mid_ear - mid_shoulder
        torso_vector = mid_shoulder - mid_hip
        
        dot_product = np.dot(neck_vector, torso_vector)
        norms = np.linalg.norm(neck_vector) * np.linalg.norm(torso_vector)
        
        if norms > 0:
            neck_angle = math.acos(np.clip(dot_product / norms, -1, 1))
            neck_angle_degrees = math.degrees(neck_angle)
            analysis['neck_angle'] = float(neck_angle_degrees)
            analysis['neck_angle_binary'] = 1 if abs(neck_angle_degrees - 90) > 25 else 0
        else:
            analysis['neck_angle'] = 90.0
            analysis['neck_angle_binary'] = 0
        
        print("Analysis completed successfully")
        return analysis, results
        
    except Exception as e:
        logger.error(f"Error in pose analysis: {e}")
        return None, None

def get_posture_issues_and_recommendations(analysis):
    """Get human-readable issues and recommendations based on binary classifications"""
    issues = []
    recommendations = []
    
    if analysis['forward_head_binary'] == 1:
        issues.append("Forward head posture detected")
        recommendations.append({
            'issue': 'Forward Head Posture',
            'tips': [
                'Tuck your chin back',
                'Imagine a string pulling the top of your head up',
                'Keep your ears aligned over your shoulders'
            ]
        })
    
    if analysis['shoulder_imbalance_binary'] == 1:
        issues.append("Uneven shoulders")
        recommendations.append({
            'issue': 'Shoulder Imbalance',
            'tips': [
                'Check if you\'re carrying weight on one side',
                'Practice shoulder blade squeezes',
                'Be aware of which shoulder tends to be higher'
            ]
        })
    
    if analysis['head_tilt_binary'] == 1:
        issues.append("Head tilted to one side")
        recommendations.append({
            'issue': 'Head Tilt',
            'tips': [
                'Practice head alignment exercises',
                'Check your workspace ergonomics',
                'Be mindful of phone/computer screen positioning'
            ]
        })
    
    if analysis['slouching_binary'] == 1:
        issues.append("Slouching/rounded shoulders")
        recommendations.append({
            'issue': 'Slouching',
            'tips': [
                'Pull your shoulder blades back and down',
                'Engage your core muscles',
                'Keep your chest open'
            ]
        })
    
    if analysis['alignment_binary'] == 1:
        issues.append("Poor overall alignment")
        recommendations.append({
            'issue': 'Overall Alignment',
            'tips': [
                'Practice standing against a wall',
                'Focus on stacking head over shoulders over hips',
                'Consider ergonomic adjustments to your workspace'
            ]
        })
    
    if analysis['neck_angle_binary'] == 1:
        issues.append("Poor neck angle")
        recommendations.append({
            'issue': 'Neck Angle',
            'tips': [
                'Adjust your screen to eye level',
                'Practice neck stretches',
                'Maintain neutral neck position'
            ]
        })
    
    return issues, recommendations

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'mediapipe_available': True,
        'tensorflow_available': False,
        'message': 'Simple version running without ML model'
    })

@app.route('/analyze-posture', methods=['POST'])
def analyze_posture_endpoint():
    """Main endpoint for posture analysis"""
    try:
        print("Received posture analysis request")
        
        # Get the uploaded file
        if 'photo' not in request.files:
            return jsonify({
                'success': False,
                'error': 'No photo provided'
            }), 400

        file = request.files['photo']
        if file.filename == '':
            return jsonify({
                'success': False,
                'error': 'No photo selected'
            }), 400

        print(f"Processing uploaded file: {file.filename}")

        # Read and process the image
        file_bytes = file.read()
        nparr = np.frombuffer(file_bytes, np.uint8)
        img_bgr = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if img_bgr is None:
            return jsonify({
                'success': False,
                'error': 'Invalid image format'
            }), 400

        img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
        print(f"Image shape: {img_rgb.shape}")

        # Get metadata if provided
        metadata = {}
        if 'metadata' in request.form:
            import json
            metadata = json.loads(request.form['metadata'])

        # Analyze posture
        analysis, pose_results = analyze_posture(img_rgb)
        
        if analysis is None:
            return jsonify({
                'success': False,
                'error': 'No pose detected in image'
            }), 400

        # Create dummy ML prediction since we don't have TensorFlow
        ml_prediction = {
            'probability': 0.5,
            'binary_prediction': 0,
            'posture_quality': 'Analysis based on pose landmarks only',
            'confidence': 0.0
        }
        
        # Get issues and recommendations
        issues, recommendations = get_posture_issues_and_recommendations(analysis)
        
        # Calculate overall score
        total_issues = sum([
            analysis['forward_head_binary'],
            analysis['shoulder_imbalance_binary'],
            analysis['head_tilt_binary'],
            analysis['slouching_binary'],
            analysis['alignment_binary'],
            analysis['neck_angle_binary']
        ])
        
        posture_score = max(0, 100 - (total_issues * 16.67))  # Each issue reduces score by ~16.67%
        
        print(f"Analysis complete. Issues found: {total_issues}, Score: {posture_score}")
        
        # Prepare response
        response = {
            'success': True,
            'timestamp': metadata.get('timestamp'),
            'analysis': {
                'ml_prediction': ml_prediction,
                'technical_measurements': {
                    'forward_head_distance': analysis['forward_head_distance'],
                    'shoulder_imbalance': analysis['shoulder_imbalance'],
                    'head_tilt': analysis['head_tilt'],
                    'slouch_distance': analysis['slouch_distance'],
                    'total_misalignment': analysis['total_misalignment'],
                    'neck_angle': analysis.get('neck_angle', 90.0)
                },
                'binary_indicators': {
                    'forward_head': analysis['forward_head_binary'],
                    'shoulder_imbalance': analysis['shoulder_imbalance_binary'],
                    'head_tilt': analysis['head_tilt_binary'],
                    'slouching': analysis['slouching_binary'],
                    'alignment': analysis['alignment_binary'],
                    'neck_angle': analysis['neck_angle_binary']
                },
                'issues': issues,
                'recommendations': recommendations,
                'posture_score': round(posture_score, 1),
                'total_issues_count': total_issues
            }
        }
        
        return jsonify(response)

    except Exception as e:
        logger.error(f"Error in posture analysis: {e}")
        return jsonify({
            'success': False,
            'error': f'Internal server error: {str(e)}'
        }), 500

if __name__ == '__main__':
    print("Starting simple Flask server (no TensorFlow)...")
    print("This version uses only MediaPipe for pose analysis")
    
    logger.info("Starting Flask server...")
    app.run(debug=True, host='0.0.0.0', port=5000)