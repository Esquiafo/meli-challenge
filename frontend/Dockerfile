# Use Node.js LTS image as base
FROM node:lts as build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to work directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application code to work directory
COPY . .

# Build the React app for production
RUN npm run build

# Production environment
FROM node:lts-alpine

# Set working directory inside the container
WORKDIR /app

# Copy build output from build stage
COPY --from=build /app/build ./build

# Expose port 3000 (or your application's port)
EXPOSE 3000

# Command to run the application
CMD ["npx", "serve", "-s", "build"]
