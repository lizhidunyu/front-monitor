'use strict'
/**
 * @description: 收集页面的pv数据
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.getPV = getPV
const utils_1 = require('../../utils')
function getPV() {
  const reportData = {
    subType: 'pv'
  }
  ;(0, utils_1.lazyReport)('business', reportData)
}
