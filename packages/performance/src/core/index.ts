/**
 * 1.FID: PerformanceObserver: first-input 100
 * 2.FCP: PerformanceObserver: first-contentful-paint 2500
 * 3.LCP: 同上
 * 4.CLS：三种方案：平均值 / 最大值 / 累加
 * 如果当前的会话和会话列表中第一条条目差5s, 最后一条差1s,那么就认为是一个会话，把结果累加在之前的信息里，否则认为是新的会话
 * 5.TTFB：监听load事件
 * 6.FSP:首屏加载时间：通过判断MutationObserver监听页面元素的变化，
 * 注意排除一些没有意义的标签，requestAnimationFrame循环监听dom的变化，当document.readyState === 'complete'时，停止监听
 * 拿到最长加载时间的元素,和performance.timing.navigationStart 页面的起始时间，求差就是首屏渲染时间
 * 7.资源加载+缓存率：transferSize === 0 || entry.encodedBodySize === 0
 */

import { measureTTFB } from './measure-TTFB'
import { measureFP } from './measure-FP'
import { measureFCP } from './measure-FCP'
import { measureLCP } from './measure-LCP'
import { measureCLS } from './measure-CLS'
import { measureFID } from './measure-FID'
import { FMPTiming } from './measure-FMP'
import { measureLongTask } from './measure-long-task'
import { reportResource } from './observe-load'
import { TYPES } from '../../../utils/src/constants'

export const getWebVitals = (performanceConfig: any, reportData: any) => {
  const measuresToExecute = Object.keys(performanceConfig).filter(
    (key) => performanceConfig[key as keyof typeof performanceConfig] != false
  )

  measuresToExecute.forEach((measureKey) => {
    switch (measureKey) {
      case 'TTFB':
        measureTTFB((res: any) => reportData.send(TYPES.PERFORMANCE, res))
        break
      case 'FP':
        measureFP((res: any) => reportData.send(TYPES.PERFORMANCE, res))
        break
      case 'FCP':
        measureFCP((res: any) => reportData.send(TYPES.PERFORMANCE, res))
        break
      case 'LCP':
        measureLCP((res: any) => reportData.send(TYPES.PERFORMANCE, res))
        break
      case 'CLS':
        measureCLS((res: any) => reportData.send(TYPES.PERFORMANCE, res))
        break
      case 'FID':
        measureFID((res: any) => reportData.send(TYPES.PERFORMANCE, res))
        break
      case 'FMP':
        new FMPTiming((res: any) => reportData.send(TYPES.PERFORMANCE, res))
        break
      case 'longTask':
        measureLongTask((res: any) => reportData.send(TYPES.PERFORMANCE, res))
        break
      case 'resourceList':
        reportResource((res: any) => reportData.send(TYPES.PERFORMANCE, res))
        break
    }
  })
}
