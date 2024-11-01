import { BEHAVIOR_TYPE, ERROR_TYPE } from '../../../utils/src/constants'
import { Callback } from '../../../utils/src/types'
import { ReplaceHandler } from '../types'
import { getFlag, setFlag } from '../../../utils/src/core/global'

// 基于发布者-订阅者模式实现事件机制
// @ts-ignore
const handlers: { [key in ERROR_TYPE | BEHAVIOR_TYPE]: Callback[] } = {}

// 订阅者：handlers
export function subscribeEvent(handler: ReplaceHandler): boolean {
  // 在_Monitor身上挂载对应的事件类型
  // 如果挂载了对应的类型，或者是没有传handler
  if (!handler || getFlag(handler.type)) return false
  setFlag(handler.type, true)
  // 收集依赖
  handlers[handler.type] = handlers[handler.type] || []
  handlers[handler.type].push(handler.callback)
  return true
}

console.log('handlers:', handlers)

// 更新依赖
export function notify(type: ERROR_TYPE | BEHAVIOR_TYPE, data?: any): void {
  // debugger
  console.log('notify____', 'type:', type, 'handlers[type]', handlers[type])
  if (!type || !handlers[type]) return
  handlers[type].forEach((callback) => {
    callback(data)
  })
}
