FROM node:18.14-alpine

WORKDIR /usr/src/app

COPY ["package*.json", "nx.json", "*.env", "*config*","./"]
COPY ./apps/movies ./apps/movies
COPY ./libs ./libs
RUN npm install \
    && npm install -g nx
RUN npx nx run movies:build:production
CMD node dist/apps/movies/main.js
