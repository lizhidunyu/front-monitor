/**
  1.封装一个上报数据的类，支持xhr, 图片，beacon三种上报形式
  2.在上报的时候携带用户行为栈，性能数据、录屏、白屏检测等不需要附带用户行为
  3.同时如果开启了录屏(录屏插件提供),并且支持当前上报的数据类型，会记录一条recordScreenId,
    之后在录屏插件用通过一个id上报的时候录屏数据
  4.同时提供一个beforePost函数，支持用户在上报数据之前进行自己自定义的错误
*/

/**
 * @description: 上报数据信息
 */
import { stringify } from 'flatted'
import { cacheEvents } from '../../../core/src/utils/cache-events'
import { IOptions } from '../../..//core/src/types'
import { options } from '../../..//core/src/core'
import { IReportConfig, IReportData, Type } from '../types'
import { generateUniqueId, isSupportSendBeacon } from './core'
import { _Monitor } from './global'
import { Queue } from './queue'
import { TYPES } from '../constants'

export class ReportData {
  url = ''
  appId = ''
  userId = ''
  isImgReport = false
  isImmdiate = false
  timeout = 0
  queue = new Queue()
  constructor() {}

  // sendBeacon()上报
  beacon(url: string, data: IReportData) {
    if (isSupportSendBeacon()) {
      console.log('beacon:', data)
      let resData

      try {
        resData = JSON.stringify(data)
      } catch (error) {
        console.error('Error serializing data to JSON:', error)
      }
      return window.navigator.sendBeacon(url, resData)
      // return window.navigator.sendBeacon(url, data as unknown as any)
    }
  }

  // 图片上报
  imgRequest(url: string, data: IReportData) {
    const requestFun = () => {
      const img = new Image()
      const spliceStr = url?.indexOf('?') === -1 ? '?' : '&'
      try {
        const encodedData = encodeURIComponent(JSON.stringify(data))
        img.src = `${url}${spliceStr}data=${encodedData}`
      } catch (error) {
        console.error('Error serializing data to JSON:', error)
        // 处理错误，例如使用默认值或显示错误消息
      }
    }
    this.queue.addFn(requestFun)
  }

  // xhr请求
  async xhrPost(url: string, data: IReportData): Promise<void> {
    let requestFun = null
    let resData: any

    try {
      resData = JSON.stringify(data)
    } catch (error) {
      console.error('Error serializing data to JSON:', error)
    }

    requestFun = () => {
      fetch(`${url}`, {
        method: 'POST',
        body: resData,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    this.queue.addFn(requestFun as unknown as any)
  }

  async beforePost(
    this: any,
    data: IReportData
  ): Promise<ReportData | boolean> {
    let transportData = this.getTransportData(data)
    return transportData
  }

  // 上传的基础信息
  getTransportData(data: any): ReportData {
    const info = {
      ...data,
      uuid: generateUniqueId(data.type, Date.now()),
      pageUrl: document.location.href
      // TODO:设备信息和用户信息
    }

    // TODO： 重新组织一下类型
    // 性能数据、录屏、白屏检测等不需要附带用户行为
    const excludeRreadcrumb = [TYPES.PERFORMANCE, TYPES.RECORD]
    if (!excludeRreadcrumb.includes(data.type)) {
      info.cacheEvents = cacheEvents.getStack() // 获取用户行为栈
    }
    return info
  }

  // 判断是否为SDK配置的接口
  isSdkTransportUrl(targetUrl: string): boolean {
    if (this.url && targetUrl?.indexOf(this.url) !== -1) {
      return true
    }
    return false
  }

  bindOptions(options: IOptions) {
    const { url, appId, userId, reportConfig } = options
    const { isImgReport, isImmediate, timeout } = reportConfig || {}

    this.url = url
    this.appId = appId
    this.userId = userId
    isImgReport && (this.isImgReport = isImgReport)
    isImmediate && (this.isImmdiate = isImmediate)
    timeout && (this.timeout = timeout)
  }

  async send(type: Type, data: IReportConfig) {
    // 录屏插件提供
    if (_Monitor.recordScreen) {
      if (options?.recordConfig?.recordScreenTypeList?.includes(data.type)) {
        _Monitor.hasError = true
        // TODO: recordScreenId
        data.recordScreenId = _Monitor.recordScreenId
      }
    }
    data.type = type
    const result = (await this.beforePost(data as any)) as IReportData
    // 优先使用sendBeacon()上报
    const value = this.beacon(this.url, result)
    if (!value) {
      return this.isImgReport
        ? this.imgRequest(this.url, result)
        : this.xhrPost(this.url, result)
    }
  }
}

const reportData =
  _Monitor.reportData || (_Monitor.reportData = new ReportData())
export { reportData }
