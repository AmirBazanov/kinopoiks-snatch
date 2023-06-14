FROM node:18.14-alpine

WORKDIR /usr/src/app

COPY ["package*.json", "project.json", "*.env", "*config*","./"]
COPY ./apps/countries ./apps/countries
COPY ./libs ./libs
RUN npm i nx
RUN npx nx run countries:build:production
CMD node dist/apps/countries/main.js
