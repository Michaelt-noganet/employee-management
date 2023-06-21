FROM node:18-alpine as builder

WORKDIR /app

COPY . /app

VOLUME /app

RUN apk add yarn

RUN yarn global add nodemon

RUN yarn install && yarn build

EXPOSE 3000

CMD ["yarn", "start-dev"]