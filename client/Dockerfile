# Use an official Node.js image as a base
FROM node:17-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD [ "npm", "run", "dev" ]
