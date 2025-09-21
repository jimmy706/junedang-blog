# Stage 1: Build the application
FROM node:lts-alpine AS build

ENV PORT=3000
ENV HOST=0.0.0.0
ENV API_URL=https://jimmy706.github.io/junedang-blog-pages
ENV API_PATH=/api
ENV API_CACHE_TTL=3600
ENV PUBLIC_MAINTENANCE_MODE=false


# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Write environment variables to .env file
RUN echo "HOST=$HOST" >> .env && \
    echo "PORT=$PORT" >> .env && \
    echo "GITHUB_PAGE_URL=$GITHUB_PAGE_URL" >> .env && \
    echo "GITHUB_BLOG_APP=$GITHUB_BLOG_APP" >> .env && \
    echo "API_CACHE_TTL=$API_CACHE_TTL" >> .env && \
    echo "PUBLIC_MAINTENANCE_MODE=$PUBLIC_MAINTENANCE_MODE" >> .env

# Build the Svelte project
RUN npm run build

EXPOSE $PORT

# Start Nginx server
CMD ["node", "--env-file=.env", "build"]
