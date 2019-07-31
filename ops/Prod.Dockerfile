FROM alpine:latest

ENV HTTP_PORT=80 HTTPS_PORT=443 CERTIFICATE="" PRIV_KEY=""

WORKDIR /HomePage/

RUN apk add --update npm

COPY package*.json ./

RUN npm i --production

RUN cp dist index.js index.html ./

EXPOSE $HTTP_PORT $HTTPS_PORT
CMD [ "npm", "start" ]