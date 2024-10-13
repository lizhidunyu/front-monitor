import { measureTTFB } from './measure-TTFB'
import { measureFP } from './measure-FP'
import { measureFCP } from './measure-FCP'
import { measureLCP } from './measure-LCP'
import { measureCLS } from './measure-CLS'
import { measureFID } from './measure-FID'
import { FMPTiming } from './measure-FMP'
import { measureLongTask } from './measure-long-task'
import { openWhiteScreen } from './observe-whiteScreen'
import { reportResource } from './observe-load'
import { TYPES } from '../../../constants'

export const getWebVitals = (performanceConfig: any, lazyReport: any) => {
  const measuresToExecute = Object.keys(performanceConfig).filter(
    (key) => performanceConfig[key as keyof typeof performanceConfig] != false
  )

  measuresToExecute.forEach((measureKey) => {
    switch (measureKey) {
      case 'TTFB':
        measureTTFB((res) => lazyReport(TYPES.PERFORMANCE, res))
        break
      case 'FP':
        measureFP((res) => lazyReport(TYPES.PERFORMANCE, res))
        break
      case 'FCP':
        measureFCP((res) => lazyReport(TYPES.PERFORMANCE, res))
        break
      case 'LCP':
        measureLCP((res) => lazyReport(TYPES.PERFORMANCE, res))
        break
      case 'CLS':
        measureCLS((res) => lazyReport(TYPES.PERFORMANCE, res))
        break
      case 'FID':
        measureFID((res) => lazyReport(TYPES.PERFORMANCE, res))
        break
      case 'FMP':
        new FMPTiming((res) => lazyReport(TYPES.PERFORMANCE, res))
        break
      case 'longTask':
        measureLongTask((res) => lazyReport(TYPES.PERFORMANCE, res))
        break
      case 'whiteScreen':
        openWhiteScreen((res) => lazyReport(TYPES.PERFORMANCE, res), {
          skeletonProject: performanceConfig.skeletonProject || 'false',
          whiteBoxElements: performanceConfig.skeletonProject || [
            'html',
            'body',
            '#app',
            '#root'
          ]
        })
        break
      case 'resourceList':
        reportResource((res) => lazyReport(TYPES.PERFORMANCE, res))
        break
    }
  })
}
