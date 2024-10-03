import { SubType } from '../common'

export interface ITTFBData {
  subType?: SubType
  value?: string | number
  rating?: string
}

// 用户自定义的性能指标列表
export interface IPerformanceOptions {
  TTFB: boolean
}
