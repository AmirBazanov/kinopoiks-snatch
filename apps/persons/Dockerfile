FROM node:18.14-alpine

WORKDIR /usr/src/app

COPY ["package*.json", "project.json", "*.env", "*config*","./"]
COPY ./apps/persons ./apps/persons
COPY ./libs ./libs
RUN npm i nx
RUN npx nx run persons:build:production
CMD node dist/apps/persons/main.js
