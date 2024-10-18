import { STANDARD_FID } from '../constants'
import { Callback, IPerformanceData, IReportData } from '../../../types'
// import { reportData } from '../utils'

export const measureFID = (callback: Callback) => {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    const entries: PerformanceEntry[] = list.getEntries()
    let fidValue: number | string

    entries.forEach((entry: PerformanceEntry) => {
      if (entry.entryType === 'first-input') {
        fidValue =
          (entry as PerformanceEventTiming).processingStart - entry.startTime
        observer.disconnect()

        const data: IPerformanceData = {
          subType: 'FID',
          value: fidValue,
          rating: fidValue > STANDARD_FID ? 'poor' : 'good'
        }
        // reportData('performance', reportData as IReportData)
        callback(data)
      }
    })
  }

  const observer = new PerformanceObserver(entryHandler)
  observer.observe({ type: 'first-input', buffered: true })
}
