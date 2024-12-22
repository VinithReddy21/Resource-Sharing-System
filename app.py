from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# In-memory storage for shared resources
shared_resources = []

@app.route('/share', methods=['POST'])
def share_resource():
    resource = request.json.get('resource')
    if resource:
        shared_resources.append(resource)
        return jsonify({"message": f"Resource '{resource}' shared successfully."}), 200
    return jsonify({"error": "No resource provided."}), 400

@app.route('/resources', methods=['GET'])
def get_resources():
    return jsonify({"resources": shared_resources}), 200

if __name__ == '__main__':
    app.run(debug=True)
