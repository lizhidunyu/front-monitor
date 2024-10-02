import { IBaseConfig } from '../types/index'

const config: IBaseConfig = {
  url: '',
  appId: '',
  userId: ''
  // reportUrl: ''
  // TODO:此处省略其他配置
}

function setConfig(options: Partial<IBaseConfig>): void {
  for (const key in options) {
    if (options[key]) {
      config[key as keyof IBaseConfig] = options[key]
    }
  }
}

export { config, setConfig }
