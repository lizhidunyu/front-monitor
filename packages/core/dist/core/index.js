'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const config_1 = require('./config')
const error_catch_1 = require('./src/error-catch')
const monitor = {
  init(options = {}) {
    ;(0, config_1.setConfig)(options)
    ;(0, error_catch_1.catchError)()
  }
}
exports.default = monitor
