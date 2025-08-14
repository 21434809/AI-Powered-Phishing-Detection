# Phishing Detection – Run Instructions

## Prerequisites
- Node.js 20+
- npm 10+
- Python 3.9+ (only for local dev backend without Docker)
- Docker and Docker Compose (for containerized run)

## Option A: Run locally (development)

1) Start the backend (Flask)
```
cd app
export FLASK_DEBUG=1
python3 -m flask --app main run --host 0.0.0.0 --port 5000
```
- API base URL: http://127.0.0.1:5000/api
- Health: http://127.0.0.1:5000/api/

2) Start the frontend (Angular)
```
cd phishing-detection-frontend
npm ci
npm run start
```
- App URL: http://localhost:4200
- The dev server proxies /api to the backend (see `proxy.conf.json`).

## Option B: Run with Docker (recommended)

From the repository root:
```
docker compose up -d --build
```
- Frontend: http://localhost:8080
- Backend API: http://localhost:5000/api

Stop services:
```
docker compose down
```

View logs:
```
docker compose logs -f backend
```
```
docker compose logs -f frontend
```

## API quick test
```
curl -s -X POST http://127.0.0.1:5000/api/predict \
  -H 'Content-Type: application/json' \
  -d '{"text":"Subject: hello. Body: test message"}' | jq .
```

## Troubleshooting
- 404 on /api/predict in dev: ensure Flask is running and Angular started with the dev proxy (npm run start).
- Model files missing: confirm `app/model/model.pkl` and `app/model/vectorizer.pkl` exist.
- Port conflicts: change published ports in `docker-compose.yml` (8080 for frontend, 5000 for backend).
