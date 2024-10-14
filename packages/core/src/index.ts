import { IOptions, ICustomErrOptions, ICustomClickOptions } from '../../types'
import { setOptions } from './core/config'
import { catchError, errorCapture } from './core/catch-error'
import { getPV } from './core/collect-pv'
import { reportData, CacheEvents } from '../../utils'
// import { performancePlugin } from '../performance/index'
import { autoTrackerClick, customTrackerClick } from '../../behavior/index'

class Monitor {
  private options

  constructor(options: IOptions) {
    this.options = options
  }

  // 初始化
  init() {
    setOptions(this.options)
    catchError()
    getPV()
    if (this.options.autoTracker) {
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
    instance.core({ reportData, CacheEvents, options })
  }
}

export default Monitor
