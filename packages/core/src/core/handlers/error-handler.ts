import { ERROR_TYPE } from '../../../../utils/src/constants'
import { on } from '../../utils/helper'
import { notify } from '../../utils/subscribe'

export const listenError = (): void => {
  on(window, 'error', function (e: ErrorEvent) {
    notify(ERROR_TYPE.JS_ERROR)
  })
}

export function unhandledrejectionReplace(): void {
  on(window, ERROR_TYPE.PROMISE_ERROR, function (ev: PromiseRejectionEvent) {
    console.log('*******')

    // ev.preventDefault() 阻止默认行为后，控制台就不会再报红色错误
    notify(ERROR_TYPE.PROMISE_ERROR, ev)
  })
}
