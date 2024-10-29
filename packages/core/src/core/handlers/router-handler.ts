// import { getLocationHref } from '@/utils'
import { notify } from '../../utils/subscribe'
import { BEHAVIOR_TYPE, ERROR_TYPE } from '../../../../utils/src/constants'
import { Callback } from '../../../../utils/src/types'
import { on, replaceAop } from '../../utils/helper'

let lastHref: string = document.location.href
export function historyReplace(): void {
  const oldOnpopstate = window.onpopstate
  // 添加 onpopstate事件
  // TODO:这里是什么意思？
  window.onpopstate = function (this: any, ...args: any): void {
    const to = document.location.href
    const from = lastHref
    lastHref = to
    notify(BEHAVIOR_TYPE.HISTORY_CHANGE, {
      from,
      to
    })
    oldOnpopstate && oldOnpopstate.apply(this, args)
  }
  function historyReplaceFn(originalHistoryFn: Callback): Callback {
    return function (this: any, ...args: any[]): void {
      const url = args.length > 2 ? args[2] : undefined
      if (url) {
        const from = lastHref
        const to = String(url)
        lastHref = to
        notify(BEHAVIOR_TYPE.HISTORY_CHANGE, {
          from,
          to
        })
      }
      return originalHistoryFn.apply(this, args)
    }
  }
  // 重写pushState、replaceState事件
  replaceAop(window.history, 'pushState', historyReplaceFn)
  replaceAop(window.history, 'replaceState', historyReplaceFn)
}

export function listenHashchange(): void {
  // 通过onpopstate事件，来监听hash模式下路由的变化
  if (Object.prototype.hasOwnProperty('onhashchange')) {
    on(window, BEHAVIOR_TYPE.HASH_CHANGE, function (e: HashChangeEvent) {
      notify(BEHAVIOR_TYPE.HASH_CHANGE, e)
    })
  }
}
