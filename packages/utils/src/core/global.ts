export function getGlobalMonitor() {
  ;(window as unknown as any)._Monitor = (window as unknown as any)
    ._Monitor || {
    hasError: false,
    errorMap: new Map(), // 存储代码错误的集合
    vue: null,
    react: null,
    recordScreenId: null,
    loopTimer: String || Number
  }
  return (window as unknown as any)._Monitor
}

export const _Monitor = getGlobalMonitor()

// _Monitor.replaceOb 当前对象身上有没有添加过对应的事件
_Monitor.replaceFlagObj = _Monitor.replaceFlagObj || {}
const replaceFlagObj = _Monitor.replaceFlagObj
export function setFlag(replaceType: string, isSet: boolean) {
  if (replaceFlagObj[replaceType]) return
  replaceFlagObj[replaceType] = isSet
}
export function getFlag(replaceType: string) {
  return replaceFlagObj[replaceType] ? true : false
}
