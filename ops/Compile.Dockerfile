From node:10
ENV HTTP_PORT=80 HTTPS_PORT=443

WORKDIR /HomePage/

# DEPENDENCIES
COPY package*.json ./
 
RUN npm i

# CONFIGURE CHROME FOR PUPPETEER
RUN apt-get update && \
 apt-get install libx11-xcb-dev libxtst6 libnss3-tools libxss1 libasound2 libatk-bridge2.0-0 libgtk-3-bin -fy && \
 cd /HomePage/node_modules/puppeteer/.local-chromium/linux*/chrome-linux/ && \
 chown root:root chrome_sandbox && \
 chmod 4755 chrome_sandbox && \
 cp -p chrome_sandbox /usr/local/sbin/chrome-devel-sandbox && \
 export CHROME_DEVEL_SANDBOX=/usr/local/sbin/chrome-devel-sandbox

# SOURCE
COPY . .

# COMPILE
RUN npm run-script build

# FIN
EXPOSE $HTTP_PORT $HTTPS_PORT
CMD [ "npm", "start" ]