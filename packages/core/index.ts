import { IReportData, IOptions, ICustomErrOptions } from 'packages/types'
import { setConfig, config } from './src/config'
import { catchError, errorCapture } from './src/catch-error'

class Monitor {
  private options
  private config
  // private customErrOptions

  constructor(options: IOptions) {
    this.options = options
    const { config, customErrOptions } = this.options
    this.config = config //基础配置
    // this.customErrOptions = customErrOptions //自定义错误上报
  }

  init() {
    setConfig(this.config)
    catchError()
  }

  handleCustomError(options: ICustomErrOptions) {
    errorCapture(options)
  }
}

export default Monitor
