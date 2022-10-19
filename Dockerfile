FROM node:16-alpine as builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build
CMD [ "yarn", "start" ]
