import { subscribeEvent } from './subscribe'
import { options } from '../core'
import { BEHAVIOR_TYPE, ERROR_TYPE } from '../../../utils/src/constants'
import { ReplaceHandler } from '../types'
import {
  whiteScreen,
  fetchReplace,
  xhrReplace,
  unhandledrejectionReplace,
  listenError,
  domReplace,
  listenHashchange,
  historyReplace
} from '../core/index'

const isFilterHttpUrl = (url: string): boolean => {
  return (
    options.filterXhrUrlRegExp &&
    (options.filterXhrUrlRegExp as unknown as any).test(url)
  )
}

const replace = (type: ERROR_TYPE | BEHAVIOR_TYPE): void => {
  switch (type) {
    case ERROR_TYPE.WHITESCREEN_ERROE:
      whiteScreen()
      break
    case ERROR_TYPE.FETCH_ERROR:
      fetchReplace()
      break
    case ERROR_TYPE.XHR_ERROR:
      xhrReplace()
      break
    case ERROR_TYPE.PROMISE_ERROR:
      unhandledrejectionReplace()
      break
    case ERROR_TYPE.JS_ERROR:
      listenError()
      break
    case BEHAVIOR_TYPE.CLICK:
      domReplace()
      break
    case BEHAVIOR_TYPE.HASH_CHANGE:
      listenHashchange()
      break
    case BEHAVIOR_TYPE.HISTORY_CHANGE:
      historyReplace()
      break
    default:
      break
  }
}

const addReplaceHandler = (handler: ReplaceHandler): void => {
  // 收集依赖
  if (!subscribeEvent(handler)) return
  // 重写方法并更新
  replace(handler.type)
}

export { addReplaceHandler, isFilterHttpUrl, replace }
