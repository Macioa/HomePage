From node:10
ENV HTTP_PORT=80 HTTPS_PORT=443

WORKDIR /HomePage/

# DEPENDENCIES
COPY package*.json ./
 
RUN npm i

# SOURCE
COPY . .

# COMPILE
RUN npm run-script build

# FIN
EXPOSE $HTTP_PORT $HTTPS_PORT
CMD [ "npm", "start" ]