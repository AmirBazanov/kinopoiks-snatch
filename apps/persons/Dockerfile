FROM node:18.14-alpine

WORKDIR /usr/src/app

COPY ["package*.json", "nx.json", "*.env", "*config*","./"]
COPY ./apps/persons ./apps/persons
COPY ./libs ./libs
RUN npm install \
    && npm install -g nx
RUN npx nx run persons:build:production
CMD node dist/apps/persons/main.js
