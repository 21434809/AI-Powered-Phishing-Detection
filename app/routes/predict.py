from flask import Blueprint, request, jsonify, send_from_directory
import pickle
import os

predict_bp = Blueprint('predict', __name__)

@predict_bp.route('/', methods=['GET'])
def index():
    return "Welcome to the Phishing Detection API!"

@predict_bp.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(predict_bp.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@predict_bp.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    # Load the model
    with open('app/model/model.pkl', 'rb') as f:
        model = pickle.load(f)
    # Load the vectorizer
    with open('app/model/vectorizer.pkl', 'rb') as f:
        vectorizer = pickle.load(f)
    # Transform the input text using the vectorizer
    text_vec = vectorizer.transform([data['text']])
    # Make prediction
    prediction = model.predict(text_vec)
    return jsonify({'prediction': prediction.tolist()})
