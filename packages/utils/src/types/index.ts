import {
  TYPES,
  ERROR_TYPE,
  BUSINESS_TYPE,
  PERFORMANCE_TYPE,
  BEHAVIOR_TYPE,
  RECORD_TYPE,
  PROJECT_TYPE
} from '../constants'
import {
  IWindowErrorData,
  IPromiseErrorData,
  IResourceErrorData,
  ICustomErrOptions
} from '../../../core/src/types'
import { IPerformanceData } from '../../../performance/src/types'
// import { IClickEventData, CustomType } from '../../../utils/src/types'

// 定义一级类型
export type Type = (typeof TYPES)[keyof typeof TYPES]
// 定义二级子类型
export type SubType =
  | (typeof ERROR_TYPE)[keyof typeof ERROR_TYPE]
  | (typeof BUSINESS_TYPE)[keyof typeof BUSINESS_TYPE]
  | (typeof PERFORMANCE_TYPE)[keyof typeof PERFORMANCE_TYPE]
  | (typeof BEHAVIOR_TYPE)[keyof typeof BEHAVIOR_TYPE]
  | (typeof RECORD_TYPE)[keyof typeof RECORD_TYPE]
// | CustomType

// 上报数据的回调函数
export interface Callback {
  (...args: any[]): any
}

// 上报数据的data类型
export type IReportData =
  | (IWindowErrorData & IPromiseErrorData)
  | IResourceErrorData
  | ICustomErrOptions
  | IPerformanceData

// 上报数据的全部配置信息
export interface IReportConfig {
  id?: string
  data?: IReportData
  type?: Type
  currentTime?: string | number
  currentPage?: string
  ua?: string
  recordScreenId?: any
}

// export type EventTypes = ERROR_TYPE | BEHAVIOR_TYPE | PROJECT_TYPE
