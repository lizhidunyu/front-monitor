'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.error = error
function error() {
  // 监听js错误
  window.onerror = (msg, url, line, column, error) => {
    console.log('error__')
    console.log(msg, url, line, column, error)
  }
}
