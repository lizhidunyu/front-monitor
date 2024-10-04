import { IReportData, IPerformanceData } from '../../types'
import { lazyReport } from '../../utils'

export function measureLongTask() {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    const entries: PerformanceEntry[] = list.getEntries()
    for (const longTask of entries) {
      // 上报长任务详情
      const reportData: IPerformanceData = {
        subType: 'longTask',
        value: longTask
      }
      lazyReport('performance', reportData as IReportData)
    }
  }
  const observer = new PerformanceObserver(entryHandler)
  // 监听 layout-shift 类型的性能指标
  observer.observe({ entryTypes: ['longtask'] })
}
