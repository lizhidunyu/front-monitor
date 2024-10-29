import { notify } from '../../utils/subscribe'
import { options } from '../config'
import { on, throttle } from '../../utils/helper'
import { BEHAVIOR_TYPE } from '../../../../utils/src/constants'

export function domReplace(): void {
  if (!('document' in window)) return
  // 节流，默认0s
  // todo:节流机制
  const clickThrottle = throttle(notify, options.throttleDelayTime)
  on(
    window.document,
    'click',
    function (this: any): void {
      clickThrottle(BEHAVIOR_TYPE.CLICK, {
        category: 'click',
        data: this
      })
    },
    true
  )
}
