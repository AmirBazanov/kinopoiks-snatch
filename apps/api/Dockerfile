FROM node:18.14-alpine

WORKDIR /usr/src/app

COPY ["package*.json", "project.json", "*.env", "*config*","./"]
COPY ./apps/api ./apps/api
COPY ./libs ./libs

RUN npm install \
    && npm install -g nx

RUN npx nx run api:build:production
CMD node dist/apps/api/main.js
