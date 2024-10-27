// import { autoTrackerClick, customTrackerClick } from '../../behavior/index'
import { IOptions, ICustomErrOptions, VueInstance } from '../src/types'
import { reportData, CacheEvents, getFlag, setFlag } from '../../utils'
import { setupReplace } from './utils/setup-raplace'
// import { errorCapture } from './core/catch-error'
import { setOptions } from './core/config'
import { PROJECT_TYPE } from '@/utils/src/constants'
import { ViewModel } from './types/config'
import { HandleEvents } from './core/utils/handle-events'

class Monitor {
  private options

  constructor(options: IOptions) {
    this.options = options
  }

  // 初始化
  init() {
    // 初始化操作用户配置
    setOptions(this.options)
    // 初始化事件机制
    setupReplace()
    if (this.options.autoTracker) {
      //默认不使用无痕埋点
      // autoTrackerClick() // 开启无痕埋点
    }
  }

  // Vue使用install插件的方式使用
  install(Vue: VueInstance) {
    if (getFlag(PROJECT_TYPE.VUE)) return
    setFlag(PROJECT_TYPE.VUE, true)
    // vue项目在Vue.config.errorHandler中上报错误
    const handler = Vue.config.errorHandler
    Vue.config.errorHandler = function (
      err: Error,
      vm: ViewModel,
      info: string
    ): void {
      // 首先去上报错误，然后再去执行Vue的处理逻辑
      HandleEvents.handleError(err)
      if (handler) handler.apply(null, [err, vm, info])
    }
    this.init()
  }

  // React使用ErrorBoundary中上报错误
  errorBoundary(err: Error): void {
    if (getFlag(PROJECT_TYPE.REACT)) return
    setFlag(PROJECT_TYPE.REACT, true)
    HandleEvents.handleError(err)
  }

  // 手动上报错误
  handleCustomError(options: ICustomErrOptions) {
    // errorCapture(options)
  }

  // 手动埋点
  //  ICustomClickOptions
  tracker(options: any) {
    // customTrackerClick(options)
  }

  // 注册插件（性能插件/录屏插件）
  // TODO: 优化当前的逻辑
  use(plugin: any, options: IOptions) {
    const instance = new plugin(options)
    instance.core({ reportData, CacheEvents, options })
  }
}

export { Monitor }
