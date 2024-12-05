# Stage 1: Build the react app
FROM node:20-alpine as base

# Enable corepack
RUN corepack enable

# Accept build argument
ARG VITE_BFF_ADDRESS

# Set environment variable
ENV VITE_BFF_ADDRESS=$VITE_BFF_ADDRESS

# Copy the whole monorepo
COPY . ./usr/src/app

# Move to common package folder
WORKDIR /usr/src/app/packages/common

# Install common package dependencies
RUN pnpm install

# Build common package project
RUN pnpm build

# Move to bff folder
WORKDIR /usr/src/app/apps/webapp

# Install dependencies
RUN pnpm install

# Build the application
RUN pnpm build

# Stage 2: Serve the react app with nginx
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=base /usr/src/app/apps/webapp/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]