FROM node:12

RUN mkdir /api

COPY . /api

WORKDIR /api

RUN npm install
CMD npm start