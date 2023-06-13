FROM node:18.14-alpine

WORKDIR /usr/src/app

COPY ["package*.json", "nx.json", "*.env", "*config*","./"]
COPY ./apps/genres ./apps/genres
COPY ./libs ./libs
RUN npm install \
    && npm install -g nx
RUN npx nx run genres:build:production
CMD node dist/apps/genres/main.js
