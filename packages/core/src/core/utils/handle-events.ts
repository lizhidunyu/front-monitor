import ErrorStackParser from 'error-stack-parser'

// 对应事件的回调函数数组
// 这些时间会被收集到依赖数组中，当对应的事件被触发的时候，就会来到这里触发所有依赖（函数）
// 同时具备可扩展性，我们可以自己自定义回调函数
// 这些回调函数里面主要做的事情就是加入行为栈，或者是上报数据
import { BEHAVIOR_TYPE, ERROR_TYPE } from '../../../../utils/src/constants'
import { cacheEvents } from '../../utils/cache-events'
import { openWhiteScreen, options } from '..'
import {
  getErrorUid,
  getTimestamp,
  hashMapExist,
  reportData
} from '../../../../utils'
import { STATUS_CODE } from '../../../../performance/src/types'
import { httpTransform, resourceTransform } from './format-data'
import { ErrorTarget, RouteHistory } from '../../types'

// 这里回调函数的参数是监听器传递的数据
const HandleEvents = {
  // TODO： 处理xhr、fetch回调
  handleHttp(data: any, type: ERROR_TYPE): void {
    // todo:处理接口数据
    const result = httpTransform(data)
    // 添加用户行为，去掉自身上报的接口行为
    if (!data.url.includes(options.url)) {
      cacheEvents.push({
        // todo:在cacheEvents映射类型
        category: cacheEvents.getCategory(type),
        data: result,
        // @ts-ignore
        status: result.status,
        time: result.time
      })
    }

    if (result.status === 'error') {
      reportData.send(ERROR_TYPE.HTTP_ERROR, {
        ...result,
        status: STATUS_CODE.ERROR
      })
    }
  },

  // window.addEventListner()传入的对象
  handleError(ev: ErrorTarget): void {
    const target = ev?.target
    if (!target || (ev.target && !ev.target.localName)) {
      // vue和react捕获的报错使用ev解析，异步错误使用ev.error解析
      // TODO: stackFrame
      const stackFrame = ErrorStackParser.parse(!target ? ev : ev.error)[0]
      const { fileName, columnNumber, lineNumber } = stackFrame
      const errorData = {
        type: ERROR_TYPE.JS_ERROR,
        status: STATUS_CODE.ERROR,
        time: getTimestamp(),
        message: ev.message,
        fileName,
        line: lineNumber,
        column: columnNumber
      }
      cacheEvents.push({
        type: ERROR_TYPE.JS_ERROR,
        category: cacheEvents.getCategory(ERROR_TYPE.JS_ERROR),
        data: errorData,
        time: getTimestamp(),
        status: STATUS_CODE.ERROR
      })
      const hash: string = getErrorUid(
        `${ERROR_TYPE.JS_ERROR}-${ev.message}-${fileName}-${columnNumber}`
      )
      // 开启repeatCodeError第一次报错才上报
      if (
        !options.repeatCodeError ||
        (options.repeatCodeError && !hashMapExist(hash))
      ) {
        return reportData.send(ERROR_TYPE.JS_ERROR, errorData)
      }
    }

    // 资源加载报错,
    // 添加到行为栈
    // report上报
    if (target?.localName) {
      // 提取资源加载的信息
      const data = resourceTransform(target)
      cacheEvents.push({
        type: ERROR_TYPE.RESOURCE_ERROR,
        category: cacheEvents.getCategory(ERROR_TYPE.RESOURCE_ERROR),
        status: STATUS_CODE.ERROR,
        time: getTimestamp(),
        data
      })
      return reportData.send(ERROR_TYPE.RESOURCE_ERROR, {
        ...data,
        // type: ERROR_TYPE.RESOURCE_ERROR,
        status: STATUS_CODE.ERROR
      })
    }
  },

  // history，添加到行为栈
  handleHistory(data: RouteHistory): void {
    const { from, to } = data
    // 定义parsedFrom变量，值为relative
    cacheEvents.push({
      type: BEHAVIOR_TYPE.HISTORY_CHANGE,
      category: cacheEvents.getCategory(BEHAVIOR_TYPE.HISTORY_CHANGE),
      data: {
        from,
        to
      },
      time: getTimestamp(),
      status: STATUS_CODE.OK
    })
  },

  // hashChange，添加到行为栈
  handleHashchange(data: HashChangeEvent): void {
    const { oldURL, newURL } = data

    cacheEvents.push({
      type: BEHAVIOR_TYPE.HASH_CHANGE,
      category: cacheEvents.getCategory(BEHAVIOR_TYPE.HASH_CHANGE),
      data: {
        from: oldURL,
        to: newURL
      },
      time: getTimestamp(),
      status: STATUS_CODE.OK
    })
  },

  // 异常错误，添加到行为栈
  handleUnhandleRejection(ev: PromiseRejectionEvent): void {
    debugger
    // TODO：ErrorStackParser
    const stackFrame = ErrorStackParser.parse(ev.reason)[0]
    const { fileName, columnNumber, lineNumber } = stackFrame
    const message = ev.reason.message || ev.reason.stack
    const data = {
      type: ERROR_TYPE.PROMISE_ERROR,
      status: STATUS_CODE.ERROR,
      time: getTimestamp(),
      fileName,
      line: lineNumber,
      column: columnNumber
    }

    cacheEvents.push({
      type: ERROR_TYPE.PROMISE_ERROR,
      category: cacheEvents.getCategory(ERROR_TYPE.PROMISE_ERROR),
      time: getTimestamp(),
      status: STATUS_CODE.ERROR,
      data
    })
    const hash: string = getErrorUid(
      `${ERROR_TYPE.PROMISE_ERROR}-${message}-${fileName}-${columnNumber}`
    )
    // 开启repeatCodeError第一次报错才上报
    if (
      !options.repeatCodeError ||
      (options.repeatCodeError && !hashMapExist(hash))
    ) {
      reportData.send(ERROR_TYPE.PROMISE_ERROR, data)
    }
  },

  // 性能数据，直接上报
  handleWhiteScreen(): void {
    openWhiteScreen((res: any) => {
      // 上报白屏检测信息
      reportData.send(ERROR_TYPE.WHITESCREEN_ERROE, {
        // type: ERROR_TYPE.WHITESCREEN_ERROE,
        time: getTimestamp(),
        ...res
      })
    }, options)
  }
}

export { HandleEvents }
