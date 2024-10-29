import { IPerformanceData } from '../types'
// import { reportData } from '../utils'
import { STANDARD_LCP } from '../constants'
import { Callback } from '../../../utils/src/types'
import { PERFORMANCE_TYPE } from '../../../utils/src/constants'

export const measureLCP = (callback: Callback) => {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    const entries: PerformanceEntry[] = list.getEntries()
    let lcpValue: number | string

    entries.forEach((entry: PerformanceEntry) => {
      if (entry.name === 'largest-contentful-paint') {
        lcpValue = entry.startTime
        observer.disconnect()

        const data: IPerformanceData = {
          subType: PERFORMANCE_TYPE.LCP,
          value: lcpValue,
          rating: lcpValue > STANDARD_LCP ? 'poor' : 'good'
        }
        // reportData('performance', reportData as IReportData)
        callback(data)
      }
    })
  }

  const observer = new PerformanceObserver(entryHandler)
  observer.observe({ type: 'largest-contentful-paint', buffered: true })
}
