FROM node:lts-alpine as build-stage     # layer unchanged, use cache
WORKDIR /                            # layer unchanged, use cache
COPY package*.json ./                   # layer unchanged, use cache
RUN npm install                         # layer unchanged, use cache
COPY . .                                # layer changed, run again
RUN npm run build                       # previous layer changed, run again