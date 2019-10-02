FROM node:10-alpine

MAINTAINER ThomasCook

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install --production

RUN npm run build

COPY --chown=node:node . .

ENV SERVER_HTTPPORT=3300

EXPOSE 3300

CMD ["node", "./src/index.js"]

