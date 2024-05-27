## Build command: docker build -t stegochat-api .

# Stage 1: Build the application.
FROM node:lts-alpine3.19 as builder
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build
RUN rm -r node_modules
RUN npm ci --omit=dev

# Stage 2: Run the application
FROM node:lts-alpine3.19
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
RUN mkdir storage

# Run command on container starting.
CMD ["npm", "run", "start:prod"]