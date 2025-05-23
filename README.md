# AI-Powered Phishing Detection

## Quick Start Web App (Recommended) 

The fastest way to run both the backend (Flask API) and frontend (Angular app) is using the root `package.json` scripts. This will install all dependencies and start both servers concurrently.

### 1. Install all dependencies (Node.js, Angular, Python)

```powershell
npm install
```

This will:
- Install frontend dependencies in `phishing-detection-frontend/`
- Install Python dependencies from `requirements.txt`

### 2. Start both backend and frontend

```powershell
npm run start
```

- The Flask backend will run at [http://127.0.0.1:5000](http://127.0.0.1:5000)
- The Angular frontend will run at [http://localhost:4200](http://localhost:4200)

---

## Manual Setup

### Backend (Flask API)

1. Install Python dependencies:
    ```powershell
    pip install -r requirements.txt
    ```
2. Run the Flask app:
    ```powershell
    python app/main.py
    ```

### Frontend (Angular)

1. Install Node.js dependencies:
    ```powershell
    cd phishing-detection-frontend
    npm install
    ```
2. Start the Angular app:
    ```powershell
    npm run start
    ```
    or
    ```powershell
    ng serve
    ```

---

## API Usage

Send a POST request to the `/predict` endpoint with the text in the request body:

```json
{
    "text": "Your email content here"
}
```

### Example using `curl`

```powershell
curl -X POST http://127.0.0.1:5000/predict -H "Content-Type: application/json" -d '{"text": "Your email content here"}'
```

---

## Project Structure

- `app/` - Flask backend (API)
- `phishing-detection-frontend/` - Angular frontend
- `requirements.txt` - Python dependencies
- `package.json` - Project scripts for quick setup

---

## Notes
- Make sure you have Python, Node.js, and npm installed.
- The default setup assumes the backend runs on port 5000 and the frontend on port 4200.
- The frontend communicates directly with the backend at `http://127.0.0.1:5000/predict`.

---

## Running the AI Model Notebooks (`AI_Model/`)

You can experiment with, retrain, or modify the machine learning models using the Jupyter notebooks in the `AI_Model/` directory. There are two main ways to run these notebooks:

### 1. Run in Google Colab (Recommended for most users)

1. Go to [Google Colab](https://colab.research.google.com/).
2. Click `File > Upload Notebook` and select a notebook (e.g., `RandomForest.ipynb` or `ModelInterface.ipynb`) from the `AI_Model/` directory.
3. (Optional) Upload any required data from the `sample_data/` directory using the Colab file upload interface.
4. Run the notebook cells interactively in your browser.
5. After training, download the exported `model.pkl` and `vectorizer.pkl` files and place them in `app/model/` for use by the backend.

### 2. Run Locally (Recommended For full web based application setup) 

1. Install Jupyter if you haven't already:
    ```powershell
    pip install notebook
    ```
2. Start Jupyter Notebook in the project directory:
    ```powershell
    jupyter notebook
    ```
3. In your browser, open the desired notebook from the `AI_Model/` directory.
4. Run the cells as needed. Make sure any required data from `sample_data/` is accessible.
5. After training, ensure the exported `model.pkl` and `vectorizer.pkl` are placed in `app/model/`.

---
