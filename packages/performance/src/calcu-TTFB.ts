import { IReportData, ITTFBData } from '../../types'
import { lazyReport } from '../../utils'
import { TTFB_RANGE } from '../constants'

export const calcuTTFB = () => {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    const entries: PerformanceEntry[] = list.getEntries()
    let ttfbValue: number | string

    entries.forEach((entry: PerformanceEntry) => {
      if (entry.entryType === 'navigation') {
        const navigationEntry = entry as PerformanceNavigationTiming
        ttfbValue = navigationEntry.responseStart - navigationEntry.requestStart

        const reportData: ITTFBData = {
          subType: 'TTFB',
          value: ttfbValue,
          rating:
            ttfbValue <= TTFB_RANGE.PRETTY
              ? 'good'
              : ttfbValue <= TTFB_RANGE.ACCEPTED
                ? 'normal'
                : 'bad'
        }
        lazyReport('performance', reportData as IReportData)
      }
    })
  }

  const observer = new PerformanceObserver(entryHandler)
  observer.observe({ type: 'navigation', buffered: true })
}
