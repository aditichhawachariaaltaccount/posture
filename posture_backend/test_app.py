from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({
        'message': 'Flask server is working!',
        'status': 'success'
    })

@app.route('/health')
def health():
    return jsonify({
        'status': 'healthy',
        'message': 'Server is running correctly'
    })

if __name__ == '__main__':
    print("Starting minimal test Flask server...")
    app.run(debug=True, host='0.0.0.0', port=5000)