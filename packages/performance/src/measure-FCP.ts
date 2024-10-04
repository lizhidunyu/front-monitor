import { IReportData, IPerformanceData } from '../../types'
import { lazyReport } from '../../utils'
import { STANDARD_FCP } from '../constants'

export const measureFCP = () => {
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
        lazyReport('performance', reportData as IReportData)
      }
    })
  }

  const observer = new PerformanceObserver(entryHandler)
  observer.observe({ type: 'paint', buffered: true })
}
