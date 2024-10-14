import { reportData } from '@/utils'
import { IOptions } from '../../../types'
import { cacheEvents } from '../utils/cache-events'

const options: IOptions = {
  url: 'http://localhost:8000/report',
  appId: '',
  userId: '',
  autoTracker: false, //是否使用无痕埋点
  skeletonProject: false, // 是否属于骨架屏
  whiteBoxElements: [], // 白屏检测的容器列表
  maxCacheEventsNum: 10,
  beforePushCache: null,
  reportConfig: {
    isImgReport: false, // 是否采用图片上报
    isImmediate: false // 是否延迟上报
  },
  performanceConfig: {
    TTFB: true, // 支持自定义监视的性能列表
    CLS: true,
    FCP: true,
    FID: true,
    FP: true,
    LCP: true,
    longTask: true,
    FMP: true,
    whiteScreen: true,
    resourceList: true,
    skeletonProject: false,
    whiteBoxElements: ['html', 'body', '#app', '#root']
  },
  recordConfig: {
    //录屏配置
    recordScreentime: 10,
    recordScreenTypeList: ['error']
  }
}

function setOptions(options: Partial<IOptions>, target: any = options): void {
  for (const key in options) {
    if (options[key] !== undefined) {
      if (typeof options[key] === 'object' && options[key] !== null) {
        target[key] = target[key] || {}
        setOptions(options[key] as Partial<IOptions>, target[key])
      } else {
        target[key] = options[key]
      }
    }
  }
  cacheEvents.bindOptions(options)
  reportData.bindOptions(options)
}

export { options, setOptions }
