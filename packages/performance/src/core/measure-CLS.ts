import {
  IReportData,
  IPerformanceData,
  LayoutShift,
  Callback
} from '../../../types'
import { lazyReport } from '../../../utils'
import { STANDARD_CLS } from '../constants'

export function measureCLS(callback: Callback) {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    let clsValue = 0
    const entries: PerformanceEntry[] = list.getEntries()
    entries.forEach((entry: PerformanceEntry) => {
      // 累积所有的布局偏移值
      if (!(entry as LayoutShift).hadRecentInput) {
        clsValue += (entry as LayoutShift).value as number
      }
    })
    observer.disconnect()
    const reportData: IPerformanceData = {
      subType: 'CLS',
      value: clsValue,
      rating: clsValue > STANDARD_CLS ? 'poor' : 'good'
    }
    // lazyReport('performance', reportData as IReportData)
    callback(reportData)
  }
  const observer = new PerformanceObserver(entryHandler)
  observer.observe({ type: 'layout-shift', buffered: true })
}
