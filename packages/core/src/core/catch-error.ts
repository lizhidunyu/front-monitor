/**
 * @description: 采集项目中的错误异常上报
 */

import { reportData } from '../../../utils'
import {
  ICustomErrOptions,
  IReportData,
  IPromiseErrorData,
  IWindowErrorData,
  IResourceErrorData
} from '../../../types'

export function catchError() {
  // 1.全局错误捕获
  const originError = window.onerror
  window.onerror = (msg, url, line, column, error) => {
    // 拿到原来的error
    if (originError) {
      originError.call(window, msg, url, line, column, error)
    }
    // 错误信息进行上报
    const reportData: IWindowErrorData = {
      message: msg,
      file: url,
      row: line,
      col: column,
      stack: error?.stack,
      error,
      subType: 'jsError'
    }
    reportData('error', reportData as IReportData)
  }

  // 2.promise error 异步错误
  window.addEventListener('unhandledrejection', (error) => {
    const reportData: IPromiseErrorData = {
      message: error.reason,
      error,
      subType: 'promiseError'
    }
    reportData('error', reportData as IReportData)
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
      const reportData: IResourceErrorData = {
        message: `加载${target?.tagName}资源错误`,
        file:
          'src' in target ? target?.src : 'href' in target ? target?.href : '',
        html: target?.outerHTML,
        subType: 'resourceError'
      }
      reportData('error', reportData as IReportData)
    },
    true
  )
}

// 4.手动捕获错误
export function errorCapture(options: ICustomErrOptions) {
  console.log(options)

  const { error, message, subType } = options
  const reportData: ICustomErrOptions = {
    message,
    error,
    subType
  }
  reportData('error', reportData as IReportData)
}
