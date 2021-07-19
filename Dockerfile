FROM node:latest
MAINTAINER Dayan Freitas <dayan.fretias.df@gmail.com>

ENV APP=/var/www/server

RUN mkdir -p $APP
WORKDIR $APP


# Install dependencies
COPY ./server .
RUN npm install

CMD npm start
EXPOSE 3333