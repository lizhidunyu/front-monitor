'use strict'
/**
 * @description: 收集页面的pv数据
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.getPV = getPV
const report_1 = require('./report')
function getPV() {
  const reportData = {
    subType: 'pv'
  }
  ;(0, report_1.lazyReport)('business', reportData)
}
