import { STANDARD_FID } from '../constants'
import { Callback, IPerformanceData, IReportData } from '../../../types'
// import { lazyReport } from '../utils'

export const measureFID = (callback: Callback) => {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    const entries: PerformanceEntry[] = list.getEntries()
    let fidValue: number | string

    entries.forEach((entry: PerformanceEntry) => {
      if (entry.entryType === 'first-input') {
        fidValue =
          (entry as PerformanceEventTiming).processingStart - entry.startTime
        observer.disconnect()

        const reportData: IPerformanceData = {
          subType: 'FID',
          value: fidValue,
          rating: fidValue > STANDARD_FID ? 'poor' : 'good'
        }
        // lazyReport('performance', reportData as IReportData)
        callback(reportData)
      }
    })
  }

  const observer = new PerformanceObserver(entryHandler)
  observer.observe({ type: 'first-input', buffered: true })
}
