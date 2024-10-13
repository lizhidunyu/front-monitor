import { IReportData, IPerformanceData } from '../../../types'
// import { lazyReport } from '../utils'
import { STANDARD_LCP } from '../constants'
import { Callback } from '@/types'

export const measureLCP = (callback: Callback) => {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    const entries: PerformanceEntry[] = list.getEntries()
    let lcpValue: number | string

    entries.forEach((entry: PerformanceEntry) => {
      if (entry.name === 'largest-contentful-paint') {
        lcpValue = entry.startTime
        observer.disconnect()

        const reportData: IPerformanceData = {
          subType: 'LCP',
          value: lcpValue,
          rating: lcpValue > STANDARD_LCP ? 'poor' : 'good'
        }
        // lazyReport('performance', reportData as IReportData)
        callback(reportData)
      }
    })
  }

  const observer = new PerformanceObserver(entryHandler)
  observer.observe({ type: 'largest-contentful-paint', buffered: true })
}
