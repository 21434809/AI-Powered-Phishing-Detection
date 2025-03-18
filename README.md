# AI-Powered Phishing Detection

## Setup

1. Install the required packages:
    ```bash
    pip install -r requirements.txt
    ```

2. Run the Flask app:
    ```bash
    python app/main.py
    ```

## Usage

Send a POST request to the `/predict` endpoint with the text in the request body:
```json
{
    "text": "Your email content here"
}
```

### Example using `curl`

```bash
curl -X POST http://127.0.0.1:5000/predict -H "Content-Type: application/json" -d '{"text": "Your email content here"}'
```
