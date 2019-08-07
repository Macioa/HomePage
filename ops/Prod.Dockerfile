FROM alpine:latest

ARG HTTP_PORT=80 
ARG HTTPS_PORT=443 
ARG CERTIFICATE="" 
ARG PRIVATEKEY="" 
ARG CHAIN=""
ARG FULLCHAIN=""
ARG CHALLENGE="" 
ARG CERTSECRET=""
ARG LETSENCRYPT=""
ENV HTTP_PORT=$HTTP_PORT HTTPS_PORT=$HTTPS_PORT CERTIFICATE=$CERTIFICATE PRIVATEKEY=$PRIVATEKEY CHALLENGE=$CHALLENGE CERTSECRET=$CERTSECRET LETSENCRYPT=$LETSENCRYPT CHAIN=$CHAIN FULLCHAIN=$FULLCHAIN

WORKDIR /HomePage/

RUN apk add --update npm 

COPY package*.json ./

RUN npm i --production && mkdir - p dist

COPY index.js ./

copy dist/* dist/

RUN echo $CERTIFICATE && echo $PRIV_KEY

RUN printenv>.env 

EXPOSE $HTTP_PORT $HTTPS_PORT

CMD ["sh", "-c", "node index"]
