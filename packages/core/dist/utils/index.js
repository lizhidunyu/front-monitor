'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.originalSend =
  exports.originalOpen =
  exports.isSupportSendBeacon =
  exports.generateUniqueId =
  exports.lazyReport =
  exports.CacheData =
    void 0
var cache_data_1 = require('./cache-data')
Object.defineProperty(exports, 'CacheData', {
  enumerable: true,
  get: function () {
    return cache_data_1.CacheData
  }
})
var report_1 = require('./report')
Object.defineProperty(exports, 'lazyReport', {
  enumerable: true,
  get: function () {
    return report_1.lazyReport
  }
})
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
