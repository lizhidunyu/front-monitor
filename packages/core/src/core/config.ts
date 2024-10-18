import { reportData } from '@/utils'
import { IOptions } from '../types'
import { cacheEvents } from '../utils/cache-events'

const options: IOptions = {
  // 默认配置
  url: 'http://localhost:8000/report',
  appId: '',
  userId: '',
  autoTracker: false, //是否使用无痕埋点
  skeletonProject: false, // 是否属于骨架屏
  whiteBoxElements: [], // 白屏检测的容器列表
  maxCacheEventsNum: 10,
  filterXhrUrlRegExp: '', // 过滤的接口请求正则
  handleHttpStatus: null, // 用户设置handleHttpStatus函数来判断接口是否正确
  beforePushCache: null,
  // 上报配置
  reportConfig: {
    isImgReport: false, // 是否采用图片上报
    isImmediate: false // 是否延迟上报
  },
  //性能配置
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
  //录屏配置
  recordConfig: {
    recordScreentime: 10,
    recordScreenTypeList: ['error']
  }
}

function setOptions(options: Partial<IOptions>, target: any = options): void {
  // 用户配置替换默认的配置
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
  // 初始化用户行为栈
  cacheEvents.bindOptions(options)
  // 初始化上报信息
  reportData.bindOptions(options)
}

export { options, setOptions }
