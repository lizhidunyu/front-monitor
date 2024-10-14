/***
 * @description: 主要用来缓存用户的事件
 **/
import { BREADCRUMBTYPES, CacheEventsData, EVENTTYPES } from '../types'
import { IOptions } from '../../../types'
import { _Monitor } from '@/utils'

export class CacheEvents {
  maxCacheEventsNum = 20 // 行为存放的最大长度
  beforePushCache: unknown = null
  cacheEventsStack: CacheEventsData[] = [] // 行为栈
  constructor() {
    this.cacheEventsStack = []
  }

  // 添加用户行为栈
  push(data: CacheEventsData) {
    if (typeof this.beforePushCache === 'function') {
      const result = this.beforePushCache(data) as CacheEventsData
      if (!result) return
      this.immediatePush(result)
      return
    }
    this.immediatePush(data)
  }

  // 立即加入
  immediatePush(data: CacheEventsData): void {
    data.time = data.time || Date.now()
    if (this.cacheEventsStack.length >= this.maxCacheEventsNum) {
      this.cacheEventsStack.shift()
    }
    this.cacheEventsStack.push(data)
    this.cacheEventsStack.sort((a, b) => a.time - b.time)
  }

  clear() {
    this.cacheEventsStack = []
  }

  getStack() {
    return this.cacheEventsStack
  }

  getCategory(type: EVENTTYPES): BREADCRUMBTYPES {
    switch (type) {
      // 接口请求
      case EVENTTYPES.XHR:
      case EVENTTYPES.FETCH:
        return BREADCRUMBTYPES.HTTP

      // 用户点击
      case EVENTTYPES.CLICK:
        return BREADCRUMBTYPES.CLICK

      // 路由变化
      case EVENTTYPES.HISTORY:
      case EVENTTYPES.HASHCHANGE:
        return BREADCRUMBTYPES.ROUTE

      // 加载资源
      case EVENTTYPES.RESOURCE:
        return BREADCRUMBTYPES.RESOURCE

      // Js代码报错
      case EVENTTYPES.UNHANDLEDREJECTION:
      case EVENTTYPES.ERROR:
        return BREADCRUMBTYPES.CODEERROR

      // 用户自定义
      default:
        return BREADCRUMBTYPES.CUSTOM
    }
  }

  bindOptions(options: IOptions) {
    const { maxCacheEventsNum, beforePushCache } = options
    this.maxCacheEventsNum = maxCacheEventsNum || 20
    this.beforePushCache = beforePushCache
  }
}

const cacheEvents =
  _Monitor.cacheEvents || (_Monitor.cacheEvents = new CacheEvents())
export { cacheEvents }
