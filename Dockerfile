From node:10


# Install app dependencies
COPY package*.json ./
 
RUN npm install
 
# Bundle app source
COPY . .
 
EXPOSE 80 443
CMD [ "node", "server" ]