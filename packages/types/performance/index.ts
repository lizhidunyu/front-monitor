import { SubType } from '../common'

export interface IPerformanceData {
  subType?: SubType
  value?: string | number | PerformanceEntry
  rating?: string
}

// 用户自定义的性能指标配置
export interface IPerformanceOptions {
  TTFB: boolean
}

export interface LayoutShift extends PerformanceEntry {
  value: string | number
  hadRecentInput: boolean
}
