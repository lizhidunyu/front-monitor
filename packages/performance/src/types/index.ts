import { SubType } from '../../../utils/src/types'

export interface IPerformanceData {
  subType?: SubType
  value?: string | number | PerformanceEntry
  rating?: string
  resourceList?: any[]
}

// 用户自定义需要上报的性能指标
// export interface IPerformanceOptions {
//   TTFB: boolean
//   CLS: boolean
//   FCP: boolean
//   FID: boolean
//   FP: boolean
//   LCP: boolean
//   longTask: boolean
//   FMP: boolean
// }

export interface LayoutShift extends PerformanceEntry {
  value: string | number
  hadRecentInput: boolean
}

export enum STATUS_CODE {
  ERROR = 'error',
  OK = 'ok'
}
