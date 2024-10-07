import {
  IOptions,
  ICustomErrOptions,
  IPerformanceOptions,
  ICustomClickOptions
} from '../types'
import { setConfig, config } from './src/config'
import { catchError, errorCapture } from './src/catch-error'
import { getPV } from './src/collect-pv'
// import { performancePlugin } from '../performance/index'
import { autoTrackerClick, customTrackerClick } from '../behavior/index'

class Monitor {
  private options
  private config

  constructor(options: IOptions) {
    this.options = options
    const { config } = this.options
    this.config = config //基础配置
  }

  // 初始化
  init() {
    setConfig(this.config)
    catchError()
    getPV()
    if (this.config.autoTracker) {
      //默认不使用无痕埋点
      autoTrackerClick() // 开启无痕埋点
    }
  }

  // 手动上报错误
  handleCustomError(options: ICustomErrOptions) {
    errorCapture(options)
  }

  // 自定义性能监控列表
  // observePerformance(options: IPerformanceOptions) {
  //   performancePlugin(options)
  // }

  // 手动埋点
  tracker(options: ICustomClickOptions) {
    customTrackerClick(options)
  }
}

export default Monitor
