## Build command: docker build -t stegochat .

# Stage 1: Build the application.
FROM node:lts-alpine3.19 as builder
WORKDIR /app
COPY . .
COPY .env .env
RUN npm i
RUN npm run build

# Stage 2: Run the application.
FROM nginx:alpine
WORKDIR /app
COPY --from=builder /app/dist /app
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Run command on container starting.
CMD ["nginx", "-g", "daemon off;"]