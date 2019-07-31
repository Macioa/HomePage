FROM alpine:3.9

ENV HTTP_PORT=80 HTTPS_PORT=443 CERTIFICATE="" PRIV_KEY="" DIST_DIR="./"

WORKDIR /HomePage/

RUN apk add --update npm

COPY package*.json ./

RUN npm i --production

RUN ls -a && ls .. -a && ls ../.. -a

COPY dist index.js index.html ./

EXPOSE $HTTP_PORT $HTTPS_PORT
CMD [ "npm", "start" ]