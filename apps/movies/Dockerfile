FROM node:18.14-alpine

WORKDIR /usr/src/app

COPY ["package*.json", "nx.json", "./"]
COPY ./src .

RUN npm install
RUN nx build --prod

CMD nx serve movies
