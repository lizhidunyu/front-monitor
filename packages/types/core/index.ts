import { SubType } from '../common'

/*********配置信息相关**********/
// 调用Monitor传入的配置信息
export interface IOptions {
  url: string
  appId: string
  userId: string
  autoTracker?: boolean
  maxCacheEventsNum?: number
  beforePushCache?: any
  reportConfig?: IReportConfig
  performanceConfig?: IPerformancePlugin // 性能属性配置
  recordConfig?: IRecordPlugin // 录屏插件配置
  [key: string]: any
}

// 上报数据的配置信息
export interface IReportConfig {
  isImgReport?: boolean // 是否采用图片上报
  isImmediate?: boolean // 是否延迟上报
  timeout?: number // 回调在多少毫秒之后被调用
}

// 性能插件配置
export interface IPerformancePlugin {
  TTFB?: boolean // 支持自定义监视的性能列表
  CLS?: boolean
  FCP?: boolean
  FID?: boolean
  FP?: boolean
  LCP?: boolean
  longTask?: boolean
  FMP?: boolean
  whiteScreen?: boolean
  resourceList?: boolean
  skeletonProject?: boolean // 是否是骨架屏项目
  whiteBoxElements?: string[] //  白屏检测的容器列表
}

// 录屏插件配置
export interface IRecordPlugin {
  recordScreentime?: number
  recordScreenTypeList?: any[]
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
