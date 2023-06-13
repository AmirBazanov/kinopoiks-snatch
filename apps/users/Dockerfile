FROM node:18.14-alpine

WORKDIR /usr/src/app

COPY ["package*.json", "nx.json", "*.env", "*config*","./"]
COPY ./apps/users ./apps/users
COPY ./libs ./libs
RUN npm install \
    && npm install -g nx
RUN npx nx run users:build:production
CMD node dist/apps/users/main.js
