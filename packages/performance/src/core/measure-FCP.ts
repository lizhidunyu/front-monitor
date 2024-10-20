import { IPerformanceData } from '../types'
// import { reportData } from '../utils'
import { STANDARD_FCP } from '../constants'
import { Callback, IReportData } from '@/utils/src/types'
import { PERFORMANCE_TYPE } from '@/utils/src/constants'

export const measureFCP = (callback: Callback) => {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    const entries: PerformanceEntry[] = list.getEntries()
    let fcpValue: number | string

    entries.forEach((entry: PerformanceEntry) => {
      if (entry.name === 'first-contentful-paint') {
        fcpValue = entry.startTime
        observer.disconnect()

        const data: IPerformanceData = {
          subType: PERFORMANCE_TYPE.FCP,
          value: fcpValue,
          rating: fcpValue > STANDARD_FCP ? 'poor' : 'good'
        }
        // reportData('performance', reportData as IReportData)
        callback(data)
      }
    })
  }

  const observer = new PerformanceObserver(entryHandler)
  observer.observe({ type: 'paint', buffered: true })
}
