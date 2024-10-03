import {
  IReportData,
  IOptions,
  ICustomErrOptions,
  IPerformanceOptions
} from '../types'
import { setConfig, config } from './src/config'
import { catchError, errorCapture } from './src/catch-error'
import { getPV } from './src/collect-pv'
import { performancePlugin } from '../performance/index'

class Monitor {
  private options
  private config

  constructor(options: IOptions) {
    this.options = options
    const { config } = this.options
    this.config = config //基础配置
  }

  init() {
    setConfig(this.config)
    catchError()
    getPV()
  }

  handleCustomError(options: ICustomErrOptions) {
    errorCapture(options)
  }

  observePerformance(options: IPerformanceOptions) {
    performancePlugin(options)
  }
}

export default Monitor
