From node:latest
ENV HTTP_PORT=80 HTTPS_PORT=443

WORKDIR /HomePage/

# Install app dependencies
COPY package*.json ./
 
RUN npm install typings -g && typings install dt~react dt~react-dom && npm i
 
# Bundle app source
COPY . .

# Compile
RUN npm run-script build

EXPOSE $HTTP_PORT $HTTPS_PORT
CMD [ "npm", "start" ]