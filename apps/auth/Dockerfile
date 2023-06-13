FROM node:18.14-alpine

WORKDIR /usr/src/app

COPY ["package*.json", "nx.json", "*.env", "*config*","./"]
COPY ./apps/auth ./apps/auth
COPY ./libs ./libs
RUN npm install \
    && npm install -g nx
RUN npx nx run auth:build:production
CMD node dist/apps/auth/main.js
