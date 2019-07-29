From node:10


# Install app dependencies
COPY package*.json ./
 
RUN npm install typings -g && typings install dt~react dt~react-dom && npm i
 
# Bundle app source
COPY . .

# Compile
RUN npm run-script build
 
EXPOSE 80 443
CMD [ "node", "server" ]