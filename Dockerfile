FROM node:10
RUN apt-get update && apt-get install redis-server
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install -g nodemon
RUN npm install -g knex
COPY . /app
ENTRYPOINT ["nodemon", "/app/server.js"]
