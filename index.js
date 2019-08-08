const fs = require('fs'),
  path = require('path'),
  http = require('http'),
  https = require('https'),
  express = require('express')

//probe environment and create vars
if (fs.existsSync('./.env')) require('dotenv').config()
const vars = {
  ROOT: process.env.ROOT_PATH || path.resolve(__dirname, 'dist'),
  HTTP_PORT: process.env.HTTP_PORT || 80,
  HTTPS_PORT: process.env.HTTPS_PORT || 443,
  PRIVKEY: process.env.PRIVATEKEY || null,
  CERT: process.env.CERTIFICATE || null,
  CHAIN: process.env.CHAIN || null,
  FULLCHAIN: process.env.FULLCHAIN || null,
  WRITEPEM: process.env.WRITEPEM || ''
}

//Sterilize env vars and write pems if applicable
Object.keys(vars).forEach(
  k =>
    (vars[k] = vars[k]
      ? `${vars[k]}`
          .replace(/'/g)
          .replace(/undefined/g, '')
          .replace(/(?<!BEGIN|END|PRIVATE) /g, '\n')
      : vars[k])
)

const credentials = { key: vars.PRIVKEY, cert: vars.FULLCHAIN }
if (vars.WRITEPEM)
  Object.keys(credentials).forEach(k =>
    fs.writeFileSync(`${k}.pem`, credentials[k])
  )

//Create apps
const app = express()
app.use(express.static(vars.ROOT))
const SSLreroute = express()

//Create servers
const httpsServer =
  credentials.key && credentials.cert
    ? https.createServer(credentials, app)
    : null
const httpServer = http.createServer(httpsServer ? SSLreroute : app)

//Create routes
app.get('*', (req, res, next) =>
  res.sendFile('./index.html', err => console.error)
)
SSLreroute.get('*', (req, res) =>
  res.redirect('https://ryanwademontgomery.com')
)

//Start servers
httpServer.listen(vars.HTTP_PORT, err =>
  console.log(
    err ? `${vars.ROOT}\n${err}` : `Http server listening on ${vars.HTTP_PORT}`
  )
)
if (httpsServer)
  httpsServer.listen(vars.HTTPS_PORT, err =>
    console.log(
      err
        ? `${vars.ROOT}\n${err}`
        : `Https server listening on ${vars.HTTPS_PORT}`
    )
  )
