/********* 配置信息相关 **********/
// 调用Monitor传入的配置信息
export interface IOptions {
  url: string
  appId: string
  userId: string
  autoTracker?: boolean // 是否自动埋点
  skeletonProject?: boolean // 是否属于骨架屏
  whiteBoxElements?: any[] // 白屏检测的容器节点
  maxCacheEventsNum?: number // 最大缓存的事件数
  filterXhrUrlRegExp?: string // 过滤的接口请求正则
  beforePushCache?: any
  reportConfig?: IReportConfig // 上报数据相关配置（见下）
  performanceConfig?: IPerformancePlugin // 性能属性配置（见下）
  recordConfig?: IRecordPlugin // 录屏插件配置（见下）
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
