import { getWebVitals } from './core'

export default class PerformancePlugin {
  core({ lazyReport, options }: any) {
    const performanceConfig = options.performanceConfig
    getWebVitals(performanceConfig, lazyReport)
  }
}
