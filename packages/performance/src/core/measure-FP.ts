import { IReportData, IPerformanceData, Callback } from '../../../types'
// import { reportData } from '../utils'

export const measureFP = (callback: Callback) => {
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
        // reportData('performance', reportData as IReportData)
        callback(reportData)
      }
    })
  }

  const observer = new PerformanceObserver(entryHandler)
  observer.observe({ type: 'paint', buffered: true })
}
