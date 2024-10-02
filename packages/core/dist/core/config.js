'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.config = void 0
exports.setConfig = setConfig
const config = {
  url: '',
  appId: '',
  userId: ''
  // reportUrl: ''
  // TODO:此处省略其他配置
}
exports.config = config
function setConfig(options) {
  for (const key in options) {
    if (options[key]) {
      config[key] = options[key]
    }
  }
}
