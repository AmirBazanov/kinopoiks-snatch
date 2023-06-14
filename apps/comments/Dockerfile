FROM node:18.14-alpine

WORKDIR /usr/src/app

COPY ["package*.json", "project.json", "*.env", "*config*","./"]
COPY ./apps/comments ./apps/comments
COPY ./libs ./libs
RUN npm i nx
RUN npx nx run comments:build:production
CMD node dist/apps/comments/main.js
