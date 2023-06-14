FROM node:18.14-alpine

WORKDIR /usr/src/app

COPY ["package*.json", "project.json", "*.env", "*config*","./"]
COPY ./apps/users ./apps/users
COPY ./libs ./libs
RUN npm i nx
RUN npx nx run users:build:production
CMD node dist/apps/users/main.js
