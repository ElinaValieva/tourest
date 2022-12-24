# Build Frontend Assets
FROM node:18-alpine as build
## Firebase args
### Firebase API Key
ARG API_KEY
ENV API_KEY=${API_KEY:-}
### Firebase App name
ARG APP_NAME
ENV APP_NAME=${APP_NAME:-}
### Project name
ARG GCP_PROJECT
ENV GCP_PROJECT=${GCP_PROJECT:-}
### Firebase Message Sender ID
ARG MESSAGING_SENDER_ID
ENV MESSAGING_SENDER_ID=${MESSAGING_SENDER_ID:-}

WORKDIR /app
## Prepare env config
RUN echo -e " \
    REACT_APP_FIREBASE_API_KEY=$API_KEY\n \
    REACT_APP_FIREBASE_APP_ID=${APP_NAME}\n \
    REACT_APP_FIREBASE_AUTH_DOMAIN=${GCP_PROJECT}.firebaseapp.com\n \
    REACT_APP_PROJECT_ID=${GCP_PROJECT}\n \
    REACT_APP_FIREBASE_STORAGE_BUCKET=${GCP_PROJECT}.appspot.com\n \
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=${MESSAGING_SENDER_ID}" > .env
RUN cat .env
## Build sources
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve Frontend Assets
FROM fholzer/nginx-brotli:v1.12.2

WORKDIR /etc/nginx
ADD nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]