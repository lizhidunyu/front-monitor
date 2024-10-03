/**
 * @description: 上报数据信息
 */

import { IReportConfig, IReportData, Type } from '../../types'
import {
  generateUniqueId,
  isSupportSendBeacon,
  originalOpen,
  originalSend
} from '../../utils'
import { config } from './config'
import { CacheData } from './cache-data'

// 1.缓存数据，延迟上报 | 数据量达到一定大小上报
let timer: any = null
let cacheStore = new CacheData()
export const lazyReport = (type: string, data: IReportData, timeout = 3000) => {
  cacheStore.addCache(type, data)
  clearTimeout(timer)

  const handleCacheData = () => {
    const cacheArr = cacheStore.getCache()
    if (cacheArr?.length) {
      for (let item of cacheArr) {
        const [type, data] = item
        reportData(type, data)
      }
      cacheStore.clearCache()
    }
  }

  timer = setTimeout(() => {
    handleCacheData()
  }, timeout)

  // 添加兜底方案，页面关闭之前上报
  window.addEventListener('beforeunload', function () {
    handleCacheData()
  })
}

// 2.上报数据
export const reportData = (type: Type, data: IReportData) => {
  if (!config.url) {
    console.error('请设置上传 url 地址')
  }
  const reportParams: IReportConfig = {
    id: generateUniqueId(type, new Date().getTime()), //唯一id
    config: { ...config },
    type,
    data,
    currentTime: new Date().getTime(), // 时间戳
    currentPage: window.location.href, // 当前页面
    ua: navigator.userAgent //ua信息
  }
  const reportParamsStr: string = JSON.stringify(reportParams)
  handleReportTime(reportParamsStr, config.reportConfig)
}

// 2.上报时机
export const handleReportTime = (data: string, reportConfig: any) => {
  const { isImmediate } = reportConfig
  // 立即上报
  if (isImmediate) {
    handleReportData(data, reportConfig)
    return
  } else {
    //改写window.requestIdleCallback
    window.requestIdleCallback(
      () => {
        handleReportData(data, reportConfig)
      },
      { timeout: 3000 }
    )
  }
}

// 3.上报方式，真正上报的地方
export const handleReportData = (data: string, reportConfig: any) => {
  const { isImgReport } = reportConfig

  // 图片上传
  if (isImgReport) {
    const img = new Image()
    img.src = `${config.url}?data=${encodeURIComponent(data)}`
    return
  }

  // window.navigator.sendBeacon
  if (isSupportSendBeacon()) {
    console.log('config.url:', config.url, 'data:', data)
    window.navigator.sendBeacon(config.url, data)
  } else {
    // xhr
    const xhr = new XMLHttpRequest()
    originalOpen.call(xhr, 'post', config.url, true)
    originalSend.call(xhr, data)
  }
}
