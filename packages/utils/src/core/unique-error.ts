import { _Monitor } from './global'

// 对每一个错误详情，生成唯一的编码
export function getErrorUid(input: string): string {
  return window.btoa(encodeURIComponent(input))
}

export function hashMapExist(hash: string): boolean {
  const exist = _Monitor.errorMap.has(hash)
  if (!exist) {
    _Monitor.errorMap.set(hash, true)
  }
  return exist
}
