# Dockerfile for client

# Stage 1: Build react client
FROM node:alpine

# Working directory be app
WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

# copy local files to app folder
COPY . .

EXPOSE 8080

CMD ["npm","run", "dev"]