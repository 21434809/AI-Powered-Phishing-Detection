from flask import Blueprint, request, jsonify, send_from_directory
import pickle
import os
import numpy as np

predict_bp = Blueprint('predict', __name__)

@predict_bp.route('/', methods=['GET'])
def index():
    return "Welcome to the Phishing Detection API!"


def predict_text(text, model, vectorizer):
    # Transform the input text using the fitted vectorizer
    text_vec = vectorizer.transform([text])
    # Predict the label
    prediction = model.predict(text_vec)
    # Calculate the probability of each class 
    probabilities = model.predict_proba(text_vec)
    # Return True if predicted label is spam (assuming spam is labeled as 1), otherwise False
    is_spam = prediction[0] == 1
    return is_spam, probabilities

def get_suspect_words(text, model, vectorizer, top_n=5):
    # Transform the input text using the fitted vectorizer
    text_vec = vectorizer.transform([text])

    # Get feature names (words) from the vectorizer
    feature_names = np.array(vectorizer.get_feature_names_out())

    # Determine feature importance from the model
    if hasattr(model, 'coef_'):
        coef = model.coef_[0]  # Extract coefficients for the positive class
    elif hasattr(model, 'feature_importances_'):
        coef = model.feature_importances_
    else:
        return []  # fallback if neither attribute is available

    # Get the nonzero feature indices in the transformed input
    word_indices = text_vec.nonzero()[1]

    # Get word importance scores
    word_importance = coef[word_indices]

    # Pair words with their importance scores
    words_to_exclude = ['body', 'subject']
    word_contributions = []
    for idx, importance in zip(word_indices, word_importance):
        word = feature_names[idx]
        if word.lower() not in words_to_exclude:  # Only add words that aren't in our exclusion list
            word_contributions.append((word, importance))

    # Sort by absolute importance
    word_contributions = sorted(word_contributions, key=lambda x: abs(x[1]), reverse=True)

    # Return the top N suspect words
    return word_contributions[:top_n]

@predict_bp.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    # Load the model
    with open('app/model/model.pkl', 'rb') as f:
        model = pickle.load(f)
    # Load the vectorizer
    with open('app/model/vectorizer.pkl', 'rb') as f:
        vectorizer = pickle.load(f)
    # Predict if the text is spam and get probabilities
    is_spam, probabilities = predict_text(data['text'], model, vectorizer)
    # Get suspect words
    suspect_words = get_suspect_words(data['text'], model, vectorizer)
    return jsonify({'is_spam': int(is_spam), 'probabilities': probabilities.tolist(), 'suspect_words': suspect_words})

@predict_bp.route('/evaluate', methods=['GET'])
def evaluate():
    text = request.args.get('text')
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    # Load the model
    with open('app/model/model.pkl', 'rb') as f:
        model = pickle.load(f)
    # Load the vectorizer
    with open('app/model/vectorizer.pkl', 'rb') as f:
        vectorizer = pickle.load(f)
    # Predict if the text is spam and get probabilities
    is_spam, probabilities = predict_text(text, model, vectorizer)
    # Get suspect words
    suspect_words = get_suspect_words(text, model, vectorizer)
    return jsonify({'is_spam': int(is_spam), 'probabilities': probabilities.tolist(), 'suspect_words': suspect_words})