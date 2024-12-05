# Stage 1: Build the react app
FROM node:20-alpine as base

# Enable corepack
RUN corepack enable

# Copy the whole monorepo
COPY . ./usr/src/app

# Move to common package folder
WORKDIR /usr/src/app/packages/common

# Install common package dependencies
RUN pnpm install

# Build common package project
RUN pnpm build

# Move to prisma package folder
WORKDIR /usr/src/app/packages/prisma

# Install prisma package dependencies
RUN pnpm install

# Generate prisma package project
RUN pnpm generate

# Build prisma package project
RUN pnpm build

# Move to bff folder
WORKDIR /usr/src/app/apps/bff

# Install bff dependencies
RUN pnpm install

# Build bff project
RUN pnpm build

# Expose port 4000
EXPOSE 4000

# Start the dev server
CMD ["pnpm", "start"]
