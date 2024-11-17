import { calculateFMP } from './calculateFMP'
import { throttleRequestAnimationFrame } from './throttleRequestAnimationFrame'
import { getDomLayoutScore } from './DOM'
import worker_script from './webWorker'
import { Callback } from '../../../../core/src/types/error'

export interface FMPRecodeData {
  time: number
  domScore: number
}

interface FMPOptions {
  exact?: boolean
}

export const createFMPMonitor = (options: FMPOptions, callbackFn: Callback) => {
  const MutationObserver = window.MutationObserver

  if (!MutationObserver) {
    return
  }
  const startTime = performance.timing.navigationStart

  const scoredData: FMPRecodeData[] = []

  const observeFMP = () => {
    const callback = throttleRequestAnimationFrame(() => {
      // 这里计算出bodyScore
      const bodyScore = getDomLayoutScore(
        document.body,
        1,
        false,
        options?.exact
      )
      // 放入scoredData
      scoredData.push({
        domScore: bodyScore,
        time: Date.now() - startTime
      })
    })

    const observer = new MutationObserver(() => {
      // 这里执行防抖逻辑
      if (callback) callback.runCallback()
    })

    observer.observe(document.body, {
      subtree: true,
      childList: true
    })

    return observer
  }

  const observer = observeFMP()

  // 这里是上报数据的逻辑，展示不管
  const reportData = () => {
    if (window.Worker) {
      const worker = new Worker(worker_script)
      console.log('scoredData:', scoredData)

      worker.postMessage({ scoredData })
      worker.onmessage = function (e) {
        console.log(`FMP:${e.data.time}ms`)
        worker.terminate()
      }
    } else {
      console.log(`FMP:${calculateFMP(scoredData)}ms`)
    }
    observer.disconnect()
  }

  // FMP 和 onload 事件并不密切相关，但它很可能在 onload 事件附近，所以我们延时一小段时间再报告
  window.onload = () => {
    setTimeout(() => {
      reportData()
      callbackFn()
    }, 1000)
  }
}
