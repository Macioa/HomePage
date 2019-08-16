const fs = require('fs'),
  path = require('path'),
  http = require('http'),
  https = require('https'),
  express = require('express'),
  { transports, format, createLogger, log } = require('winston')

//set up logging
const { label, combine, timestamp, prettyPrint, printf } = format
const form = printf(({ level, message, label, timestamp }) =>
  JSON.stringify({ t: timestamp, m: message })
)
const methods = [
  new transports.File({ filename: './error.log', level: 'error' }),
  new transports.File({ filename: './warn.log', level: 'warn' }),
  new transports.File({ filename: './info.log', level: 'info' })
]
if (!module.parent) methods.push(new transports.Console()) // don't log to console if run through another module
const logger = createLogger({
  format: combine(timestamp(), prettyPrint(), form),
  transports: methods,
  exitOnError: false
})
const er = err => {
  if (err) logger.log({ level: 'error', message: err })
}
const inf = msg => logger.log({ level: 'info', message: msg })

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

//Log dist
const files = fs.readdirSync(vars.ROOT)
inf({ folder: 'root', files: files })

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
app.get('*', (req, res, next) => {
  inf(`Sending index.html to ${req.headers['x-forwarded-for']}`)
  res.sendFile('index.html', { root: vars.ROOT }, err => (err ? er(err) : null))
})
SSLreroute.get('*', (req, res) => {
  inf(`Redirect ${req.headers['x-forwarded-for']} to https`)
  res.redirect('https://ryanwademontgomery.com', err => (err ? er(err) : null))
})

//Start servers
httpServer.listen(vars.HTTP_PORT, err =>
  err ? er(err) : inf(`Http server listening on ${vars.HTTP_PORT}`)
)
if (httpsServer)
  httpsServer.listen(vars.HTTPS_PORT, err =>
    err ? er(err) : inf(`Https server listening on ${vars.HTTP_PORT}`)
  )

module.exports = {
  http: httpServer,
  https: httpsServer
}
