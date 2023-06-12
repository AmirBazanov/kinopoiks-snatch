FROM node:20-slim

COPY . .

RUN npm install -g npm@9.7.1
RUN npm install -y
RUN npx nx init

# CMD [ "docker", "build", "-t", "nx-poject", "." ]