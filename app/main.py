import sys
import os

# Add the app directory to the path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
# Import the create_app function from the app package
from app import create_app
# Create the app
app = create_app()
# Run the app
if __name__ == "__main__":
    app.run(debug=True)
