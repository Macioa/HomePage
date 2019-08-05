From node:latest
ENV HTTP_PORT=80 HTTPS_PORT=443

WORKDIR /HomePage/

# Bundle app source
COPY . .

# Compile
RUN npm run-script init

EXPOSE $HTTP_PORT $HTTPS_PORT
CMD [ "npm", "start" ]