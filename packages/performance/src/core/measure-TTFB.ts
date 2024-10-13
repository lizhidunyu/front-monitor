import { Callback } from '@/types'
import { IReportData, IPerformanceData } from '../../../types'
// import { lazyReport } from '../utils'
import { TTFB_RANGE } from '../constants'

export const measureTTFB = (callback: Callback) => {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    const entries: PerformanceEntry[] = list.getEntries()
    let ttfbValue: number | string

    entries.forEach((entry: PerformanceEntry) => {
      if (entry.entryType === 'navigation') {
        const navigationEntry = entry as PerformanceNavigationTiming
        ttfbValue = navigationEntry.responseStart - navigationEntry.requestStart
        observer.disconnect()

        const reportData: IPerformanceData = {
          subType: 'TTFB',
          value: ttfbValue,
          rating:
            ttfbValue <= TTFB_RANGE.PRETTY
              ? 'good'
              : ttfbValue <= TTFB_RANGE.ACCEPTED
                ? 'normal'
                : 'poor'
        }
        // lazyReport('performance', reportData as IReportData)
        callback(reportData)
      }
    })
  }

  const observer = new PerformanceObserver(entryHandler)
  observer.observe({ type: 'navigation', buffered: true })
}
