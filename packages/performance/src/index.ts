import { getWebVitals } from './core'

export default class PerformancePlugin {
  core({ reportData, options }: any) {
    const performanceConfig = options.performanceConfig
    getWebVitals(performanceConfig, reportData)
  }
}
