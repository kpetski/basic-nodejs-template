'use strict'

const app = require('./app')
const https = require('https')
const http = require('http')
let httpListenerPort = 80
let httpsListenerPort = 443

// Override default ports when running on windows or mac
if (!process.env.KUBERNETES_SERVICE_HOST) {
  httpListenerPort = 9092
  httpsListenerPort = 9495
}

const httpServer = http.createServer(app).listen(httpListenerPort, () => {
  console.log('app is listening at localhost:' + httpListenerPort)
})

const httpsServer = https.createServer(app).listen(httpsListenerPort, () => {
  console.log('app is listening at localhost:' + httpsListenerPort)
})

process.on('SIGTERM', () => {
  httpServer.close(() => {
    console.log('SIGTERM issued...app is shutting down')
    process.exit(0)
  })
  httpsServer.close(() => {
    console.log('SIGTERM issued...app is shutting down')
    process.exit(0)
  })
})
