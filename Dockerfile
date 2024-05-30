
# # Build stage
# FROM node:alpine3.19 as build

# # Set environment variable to prevent npm from asking for permission
# ENV CI=true

# # Set environment variables during build
# ARG VITE_APP_NODE_ENV
# ARG VITE_APP_SERVER_BASE_URL
# ARG VITE_APP_STRIPE_KEY
# ARG VITE_APP_GOOGLE_MAP_API

# # Install dependencies and build the app
# WORKDIR /app
# COPY package.json .
# RUN npm install --legacy-peer-deps
# COPY . .
# RUN npm run build

# # Serve with Nginx
# FROM nginx:1.26.0-alpine

# # Copy built files from the build stage to the nginx directory
# COPY --from=build /app/dist /usr/share/nginx/html   

# # Copy nginx configuration file
# COPY nginx.conf /etc/nginx/nginx.conf

# # COPY cloudflare-cert.pem /etc/nginx/ssl/cloudflare-cert.pem
# # COPY cloudflare-key.pem /etc/nginx/ssl/cloudflare-key.pem

# # Set environment variables for the application
# ENV VITE_APP_NODE_ENV=$VITE_APP_NODE_ENV
# ENV VITE_APP_SERVER_BASE_URL=$VITE_APP_SERVER_BASE_URL
# ENV VITE_APP_STRIPE_KEY=$VITE_APP_STRIPE_KEY
# ENV VITE_APP_GOOGLE_MAP_API=$VITE_APP_GOOGLE_MAP_API

# # Expose port 80
# EXPOSE 80
# EXPOSE 443

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]


# Set environment variables during build
ARG VITE_APP_SERVER_BASE_URL
ARG VITE_APP_STRIPE_KEY
ARG VITE_APP_GOOGLE_MAP_API


# Build stage
FROM node:alpine3.19 as build

# Set environment variable to prevent npm from asking for permission
ENV CI=true

# Install dependencies and build the app
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:1.26.0-alpine

# Copy built files from the build stage to the nginx directory
COPY --from=build /app/dist /usr/share/nginx/html   

# Copy nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Set environment variables for the application (repeat ARG and ENV for final stage)
ARG VITE_APP_SERVER_BASE_URL
ARG VITE_APP_STRIPE_KEY
ARG VITE_APP_GOOGLE_MAP_API

# Set environment variables in the final image
ENV VITE_APP_NODE_ENV=production
ENV VITE_APP_SERVER_BASE_URL=$VITE_APP_SERVER_BASE_URL
ENV VITE_APP_STRIPE_KEY=$VITE_APP_STRIPE_KEY
ENV VITE_APP_GOOGLE_MAP_API=$VITE_APP_GOOGLE_MAP_API

# Expose port 80
EXPOSE 3000
# EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
