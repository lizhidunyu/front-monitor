import { SubType } from '../common'

// 调用Monitor传入的配置信息
export interface IOptions {
  config: IConfig // 基本配置信息
}

// 基本配置
export interface IConfig {
  url: string | URL
  appId?: string
  userId?: string
  autoTracker: boolean
  skeletonProject?: boolean
  whiteBoxElements?: string[]
  reportConfig?: {
    isImgReport?: Boolean // 是否采用图片上报
    isImmediate?: Boolean // 是否延迟上报
    timeout?: string | number // 回调在多少毫秒之后被调用
  }

  [key: string]: any
}

// 手动上报错误的参数
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
  subType?: 'jsError'
}

export interface IPromiseErrorData {
  message?: string
  error?: any
  subType?: 'promiseError'
}

export interface IResourceErrorData {
  message?: string
  file?: unknown
  html?: any
  subType?: 'resourceError'
}

// 上报PV
export interface IPVData {
  subType: 'pv'
}
