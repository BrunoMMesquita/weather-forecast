FROM node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . ./code

EXPOSE 3000
CMD [ "npm", "start"]