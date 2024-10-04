import {
  IConfig,
  IWindowErrorData,
  IPromiseErrorData,
  IResourceErrorData,
  ICustomErrOptions
} from '../core'
import { IPerformanceData } from '../performance'

// 定义一级类型
export type Type = 'business' | 'error' | 'performance'
// 定义二级子类型
export type SubType =
  | 'jsError'
  | 'promiseError'
  | 'resourceError'
  | 'pv'
  | 'TTFB'
  | 'FP'
  | 'FCP'
  | 'LCP'
  | 'FID'
  | 'CLS'
  | 'longTask'

// 上报数据的data类型
export type IReportData = IWindowErrorData &
  IPromiseErrorData &
  IResourceErrorData &
  ICustomErrOptions &
  IPerformanceData

// 上报数据的全部配置信息
export interface IReportConfig {
  id?: string
  data?: IReportData
  config?: IConfig
  type?: Type
  currentTime?: string | number
  currentPage?: string
  ua?: string
}
