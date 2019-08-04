From node:latest
ENV HTTP_PORT=80 HTTPS_PORT=443

WORKDIR /HomePage/

RUN ls -a

# Install app dependencies
COPY package*.json ./
 
RUN npm i
 
# Bundle app source
COPY . .

# Compile
RUN npm run-script build

EXPOSE $HTTP_PORT $HTTPS_PORT
CMD [ "npm", "start" ]