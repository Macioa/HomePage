const fs = require('fs'),
  path = require('path'),
  http = require('http'),
  https = require('https'),
  express = require('express')
const HTTP_PORT = process.env.HTTP_PORT || 80,
  HTTPS_PORT = process.env.HTTPS_PORT || 443,
  PRIV_KEY = process.env.PRIVATEKEY || null,
  CERT = process.env.CERTIFICATE || null,
  ROOT = process.env.ROOT_PATH || path.join(__dirname, 'dist')

const credentials = { key: PRIV_KEY, cert: CERT }
const app = express()

app.use(express.static(ROOT))
app.get('*', (req, res, next) =>
  res.sendFile('./index.html', err => console.error)
)

const httpServer = http.createServer(app)
const httpsServer =
  PRIV_KEY && CERT ? https.createServer(credentials, app) : null

httpServer.listen(HTTP_PORT, err =>
  console.log(err || `Http server listening on ${HTTP_PORT}`)
)
if (httpsServer)
  httpsServer.listen(HTTPS_PORT, err =>
    console.log(err || `Https server listening on ${HTTPS_PORT}`)
  )
