# 1) Use an official Node.js runtime as a parent image
FROM node:22

# 2) Create and set the working directory in the container
WORKDIR /app

# 3) Copy package.json and package-lock.json first (for caching npm install)
COPY package*.json ./

# 4) Install dependencies
RUN npm install --production
# or RUN npm ci --production

# 5) Copy the rest of the application files
COPY . .

# 6) Expose the port your app runs on (e.g., 3000)
EXPOSE 3000

# 7) Start command
CMD ["npm", "start"]
