import { IPerformanceOptions } from '../types'
import {
  measureTTFB,
  measureCLS,
  measureFCP,
  measureFID,
  measureFP,
  measureLCP,
  measureLongTask,
  FMPTiming
} from './src'

export class PerformancePlugin {
  private options: IPerformanceOptions
  constructor(options: IPerformanceOptions) {
    this.options = options
    this.install(this.options)
  }

  install(options: IPerformanceOptions) {
    const {
      TTFB = true,
      CLS = true,
      FCP = true,
      FID = true,
      FP = true,
      LCP = true,
      longTask = true,
      FMP = true
    } = options
    if (TTFB) {
      measureTTFB()
    }
    if (CLS) {
      measureCLS()
    }
    if (FCP) {
      measureFCP()
    }
    if (FID) {
      measureFID()
    }
    if (FP) {
      measureFP()
    }
    if (LCP) {
      measureLCP()
    }
    if (longTask) {
      measureLongTask()
    }
    if (FMP) {
      new FMPTiming().fmpTiming
    }
  }
}
