FROM alpine:latest

ARG HTTP_PORT=80 HTTPS_PORT=443 CERTIFICATE="" PRIV_KEY="" CHALLENGE="" CERT_SECRET=""
ENV HTTP_PORT=$HTTP_PORT HTTPS_PORT=$HTTPS_PORT CERTIFICATE=$CERTIFICATE PRIV_KEY=$PRIV_KEY CHALLENGE=$CHALLENGE CERT_SECRET=CERT_SECRET

WORKDIR /HomePage/

RUN apk add --update npm certbot

COPY package*.json ./

RUN npm i --production && mkdir - p dist

COPY index.js ./

copy dist/* dist/

EXPOSE $HTTP_PORT $HTTPS_PORT
CMD [ "nohup", "npm", "start" ]