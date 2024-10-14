import { v4 as uuidv4 } from 'uuid'

// 生成唯一id
export function generateUniqueId(type: string, time: number) {
  return `${type}-${time}-${uuidv4()}`
}

// 判断是否支持sendBeacon上报
export function isSupportSendBeacon() {
  return !!window.navigator.sendBeacon
}

// 改写requestIdleCallback、cancelIdleCallback函数
window.requestIdleCallback =
  window.requestIdleCallback ||
  function (handler, options) {
    let startTime = Date.now()
    const timeout = (options && options.timeout) || 0 // 获取超时值

    return setTimeout(function () {
      const elapsedTime = Date.now() - startTime
      const didTimeout = elapsedTime >= timeout // 检查是否超时

      handler({
        didTimeout: didTimeout,
        timeRemaining: function () {
          return Math.max(0, 50.0 - elapsedTime)
        }
      })
    }, 1)
  }

window.cancelIdleCallback =
  window.cancelIdleCallback ||
  function (id) {
    clearTimeout(id)
  }

export const originalOpen = XMLHttpRequest.prototype.open
export const originalSend = XMLHttpRequest.prototype.send
