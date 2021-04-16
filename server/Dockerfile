FROM node:alpine

COPY . /server
WORKDIR /server
EXPOSE 3333

RUN npm uninstall --save sqlite3
RUN npm install --save sqlite3
RUN npm install

# RUN npm start
