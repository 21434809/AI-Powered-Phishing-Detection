# syntax=docker/dockerfile:1
# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY phishing-detection-frontend/package*.json ./
RUN npm ci
COPY phishing-detection-frontend/ ./
RUN npm run build

# Run stage
FROM nginx:1.27-alpine
# Copy built Angular app to Nginx html dir
COPY --from=build /app/dist/phishing-detection-frontend /usr/share/nginx/html
# Replace default nginx conf
COPY phishing-detection-frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]