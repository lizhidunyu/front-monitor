import { IReportData, IPerformanceData, Callback } from '../../../types'
// import { reportData } from '../utils'

export function measureLongTask(callback: Callback) {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    const entries: PerformanceEntry[] = list.getEntries()
    for (const longTask of entries) {
      // 上报长任务详情
      const reportData: IPerformanceData = {
        subType: 'longTask',
        value: longTask
      }
      callback(reportData)
      // reportData('performance', reportData as IReportData)
    }
  }
  const observer = new PerformanceObserver(entryHandler)
  // 监听 layout-shift 类型的性能指标
  observer.observe({ entryTypes: ['longtask'] })
}
