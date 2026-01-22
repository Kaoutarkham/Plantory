# Use Node 18 Alpine for a small image size
FROM node:18-alpine

# Set the directory inside the container
WORKDIR /usr/src/app

# Copy dependency files
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of your backend code
COPY . .

# Expose the backend port
EXPOSE 3000

# Run the app in development mode (with nodemon)
CMD ["npm", "run", "dev"]