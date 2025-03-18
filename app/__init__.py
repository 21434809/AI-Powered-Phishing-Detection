from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS
    
    from .routes.predict import predict_bp
    app.register_blueprint(predict_bp)
    
    return app
