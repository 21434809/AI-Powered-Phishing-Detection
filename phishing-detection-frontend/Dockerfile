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
# Replace default nginx conf
COPY phishing-detection-frontend/nginx.conf /etc/nginx/conf.d/default.conf
# Copy built Angular app (handle both Angular dist layouts)
COPY --from=build /app/dist/phishing-detection-frontend /tmp/dist
RUN rm -rf /usr/share/nginx/html/* \
  && if [ -d /tmp/dist/browser ]; then cp -r /tmp/dist/browser/* /usr/share/nginx/html/; else cp -r /tmp/dist/* /usr/share/nginx/html/; fi
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]