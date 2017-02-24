'use strict'

const axios = require('axios')
const generateToken = require('./generate-jwt')
const config = require('../config')

const payload = {
  name: 'Flying Spaghetti Monster',
  description: 'rAmen'
}

const options = {
  expiresIn: '1h',
  issuer: 'https://auth.t-fk.no'
}

module.exports = (app, data) => {
  return new Promise((resolve, reject) => {
    const token = generateToken({key: config.JWT_SECRET, payload: payload, options: options})
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

