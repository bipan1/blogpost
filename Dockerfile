# Use a Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies   

RUN npm install

COPY . .
# Copy the rest of the application code

# Generate Prisma client
RUN npx prisma generate

# Expose the port for the Next.js app
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]