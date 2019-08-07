const fs = require('fs'),
  path = require('path'),
  http = require('http'),
  https = require('https'),
  express = require('express')
if (fs.existsSync('./.env')) require('dotenv').config()
const vars = {
  HTTP_PORT: process.env.HTTP_PORT || 80,
  HTTPS_PORT: process.env.HTTPS_PORT || 443,
  PRIVKEY: process.env.PRIVATEKEY || null,
  CERT: process.env.CERTIFICATE || null,
  ROOT: process.env.ROOT_PATH || path.resolve(__dirname, 'dist'),
  CHALLENGE: process.env.CHALLENGE || null,
  CERT_SECRET: process.env.CERTSECRET || 'SECRET UNAVAILABLE',
  CHAIN: process.env.CHAIN || null,
  FULLCHAIN: process.env.FULLCHAIN || null
}
Object.keys(vars).forEach(
  k => (vars[k] = vars[k] ? `${vars[k]}`.replace(/'/g) : vars[k])
)

const credentials = { key: vars.PRIVKEY, cert: vars.CERT }
const app = express()

app.use(express.static(vars.ROOT))
console.log(credentials)
if (vars.CHALLENGE) {
  app.get(`/.well-known/acme-challenge/${vars.CHALLENGE}`, (req, res, next) => {
    res.send(vars.CERT_SECRET)
  })
}

app.get('*', (req, res, next) =>
  res.sendFile('./index.html', err => console.error)
)

const httpServer = http.createServer(app)
const httpsServer =
  vars.PRIV_KEY && vars.CERT ? https.createServer(credentials, app) : null

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
