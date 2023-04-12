FROM node:lts-alpine as build-stag
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build