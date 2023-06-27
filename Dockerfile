# Specifies the base image as node:18-alpine for the build stage.
FROM node:18-alpine as builder

# Sets the working directory inside the container to /app.
WORKDIR /app

# Copies the entire application code to the container's /app directory.
COPY . /app

# Installs Yarn package manager in the container.
RUN apk add yarn

# Installs the nodemon package globally using Yarn.
RUN yarn global add nodemon

RUN yarn install && yarn build

# Exposes port 3000 to allow incoming connections.
EXPOSE 3000

CMD ["yarn", "start-dev"]