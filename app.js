'use strict'
const express = require('express')

const health = require('./routes/health')
const doc = require('./routes/doc')
const basePath = '/api/v1/basic-nodejs-template'
const app = express()
const memwatch = require('node-memwatch')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// Disable per IRM
// Commited as part of GIT-TEST-2
app.disable('x-powered-by')

memwatch.on('leak', (info) => {
  console.log(info, 'Memory leak was detected')
})

app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

app.use((req, res, next) => {
  next()
})
app.use(cookieParser())

// Health check route used to validate service is up and healthly
app.use(basePath + '/health', health)
app.use(basePath + '/doc', doc)

// app routes

module.exports = app
