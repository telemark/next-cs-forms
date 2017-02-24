'use strict'

const axios = require('axios')
const generateToken = require('./generate-jws')
const config = require('../config')

const payload = {
  name: 'Flying Spaghetti Monster',
  description: 'rAmen'
}

module.exports = (app, data) => {
  return new Promise((resolve, reject) => {
    const token = generateToken({key: config.JWT_SECRET, payload: payload})
    const appSettings = config.SERVICES.find(c => c.name === app)

    let instance = axios.create(
      {
        baseURL: appSettings.url,
        timeout: 1000,
        headers: {
          Authorization: token
        }
      }
    )

    instance.post(appSettings.path, data)
      .then(resolve)
      .catch(reject)
  })
}

