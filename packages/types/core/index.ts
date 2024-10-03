// 调用Monitor传入的配置信息
export interface IOptions {
  config: IConfig // 基本配置信息
}

// 基本配置
export interface IConfig {
  url: string | URL
  appId?: string
  userId?: string
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

// 定义一级类型
export type Type = 'business' | 'error'
// 定义二级子类型
export type SubType = 'jsError' | 'promiseError' | 'resourceError' | 'pv'

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

// 上报数据的data类型
export type IReportData = IWindowErrorData &
  IPromiseErrorData &
  IResourceErrorData &
  ICustomErrOptions

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
