FROM node:14.17-buster-slim

ARG NPM_TOKEN

WORKDIR /usr/src/app

COPY package*.json ./

RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> ~/.npmrc

RUN npm install --only=production

COPY . .

RUN ["chmod", "+x", "./entrypoint.sh"]

EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]