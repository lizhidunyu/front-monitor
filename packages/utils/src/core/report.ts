/**
 * @description: 上报数据信息
 */

import { cacheEvents } from '@/core/src/utils/cache-events'
import { IOptions } from '@/core/src/types'
import { options } from '@/core/src/core'
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
      return window.navigator.sendBeacon(url, JSON.stringify(data))
    }
  }

  // 图片上报
  imgRequest(url: string, data: IReportData) {
    const requestFun = () => {
      const img = new Image()
      const spliceStr = url.indexOf('?') === -1 ? '?' : '&'
      img.src = `${url}${spliceStr}data=${encodeURIComponent(JSON.stringify(data))}`
    }
    this.queue.addFn(requestFun)
  }

  // xhr请求
  async xhrPost(url: string, data: IReportData): Promise<void> {
    const requestFun = () => {
      fetch(`${url}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
    this.queue.addFn(requestFun)
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
      uuid: generateUniqueId(data.subType, Date.now()),
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
    if (this.url && targetUrl.indexOf(this.url) !== -1) {
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
    const result = (await this.beforePost(data)) as IReportData
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
