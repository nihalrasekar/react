# Use the official Node.js image with your specific version
FROM node:20.11.1

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose any ports the app needs
EXPOSE 3000

# Start the React Native packager
CMD ["npm", "start"]
