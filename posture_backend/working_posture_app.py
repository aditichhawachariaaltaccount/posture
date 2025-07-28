from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import mediapipe as mp
import numpy as np
import math
from PIL import Image
import logging
import os
import json
import traceback

print("Starting posture analysis Flask app...")

app = Flask(__name__)
CORS(app, origins=['*'])  # Allow all origins for development

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def analyze_posture(image):
    """Analyze posture using MediaPipe landmarks"""
    try:
        print(f"Analyzing image with shape: {image.shape}")
        
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
            # Convert to RGB if needed
            if len(image.shape) == 3:
                rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB) if image.shape[2] == 3 else image
                results = pose.process(rgb_image)
            else:
                print("Invalid image format")
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
        try:
            left_shoulder = get_landmark(mp_pose.PoseLandmark.LEFT_SHOULDER.value)
            right_shoulder = get_landmark(mp_pose.PoseLandmark.RIGHT_SHOULDER.value)
            left_ear = get_landmark(mp_pose.PoseLandmark.LEFT_EAR.value)
            right_ear = get_landmark(mp_pose.PoseLandmark.RIGHT_EAR.value)
            left_hip = get_landmark(mp_pose.PoseLandmark.LEFT_HIP.value)
            right_hip = get_landmark(mp_pose.PoseLandmark.RIGHT_HIP.value)
            nose = get_landmark(mp_pose.PoseLandmark.NOSE.value)
        except Exception as e:
            print(f"Error extracting landmarks: {e}")
            return None, None
        
        # Calculate midpoints
        mid_shoulder = (left_shoulder + right_shoulder) / 2
        mid_ear = (left_ear + right_ear) / 2
        mid_hip = (left_hip + right_hip) / 2
        
        analysis = {}
        
        # Forward head posture
        forward_head_distance = abs(mid_ear[0] - mid_shoulder[0])
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
        slouch_distance = abs(mid_shoulder[0] - mid_hip[0])
        analysis['slouch_distance'] = float(slouch_distance)
        analysis['slouching_binary'] = 1 if slouch_distance > 0.05 else 0
        
        # Overall alignment
        head_shoulder_offset = abs(mid_ear[0] - mid_shoulder[0])
        shoulder_hip_offset = abs(mid_shoulder[0] - mid_hip[0])
        total_misalignment = head_shoulder_offset + shoulder_hip_offset
        analysis['total_misalignment'] = float(total_misalignment)
        analysis['alignment_binary'] = 1 if total_misalignment > 0.12 else 0
        
        # Neck angle
        try:
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
        except Exception as e:
            print(f"Error calculating neck angle: {e}")
            analysis['neck_angle'] = 90.0
            analysis['neck_angle_binary'] = 0
        
        print("Analysis completed successfully")
        return analysis, results
        
    except Exception as e:
        logger.error(f"Error in pose analysis: {e}")
        traceback.print_exc()
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

# Root route for testing
@app.route('/')
def home():
    return jsonify({
        'message': 'Posture Analysis API is running!',
        'version': '1.0',
        'endpoints': {
            'health': 'GET /health',
            'test': 'GET /test',
            'analyze': 'POST /analyze-posture'
        }
    })

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'mediapipe_available': True,
        'message': 'Posture analysis server running',
        'version': '1.0'
    })

@app.route('/test', methods=['GET'])
def test_endpoint():
    """Simple test endpoint to verify server is reachable"""
    print("Test endpoint hit!")
    return jsonify({
        'success': True,
        'message': 'Flask server is running and reachable!',
        'timestamp': str(np.datetime64('now'))
    })

