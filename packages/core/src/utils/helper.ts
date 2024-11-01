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

/**
 * @param type 检测变量类型
 */

export function isType(type: any) {
  return function (value: any): boolean {
    return Object.prototype.toString.call(value) === `[object ${type}]`
  }
}

export const variableTypeDetection = {
  isNumber: isType('Number'),
  isString: isType('String'),
  isBoolean: isType('Boolean'),
  isNull: isType('Null'),
  isUndefined: isType('Undefined'),
  isSymbol: isType('Symbol'),
  isFunction: isType('Function'),
  isObject: isType('Object'),
  isArray: isType('Array'),
  isProcess: isType('process'),
  isWindow: isType('Window')
}

export function unknownToString(target: unknown): string {
  if (variableTypeDetection.isString(target)) {
    return target as string
  }
  if (variableTypeDetection.isUndefined(target)) {
    return 'undefined'
  }
  return JSON.stringify(target)
}
