import {
  IOptions,
  ICustomErrOptions,
  IPerformanceOptions,
  ICustomClickOptions
} from '../../types'
import { setConfig, config } from './core/config'
import { catchError, errorCapture } from './core/catch-error'
import { getPV } from './core/collect-pv'
import { lazyReport, CacheEvents } from '../../utils'
// import { performancePlugin } from '../performance/index'
import { autoTrackerClick, customTrackerClick } from '../../behavior/index'

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

  // 手动埋点
  tracker(options: ICustomClickOptions) {
    customTrackerClick(options)
  }

  // 注册插件（性能插件/录屏插件）
  use(plugin: any, options: IOptions) {
    const instance = new plugin(options)
    instance.core({ lazyReport, CacheEvents, options })
  }
}

export default Monitor
