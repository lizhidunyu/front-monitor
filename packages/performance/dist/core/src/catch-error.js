'use strict'
/**
 * @description: 采集项目中的错误异常上报
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.catchError = catchError
exports.errorCapture = errorCapture
const utils_1 = require('../../utils')
function catchError() {
  // 1.全局错误捕获
  const originError = window.onerror
  window.onerror = (msg, url, line, column, error) => {
    // 拿到原来的error
    if (originError) {
      originError.call(window, msg, url, line, column, error)
    }
    // 错误信息进行上报
    const reportData = {
      message: msg,
      file: url,
      row: line,
      col: column,
      stack: error === null || error === void 0 ? void 0 : error.stack,
      error,
      subType: 'jsError'
    }
    ;(0, utils_1.lazyReport)('error', reportData)
  }
  // 2.promise error 异步错误
  window.addEventListener('unhandledrejection', (error) => {
    const reportData = {
      message: error.reason,
      error,
      subType: 'promiseError'
    }
    ;(0, utils_1.lazyReport)('error', reportData)
  })
  // 3.resource error 资源加载错误
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
      const reportData = {
        message: `加载${target === null || target === void 0 ? void 0 : target.tagName}资源错误`,
        file:
          'src' in target
            ? target === null || target === void 0
              ? void 0
              : target.src
            : 'href' in target
              ? target === null || target === void 0
                ? void 0
                : target.href
              : '',
        html: target === null || target === void 0 ? void 0 : target.outerHTML,
        subType: 'resourceError'
      }
      ;(0, utils_1.lazyReport)('error', reportData)
    },
    true
  )
}
// 4.手动捕获错误
function errorCapture(options) {
  console.log(options)
  const { error, message, subType } = options
  const reportData = {
    message,
    error,
    subType
  }
  ;(0, utils_1.lazyReport)('error', reportData)
}