@app.route('/analyze-posture', methods=['POST'])
def analyze_posture_endpoint():
    """Main endpoint for posture analysis"""
    try:
        print("="*50)
        print("Received posture analysis request")
        print(f"Request files: {list(request.files.keys())}")
        print(f"Request form: {list(request.form.keys())}")
        
        # Check if photo is provided
        if 'photo' not in request.files:
            print("ERROR: No photo in request files")
            return jsonify({
                'success': False,
                'error': 'No photo provided'
            }), 400

        file = request.files['photo']
        if file.filename == '':
            print("ERROR: Empty filename")
            return jsonify({
                'success': False,
                'error': 'No photo selected'
            }), 400

        print(f"Processing uploaded file: {file.filename}")
        print(f"File content type: {file.content_type}")

        # Read and process the image
        try:
            file_bytes = file.read()
            print(f"File size: {len(file_bytes)} bytes")
            
            # Convert bytes to numpy array
            nparr = np.frombuffer(file_bytes, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            
            if img is None:
                print("ERROR: Could not decode image")
                return jsonify({
                    'success': False,
                    'error': 'Invalid image format or corrupted file'
                }), 400

            print(f"Image decoded successfully. Shape: {img.shape}")
            
        except Exception as e:
            print(f"ERROR: Failed to read/decode image: {e}")
            traceback.print_exc()
            return jsonify({
                'success': False,
                'error': f'Failed to process image: {str(e)}'
            }), 400

        # Get metadata if provided
        metadata = {}
        if 'metadata' in request.form:
            try:
                metadata = json.loads(request.form['metadata'])
                print(f"Metadata: {metadata}")
            except json.JSONDecodeError as e:
                print(f"Warning: Invalid metadata JSON: {e}")
                metadata = {}

        # Analyze posture
        print("Starting posture analysis...")
        analysis, pose_results = analyze_posture(img)
        
        if analysis is None:
            print("ERROR: No pose detected in image")
            return jsonify({
                'success': False,
                'error': 'No pose detected in image. Make sure the person is clearly visible and facing the camera.'
            }), 400

        print("Posture analysis successful!")
        
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
        
        # Determine posture quality based on score
        if posture_score >= 80:
            posture_quality = "Good"
            binary_prediction = 1
        elif posture_score >= 60:
            posture_quality = "Fair"
            binary_prediction = 0
        else:
            posture_quality = "Poor"
            binary_prediction = 0
        
        # Create ML prediction
        ml_prediction = {
            'probability': posture_score / 100.0,
            'binary_prediction': binary_prediction,
            'posture_quality': posture_quality,
            'confidence': max(0.7, posture_score / 100.0)
        }
        
        print(f"Analysis complete. Issues found: {total_issues}, Score: {posture_score}")
        
        # Response matching React Native expectations
        response = {
            'success': True,
            'analysis': {
                'posture_score': round(posture_score, 1),
                'ml_prediction': ml_prediction,
                'issues': issues,
                'recommendations': recommendations,
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
                'total_issues_count': total_issues
            },
            'timestamp': metadata.get('timestamp'),
            'metadata': metadata
        }
        
        print("Sending successful response")
        return jsonify(response)

    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
        traceback.print_exc()
        return jsonify({
            'success': False,
            'error': f'Internal server error: {str(e)}'
        }), 500

if __name__ == '__main__':
    print("="*60)
    print("🚀 POSTURE ANALYSIS FLASK SERVER")
    print("="*60)
    print("Available endpoints:")
    print("  GET  / - Server info")
    print("  GET  /health - Health check") 
    print("  GET  /test - Simple connectivity test")
    print("  POST /analyze-posture - Main analysis endpoint")
    print("")
    print("📋 SETUP CHECKLIST:")
    print("1. ✅ Install dependencies:")
    print("   pip install flask flask-cors opencv-python mediapipe numpy pillow")
    print("")
    print("2. 🌐 Network setup:")
    print("   - Find your computer's IP address:")
    print("     Windows: ipconfig")
    print("     Mac/Linux: ifconfig")
    print("   - Update API_BASE_URL in your React Native app")
    print("   - Ensure phone and computer are on same WiFi")
    print("")
    print("3. 🔥 Firewall:")
    print("   - Allow port 5000 through your firewall")
    print("   - On Windows: Windows Defender Firewall")
    print("   - On Mac: System Preferences > Security & Privacy > Firewall")
    print("")
    print("🎯 Starting server on http://0.0.0.0:5001")
    print("   Access from your phone at: http://YOUR_IP:5001")
    print("="*60)
    
    app.run(debug=True, host='0.0.0.0', port=5001, threaded=True)