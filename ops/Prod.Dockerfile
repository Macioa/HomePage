FROM alpine:latest

ARG HTTP_PORT=80 
ARG HTTPS_PORT=443 
ARG CERTIFICATE="" 
ARG PRIV_KEY="" 
ARG CHALLENGE="" 
ARG CERTSECRET=""
ENV HTTP_PORT=$HTTP_PORT HTTPS_PORT=$HTTPS_PORT CERTIFICATE=$CERTIFICATE PRIV_KEY=$PRIV_KEY CHALLENGE=$CHALLENGE CERTSECRET=$CERTSECRET

WORKDIR /HomePage/

RUN apk add --update npm certbot

COPY package*.json ./

RUN npm i --production && mkdir - p dist

COPY index.js ./

copy dist/* dist/

RUN echo $CHALLENGE && echo "$CERTSECRET"

RUN printenv>.env

EXPOSE $HTTP_PORT $HTTPS_PORT

CMD ["/bin/ash", "-c", "sleep infinity"]
