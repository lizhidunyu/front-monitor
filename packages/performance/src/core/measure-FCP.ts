import { IReportData, IPerformanceData } from '../../../types'
// import { reportData } from '../utils'
import { STANDARD_FCP } from '../constants'
import { Callback } from '@/types'

export const measureFCP = (callback: Callback) => {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    const entries: PerformanceEntry[] = list.getEntries()
    let fcpValue: number | string

    entries.forEach((entry: PerformanceEntry) => {
      if (entry.name === 'first-contentful-paint') {
        fcpValue = entry.startTime
        observer.disconnect()

        const reportData: IPerformanceData = {
          subType: 'FCP',
          value: fcpValue,
          rating: fcpValue > STANDARD_FCP ? 'poor' : 'good'
        }
        // reportData('performance', reportData as IReportData)
        callback(reportData)
      }
    })
  }

  const observer = new PerformanceObserver(entryHandler)
  observer.observe({ type: 'paint', buffered: true })
}
