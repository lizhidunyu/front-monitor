/**
 * @description: 采集项目中的错误异常上报
 */

import { lazyReport } from './report'
import { ICustomErrOptions, IReportData } from '../../types'

export function catchError() {
  // 1.全局错误捕获
  const originError = window.onerror
  window.onerror = (msg, url, line, column, error) => {
    // 拿到原来的error
    if (originError) {
      originError.call(window, msg, url, line, column, error)
    }
    // 错误信息进行上报
    const reportData: IReportData = {
      message: msg,
      file: url,
      row: line,
      col: column,
      stack: error?.stack,
      error,
      errorType: 'jsError'
    }
    lazyReport('error', reportData)
  }

  // 2.promise error 异步错误
  window.addEventListener('unhandledrejection', (error) => {
    const reportData: IReportData = {
      message: error.reason,
      error,
      errorType: 'promiseError'
    }
    lazyReport('error', reportData)
  })

  // 3.resource error 资源加载错误
  window.addEventListener(
    'error',
    (error) => {
      let target = error.target as HTMLElement
      let isElementType =
        target instanceof HTMLScriptElement ||
        target instanceof HTMLLinkElement ||
        target instanceof HTMLImageElement
      if (!isElementType) {
        return
      }
      const reportData: IReportData = {
        message: `加载${target?.tagName}资源错误`,
        file:
          'src' in target ? target?.src : 'href' in target ? target?.href : '',
        html: target?.outerHTML,
        errorType: 'resourceError'
      }
      lazyReport('error', reportData)
    },
    true
  )
}

// 4.手动捕获错误
export function errorCapture(options: ICustomErrOptions) {
  console.log(options)

  const { error, message, errorType } = options
  lazyReport('error', {
    message,
    error,
    errorType
  })
}
