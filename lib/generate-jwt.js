'use strict'

const jws = require('jws')

module.exports = options => {
  if (!options) {
    throw Error('Missing required input: options object')
  }
  if (!options.key) {
    throw Error('Missing required input: options.key')
  }
  if (!options.payload) {
    throw Error('Missing required input: options.payload')
  }
  const opts = options.options || {}
  return jws.sign(options.payload, options.tokenKey, opts)
}
