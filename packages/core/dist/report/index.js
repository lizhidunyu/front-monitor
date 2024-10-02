'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.lazyReport = void 0
const config_1 = require('../core/config')
// TODO:可以设置不同的类型，不同的类型对应不同的枚举info
const lazyReport = (type, infos) => {
  // TODO:补充数据类型
  const reportParams = Object.assign(Object.assign({}, config_1.config), {
    type,
    data: infos,
    currentTime: new Date().getTime(),
    currentPage: window.location.href,
    ua: navigator.userAgent //ua信息
  })
  const reportParamsStr = JSON.stringify(reportParams)
  //   cacheData(reportParamsStr)
  console.log('****', type, infos)
}
exports.lazyReport = lazyReport
