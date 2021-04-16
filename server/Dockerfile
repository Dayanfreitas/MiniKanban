FROM node:alpine

COPY ./package*.json/ /server/
COPY ./src/ /server/src/
COPY ./knexfile.js /server/knexfile.js

WORKDIR /server

EXPOSE 3333
RUN npm install
RUN npx knex migrate:latest
RUN npx knex seed:run
# RUN npx knex migration:up
# RUN npx knex seed:RUN

# RUN npm uninstall --save sqlite3
# RUN npm install --save sqlite3

# RUN npm start
