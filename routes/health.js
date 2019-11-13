'use strict'

const express = require('express')
const router = express.Router()
const os = require('os')

/* Health check for app. */
router.get('/', (req, res) => {
  return res.json({
    'Node Host': os.hostname(),
    'Git SHA': process.env.GIT_COMMIT
  })
})

module.exports = router
