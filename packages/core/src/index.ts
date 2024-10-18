import { autoTrackerClick, customTrackerClick } from '../../behavior/index'
import { IOptions, ICustomErrOptions } from '../src/types'
import { reportData, CacheEvents } from '../../utils'
import { setupReplace } from './utils/setup-raplace'
// import { errorCapture } from './core/catch-error'
import { setOptions } from './core/config'

class Monitor {
  private options

  constructor(options: IOptions) {
    this.options = options
  }

  // 初始化
  init() {
    setOptions(this.options)
    setupReplace()
    if (this.options.autoTracker) {
      //默认不使用无痕埋点
      autoTrackerClick() // 开启无痕埋点
    }
  }

  // 手动上报错误
  handleCustomError(options: ICustomErrOptions) {
    // errorCapture(options)
  }

  // 手动埋点
  //  ICustomClickOptions
  tracker(options: any) {
    customTrackerClick(options)
  }

  // 注册插件（性能插件/录屏插件）
  use(plugin: any, options: IOptions) {
    const instance = new plugin(options)
    instance.core({ reportData, CacheEvents, options })
  }
}

export default Monitor
