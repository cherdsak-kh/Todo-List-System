FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install openssl which is required by Prisma
RUN apk add --no-cache openssl

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Copy prisma schema to generate client
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Expose port 3000 (Based on the deploy-windows.yml: -p 80:3000)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
