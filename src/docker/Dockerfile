FROM node:16-alpine as builder
WORKDIR /apiServer

COPY . .

RUN yarn install

CMD ["yarn", "server"]
