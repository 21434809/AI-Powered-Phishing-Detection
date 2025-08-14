# syntax=docker/dockerfile:1
FROM python:3.9-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Install minimal runtime libs sometimes needed by numpy/scipy wheels
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgomp1 libgfortran5 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install dependencies
COPY app/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy application code (including model artifacts)
COPY app /app/app

EXPOSE 5000

# Run with gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app.main:app"]