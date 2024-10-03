import { IConfig } from '../../types/index'

const config: IConfig = {
  url: '',
  appId: '',
  userId: '',
  reportConfig: {
    isImgReport: false, // 是否采用图片上报
    isImmediate: false // 是否延迟上报
  }
  // reportUrl: ''
  // TODO:此处省略其他配置
}

function setConfig(options: Partial<IConfig>, target: any = config): void {
  for (const key in options) {
    if (options[key] !== undefined) {
      if (typeof options[key] === 'object' && options[key] !== null) {
        target[key] = target[key] || {}
        setConfig(options[key] as Partial<IConfig>, target[key])
      } else {
        target[key] = options[key]
      }
    }
  }
}

export { config, setConfig }
