FROM node:12-alpine

WORKDIR /usr/src/app

COPY {SERVER_FOLDER}/package.json .

RUN npm install --production

COPY {SERVER_FOLDER} .

CMD ["npm", "start"]