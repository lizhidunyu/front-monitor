import { SubType } from '../../../utils/src/types'
import {
  BEHAVIOR_TYPE,
  ERROR_TYPE,
  PERFORMANCE_TYPE
} from '../../../utils/src/constants'

/**手动上报错误的参数**/
export interface ICustomErrOptions {
  message?: string
  error?: any
  subType?: SubType
}

/**上报错误数据**/
export interface IWindowErrorData {
  message?: string | Event
  file?: string
  row?: number | string
  col?: number | string
  stack?: any
  error?: any
  subType?: ERROR_TYPE
}
export interface IPromiseErrorData {
  message?: string
  error?: any
  subType?: ERROR_TYPE
}

export interface IResourceErrorData {
  message?: string
  file?: unknown
  html?: any
  subType?: ERROR_TYPE
}

// 上报PV
export interface IPVData {
  subType: 'pv'
}

export type Callback = (...args: any[]) => void
