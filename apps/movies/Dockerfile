FROM node:18.14-alpine

WORKDIR /usr/src/app

COPY ["package*.json", "project.json", "*.env", "*config*","./"]
COPY ./apps/movies ./apps/movies
COPY ./libs ./libs
RUN npm i nx
RUN npx nx run movies:build:production
CMD node dist/apps/movies/main.js
