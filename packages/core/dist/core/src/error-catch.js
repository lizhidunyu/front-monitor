'use strict'
/**
 * @description: 上报项目中的异常
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.catchError = catchError
exports.errorCaptcher = errorCaptcher
const report_1 = require('../../report')
function catchError() {
  // 1.全局错误捕获
  const originError = window.onerror
  window.onerror = (msg, url, line, column, error) => {
    // 拿到原来的error,进行错误
    if (originError) {
      originError.call(window, msg, url, line, column, error)
    }
    console.log('window.onerror__')
    // 错误信息进行上报
    ;(0, report_1.lazyReport)('error', {
      message: msg,
      file: url,
      row: line,
      col: column,
      error,
      errorType: 'jsError'
    })
  }
  // 2.promise error
  window.addEventListener('unhandledrejection', (error) => {
    ;(0, report_1.lazyReport)('error', {
      message: error.reason,
      error,
      errorType: 'promiseError'
    })
  })
  // 3.resource error
  window.addEventListener(
    'error',
    (error) => {
      let target = error.target
      let isElementType =
        target instanceof HTMLScriptElement ||
        target instanceof HTMLLinkElement ||
        target instanceof HTMLImageElement
      if (!isElementType) {
        return
      }
      ;(0, report_1.lazyReport)('error', {
        // @ts-ignore
        message: `加载${target === null || target === void 0 ? void 0 : target.tagName}资源错误`,
        // @ts-ignore
        file: target === null || target === void 0 ? void 0 : target.src,
        errorType: 'resourceError'
      })
    },
    true
  )
}
// 手动捕获错误
function errorCaptcher(error, msg) {
  ;(0, report_1.lazyReport)('error', {
    message: msg,
    error,
    errorType: 'customError'
  })
}
