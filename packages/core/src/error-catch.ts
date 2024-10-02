/**
 * @description: 上报项目中的异常
 */

import { lazyReport } from '../../report'

export function catchError() {
  // 1.全局错误捕获
  const originError = window.onerror
  window.onerror = (msg, url, line, column, error) => {
    // 拿到原来的error,进行错误
    if (originError) {
      originError.call(window, msg, url, line, column, error)
    }
    console.log('window.onerror__')
    // 错误信息进行上报
    lazyReport('error', {
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
    lazyReport('error', {
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
      lazyReport('error', {
        // @ts-ignore
        message: `加载${target?.tagName}资源错误`,
        // @ts-ignore
        file: target?.src,
        errorType: 'resourceError'
      })
    },
    true
  )
}

// 手动捕获错误
export function errorCaptcher(error: string, msg: string) {
  lazyReport('error', {
    message: msg,
    error,
    errorType: 'customError'
  })
}
