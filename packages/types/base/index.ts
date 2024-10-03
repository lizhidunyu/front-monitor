// 调用Monitor传入的配置信息
export interface IOptions {
  config: IConfig // 基本配置信息
  customErrOptions: ICustomErrOptions // 自定义错误捕获
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
  errorType?: errorType
}

// 定义错误的类型
type errorType = 'jsError' | 'promiseError' | 'resourceError'

// 上报数据的类型
export interface IReportData {
  // TODO:拆解
  message?: any
  file?: unknown
  row?: string | number
  col?: string | number
  stack?: any
  error?: any
  html?: any
  errorType?: errorType
}
