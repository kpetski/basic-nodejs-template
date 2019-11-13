'use strict'
const express = require('express')
const router = express.Router()
const fs = require('fs')
const swagger = JSON.parse(fs.readFileSync('swagger.json').toString())

/* Health check for app. */
router.get('/', (req, res) => {
  return res.json(swagger)
})

module.exports = router
