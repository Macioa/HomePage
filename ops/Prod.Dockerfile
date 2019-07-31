FROM node:10

ENV HTTP_PORT=80 HTTPS_PORT=443

WORKDIR /HomePage/

# Install app dependencies
COPY package*.json ./

RUN npm i --production

COPY dist index.js index.html .

EXPOSE $HTTP_PORT $HTTPS_PORT
CMD [ "npm", "start" ]