import { IReportData, IPerformanceData } from '../../types'
import { lazyReport } from '../../utils'

export const measureFP = () => {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    const entries: PerformanceEntry[] = list.getEntries()
    let fpValue: number | string

    entries.forEach((entry: PerformanceEntry) => {
      if (entry.name === 'first-paint') {
        fpValue = entry.startTime
        observer.disconnect()

        const reportData: IPerformanceData = {
          subType: 'FP',
          value: fpValue
        }
        lazyReport('performance', reportData as IReportData)
      }
    })
  }

  const observer = new PerformanceObserver(entryHandler)
  observer.observe({ type: 'paint', buffered: true })
}
