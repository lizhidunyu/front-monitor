'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.originalSend =
  exports.originalOpen =
  exports.isSupportSendBeacon =
  exports.generateUniqueId =
    void 0
var core_1 = require('./core')
Object.defineProperty(exports, 'generateUniqueId', {
  enumerable: true,
  get: function () {
    return core_1.generateUniqueId
  }
})
Object.defineProperty(exports, 'isSupportSendBeacon', {
  enumerable: true,
  get: function () {
    return core_1.isSupportSendBeacon
  }
})
Object.defineProperty(exports, 'originalOpen', {
  enumerable: true,
  get: function () {
    return core_1.originalOpen
  }
})
Object.defineProperty(exports, 'originalSend', {
  enumerable: true,
  get: function () {
    return core_1.originalSend
  }
})
