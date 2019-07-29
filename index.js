const fs = require('fs')
const http = require('http'),
  HTTP_PORT = process.env.HTTP_PORT || 80,
  https = require('https'),
  HTTPS_PORT = process.env.HTTPS_PORT || 443
const privatekey = process.env.PRIVATEKEY || null,
  certificate = process.env.CERTIFICATE || null

const credentials = { key: privatekey, cert: certificate }

const express = require('express')
const app = express()

app.get('*', (req, res, next) => res.send('Hello'))

const httpServer = http.createServer(app)
const httpsServer =
  privatekey && certificate ? https.createServer(credentials, app) : null

httpServer.listen(HTTP_PORT, err =>
  console.log(err || `Http server listening on ${HTTP_PORT}`)
)
if (httpsServer)
  httpsServer.listen(HTTPS_PORT, err =>
    console.log(err || `Https server listening on ${HTTPS_PORT}`)
  )
