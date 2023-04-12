FROM node:lts-alpine as build-stag
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install --production
CMD ["node", "app.js"]