import {
  TYPES,
  ERROR_TYPE,
  BUSINESS_TYPE,
  PERFORMANCE_TYPE,
  BEHAVIOR_TYPE,
  RECORD_TYPE
} from '../../constants'
import {
  IConfig,
  IWindowErrorData,
  IPromiseErrorData,
  IResourceErrorData,
  ICustomErrOptions
} from '../core'
import { IPerformanceData } from '../performance'
import { IClickEventData, CustomType } from '../behavior'

// 定义一级类型
export type Type = (typeof TYPES)[keyof typeof TYPES]
// 定义二级子类型
export type SubType =
  | (typeof ERROR_TYPE)[keyof typeof ERROR_TYPE]
  | (typeof BUSINESS_TYPE)[keyof typeof BUSINESS_TYPE]
  | (typeof PERFORMANCE_TYPE)[keyof typeof PERFORMANCE_TYPE]
  | (typeof BEHAVIOR_TYPE)[keyof typeof BEHAVIOR_TYPE]
  | (typeof RECORD_TYPE)[keyof typeof RECORD_TYPE]
  | CustomType

// 上报数据的回调函数
export interface Callback {
  (...args: any[]): any
}

// 上报数据的data类型
export type IReportData = IWindowErrorData &
  IPromiseErrorData &
  IResourceErrorData &
  ICustomErrOptions &
  IPerformanceData &
  IClickEventData

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
