import { IReportData, Callback } from '../../../utils/src/types'
import { IPerformanceData } from '../types'
import { PERFORMANCE_TYPE } from '../../../utils/src/constants'
// import { reportData } from '../utils'

export const measureFP = (callback: Callback) => {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    const entries: PerformanceEntry[] = list.getEntries()
    let fpValue: number | string

    entries.forEach((entry: PerformanceEntry) => {
      if (entry.name === 'first-paint') {
        fpValue = entry.startTime
        observer.disconnect()

        const data: IPerformanceData = {
          subType: PERFORMANCE_TYPE.FP,
          value: fpValue
        }
        // reportData('performance', reportData as IReportData)
        callback(data)
      }
    })
  }

  const observer = new PerformanceObserver(entryHandler)
  observer.observe({ type: 'paint', buffered: true })
}
