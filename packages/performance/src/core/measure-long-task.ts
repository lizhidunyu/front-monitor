import { Callback } from '@/utils/src/types'
import { IPerformanceData } from '../types'
import { PERFORMANCE_TYPE } from '@/utils/src/constants'

export function measureLongTask(callback: Callback) {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    const entries: PerformanceEntry[] = list.getEntries()
    for (const longTask of entries) {
      // 上报长任务详情
      const data: IPerformanceData = {
        subType: PERFORMANCE_TYPE.LONG_TASK,
        value: longTask
      }
      callback(data)
      // reportData('performance', reportData as IReportData)
    }
  }
  const observer = new PerformanceObserver(entryHandler)
  // 监听 layout-shift 类型的性能指标
  observer.observe({ entryTypes: ['longtask'] })
}
