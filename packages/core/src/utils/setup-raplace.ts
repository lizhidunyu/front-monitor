import { BEHAVIOR_TYPE, ERROR_TYPE, STATUS_CODE } from '@/utils/src/constants'
import { addReplaceHandler } from './add-replace-handler'
import { HandleEvents } from '../core/utils/handle-events'
import { cacheEvents } from './cache-events'

export function setupReplace(): void {
  // 白屏检测
  addReplaceHandler({
    callback: () => {
      HandleEvents.handleWhiteScreen()
    },
    type: ERROR_TYPE.WHITESCREEN_ERROE
  })

  // 重写XMLHttpRequest
  addReplaceHandler({
    callback: (data: any) => {
      HandleEvents.handleHttp(data, ERROR_TYPE.XHR_ERROR)
    },
    type: ERROR_TYPE.XHR_ERROR
  })

  // 重写fetch
  addReplaceHandler({
    callback: (data: any) => {
      HandleEvents.handleHttp(data, ERROR_TYPE.FETCH_ERROR)
    },
    type: ERROR_TYPE.FETCH_ERROR
  })

  //捕获JS异常
  addReplaceHandler({
    callback: (error: any) => {
      HandleEvents.handleError(error)
    },
    type: ERROR_TYPE.JS_ERROR
  })

  // 添加handleUnhandleRejection事件
  addReplaceHandler({
    callback: (data: any) => {
      HandleEvents.handleUnhandleRejection(data)
    },
    type: ERROR_TYPE.PROMISE_ERROR
  })

  // 添加资源异常事件
  addReplaceHandler({
    callback: (data: any) => {
      HandleEvents.handleUnhandleRejection(data)
    },
    type: ERROR_TYPE.RESOURCE_ERROR
  })

  // 监听history模式路由变化
  addReplaceHandler({
    callback: (data) => {
      HandleEvents.handleHistory(data)
    },
    type: BEHAVIOR_TYPE.HISTORY_CHANGE
  })

  // 监听hashchange
  addReplaceHandler({
    callback: (e: HashChangeEvent) => {
      HandleEvents.handleHashchange(e)
    },
    type: BEHAVIOR_TYPE.HASH_CHANGE
  })

  // 监听click事件
  addReplaceHandler({
    callback: (data) => {
      // 获取html信息
      const htmlString = data.data.activeElement as HTMLElement

      if (htmlString) {
        cacheEvents.push({
          type: BEHAVIOR_TYPE.CLICK,
          status: STATUS_CODE.OK,
          category: cacheEvents.getCategory(BEHAVIOR_TYPE.CLICK),
          data: htmlString,
          time: Date.now()
        })
      }
    },
    type: BEHAVIOR_TYPE.CLICK
  })
}
