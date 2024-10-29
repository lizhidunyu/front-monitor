import { Callback } from '../../../utils/src/types'

/**
 * @description: 重写对象上面的某个属性
 * @param source 需要被重写的对象
 * @param name 需要被重写对象的key
 * @param replacement 以原有的函数作为参数，执行并重写原有函数
 * @param isForced 是否强制重写（可能原先没有该属性）
 * @returns void
 */
export function replaceAop(
  source: any,
  name: string,
  replacement: Callback,
  isForced = false
) {
  if (source === undefined) return
  if (name in source || isForced) {
    const original = source[name]
    const wrapped = replacement(original)
    if (typeof wrapped === 'function') {
      source[name] = wrapped
    }
  }
}

export function on(
  target: any,
  eventName: string,
  handler: Callback,
  options = false
) {
  target.addEventListener(eventName, handler, options)
}

export const throttle = (fn: any, delay: number) => {
  let canRun = true
  return function (this: any, ...args: any[]) {
    if (!canRun) return
    fn.apply(this, args)
    canRun = false
    setTimeout(() => {
      canRun = true
    }, delay)
  }
}
