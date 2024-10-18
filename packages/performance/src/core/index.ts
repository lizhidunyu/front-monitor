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
import { TYPES } from '../../../utils/src/constants'

export const getWebVitals = (performanceConfig: any, reportData: any) => {
  const measuresToExecute = Object.keys(performanceConfig).filter(
    (key) => performanceConfig[key as keyof typeof performanceConfig] != false
  )

  measuresToExecute.forEach((measureKey) => {
    switch (measureKey) {
      case 'TTFB':
        measureTTFB((res) => reportData.send(TYPES.PERFORMANCE, res))
        break
      case 'FP':
        measureFP((res) => reportData.send(TYPES.PERFORMANCE, res))
        break
      case 'FCP':
        measureFCP((res) => reportData.send(TYPES.PERFORMANCE, res))
        break
      case 'LCP':
        measureLCP((res) => reportData.send(TYPES.PERFORMANCE, res))
        break
      case 'CLS':
        measureCLS((res) => reportData.send(TYPES.PERFORMANCE, res))
        break
      case 'FID':
        measureFID((res) => reportData.send(TYPES.PERFORMANCE, res))
        break
      case 'FMP':
        new FMPTiming((res) => reportData.send(TYPES.PERFORMANCE, res))
        break
      case 'longTask':
        measureLongTask((res) => reportData.send(TYPES.PERFORMANCE, res))
        break
      case 'whiteScreen':
        openWhiteScreen((res) => reportData.send(TYPES.PERFORMANCE, res), {
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
        reportResource((res) => reportData.send(TYPES.PERFORMANCE, res))
        break
    }
  })
}
