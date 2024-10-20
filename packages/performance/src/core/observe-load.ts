/**
 * @description: 上报资源列表
 */

import { Callback } from '@/utils/src/types'
import { IPerformanceData } from '../types'
import { PERFORMANCE_TYPE } from '@/utils/src/constants'

// 判断资源是否来自缓存
export function isCache(entry: PerformanceResourceTiming): boolean {
  return (
    entry.transferSize === 0 ||
    (entry.transferSize !== 0 && entry.encodedBodySize === 0)
  )
}

// 得到所有静态资源条目，同时判断它是不是来自于缓存
export function getResource(): PerformanceResourceTiming[] {
  const entries = performance.getEntriesByType('resource')
  // 过滤掉非静态资源的 fetch、 xmlhttprequest、beacon
  let list = entries.filter((entry) => {
    return (
      ['fetch', 'xmlhttprequest', 'beacon'].indexOf(
        (entry as unknown as any).initiatorType
      ) === -1
    )
  })

  if (list.length) {
    list = JSON.parse(JSON.stringify(list))
    list.forEach((entry: any) => {
      entry.isCache = isCache(entry)
    })
  }
  return list as PerformanceResourceTiming[]
}

export function reportResource(callback: Callback) {
  window.addEventListener('load', () => {
    const data: IPerformanceData = {
      subType: PERFORMANCE_TYPE.RESOURCE_LIST,
      resourceList: getResource()
    }
    callback(data)
  })
}
