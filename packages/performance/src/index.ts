import { getWebVitals } from './core'

export default class PerformancePlugin {
  core({ reportData, options }: any) {
    const performanceConfig = options.performanceConfig
    console.log('performanceConfig:', performanceConfig)
    getWebVitals(performanceConfig, reportData)
  }
}
