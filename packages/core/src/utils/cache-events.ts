/***
 * @description: 用户行为栈：用来缓存用户的行为事件
 **/

import { _Monitor } from '../../../utils'
import { CACHEEVENTTYPES, ICacheEventData, IOptions } from '../types'
import { BEHAVIOR_TYPE, ERROR_TYPE } from '../../../utils/src/constants'

export class CacheEvents {
  maxCacheEventsNum = 20 // 行为存放的最大长度
  beforePushCache: unknown = null
  cacheEventsStack: ICacheEventData[] = [] // 行为栈
  constructor() {
    this.cacheEventsStack = []
  }

  // 添加用户行为栈
  push(data: ICacheEventData) {
    if (typeof this.beforePushCache === 'function') {
      const result = this.beforePushCache(data) as ICacheEventData
      if (!result) return
      this.immediatePush(result)
      return
    }
    this.immediatePush(data)
  }

  // 立即加入
  immediatePush(data: ICacheEventData): void {
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

  getCategory(type: ERROR_TYPE | BEHAVIOR_TYPE): CACHEEVENTTYPES {
    switch (type) {
      // 接口请求
      case ERROR_TYPE.XHR_ERROR:
      case ERROR_TYPE.FETCH_ERROR:
        return CACHEEVENTTYPES.HTTP

      // 用户点击
      case BEHAVIOR_TYPE.CLICK:
        return CACHEEVENTTYPES.CLICK

      // 路由变化
      case BEHAVIOR_TYPE.HASH_CHANGE:
      case BEHAVIOR_TYPE.HISTORY_CHANGE:
        return CACHEEVENTTYPES.ROUTE

      // 加载资源
      case ERROR_TYPE.RESOURCE_ERROR:
        return CACHEEVENTTYPES.RESOURCE

      // Js代码报错
      case ERROR_TYPE.JS_ERROR:
      case ERROR_TYPE.PROMISE_ERROR:
        return CACHEEVENTTYPES.CODEERROR

      // 用户自定义
      default:
        return CACHEEVENTTYPES.CUSTOM
    }
  }

  bindOptions(options: IOptions) {
    const { maxCacheEventsNum, beforePushCache } = options
    this.maxCacheEventsNum = maxCacheEventsNum || 20
    this.beforePushCache = beforePushCache
  }
}

const cacheEvents = new CacheEvents()
_Monitor && _Monitor?.cacheEvents && (_Monitor.cacheEvents = cacheEvents)
export { cacheEvents }
