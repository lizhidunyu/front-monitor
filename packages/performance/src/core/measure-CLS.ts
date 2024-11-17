import { IPerformanceData, LayoutShift } from '../types'
import { IReportData, Callback } from '../../../utils/src/types'
import { reportData } from '../../../utils'
import { STANDARD_CLS } from '../constants'
import { PERFORMANCE_TYPE } from '../../../utils/src/constants'

export function measureCLS(callback: Callback) {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    let clsValue = 0
    const entries: PerformanceEntry[] = list.getEntries()
    entries.forEach((entry: PerformanceEntry) => {
      // 累积所有的布局偏移值
      if (!(entry as LayoutShift).hadRecentInput) {
        clsValue += (entry as LayoutShift).value as number
      }
    })
    observer.disconnect()
    const data: IPerformanceData = {
      subType: PERFORMANCE_TYPE.CLS,
      value: clsValue,
      rating: clsValue > STANDARD_CLS ? 'poor' : 'good'
    }
    // reportData('performance', reportData as IReportData)
    callback(data)
  }
  const observer = new PerformanceObserver(entryHandler)
  observer.observe({ type: 'layout-shift', buffered: true })
}

// export function getCLS(callback: Callback): void {
//   let clsValue = 0;
//   let clsEntries = [];
//   let sessionValue = 0
//   let sessionEntries: any[] = []

//   const entryHandler = (entryList: any) => {
//     for (const entry of entryList.getEntries()) {
//       // 只将不带有最近用户输入标志的布局偏移计算在内。
//       if (!entry.hadRecentInput) {
//         const firstSessionEntry = sessionEntries[0]
//         const lastSessionEntry = sessionEntries[sessionEntries.length - 1]
//         // 如果条目与上一条目的相隔时间小于 1 秒且
//         // 与会话中第一个条目的相隔时间小于 5 秒，那么将条目
//         // 包含在当前会话中。否则，开始一个新会话。
//         if (
//           sessionValue &&
//           entry.startTime - lastSessionEntry.startTime < 1000 &&
//           entry.startTime - firstSessionEntry.startTime < 5000
//         ) {
//           sessionValue += entry.value
//           sessionEntries.push(entry)
//         } else {
//           sessionValue = entry.value
//           sessionEntries = [entry]
//         }

//         // 如果当前会话值大于当前 CLS 值，
//         // 那么更新 CLS 及其相关条目。
//         if (sessionValue > clsValue) {
//           clsValue = sessionValue
//           // clsEntries = sessionEntries;
//           observer.disconnect()

//           callback({
//             name: 'CLS',
//             value: clsValue,
//             rating: clsValue > 2500 ? 'poor' : 'good'
//           })
//         }
//       }
//     }
//   }

//   const observer = new PerformanceObserver(entryHandler)
//   observer.observe({ type: 'layout-shift', buffered: true })
// }
