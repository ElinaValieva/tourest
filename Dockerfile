## Build Frontend Assets
FROM node:18-alpine as build
ARG API_KEY
ENV API_KEY=${API_KEY:-v1.0.0}
RUN echo $API_KEY

WORKDIR /app
RUN echo REACT_APP_FIREBASE_API_KEY=$API_KEY > .env
RUN cat .env
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