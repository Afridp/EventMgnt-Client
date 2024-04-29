# Build stage
FROM node:alpine3.19 as build

# Set environment variable to prevent npm from asking for permission
ENV CI=true

# Install dependencies and build the app
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:1.26.0-alpine

# Copy built files from the build stage to the nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
