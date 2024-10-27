import { calculateFMP } from './calculateFMP'
import { throttleRequestAnimationFrame } from './throttleRequestAnimationFrame'
import { getDomLayoutScore } from './DOM'
import worker_script from './webWorker'

export interface FMPRecodeData {
  time: number
  domScore: number
}

interface FMPOptions {
  exact?: boolean
}

export const createFMPMonitor = (options: FMPOptions) => {
  const MutationObserver = window.MutationObserver

  if (!MutationObserver) {
    return
  }
  const startTime = performance.timing.navigationStart

  const scoredData: FMPRecodeData[] = []

  const observeFMP = () => {
    const callback = throttleRequestAnimationFrame(() => {
      const bodyScore = getDomLayoutScore(
        document.body,
        1,
        false,
        options?.exact
      )
      scoredData.push({
        domScore: bodyScore,
        time: Date.now() - startTime
      })
    })

    const observer = new MutationObserver(() => {
      if (callback) callback.runCallback()
    })

    observer.observe(document.body, {
      subtree: true,
      childList: true
    })

    return observer
  }

  const observer = observeFMP()

  const reportData = () => {
    if (window.Worker) {
      const worker = new Worker(worker_script)
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
    }, 1000)
  }
}

// createFMPMonitor函数：这是主函数，用于创建FMP监控器。
// 参数：接收一个FMPOptions对象作为参数。
// 检查MutationObserver：首先检查MutationObserver是否可用，不可用则直接返回。MutationObserver用于观察DOM变动。
// 初始化：记录页面导航开始的时间startTime，并初始化一个数组scoredData用于存储记录的数据。
// observeFMP函数：定义了一个函数来设置MutationObserver，并使用throttleRequestAnimationFrame来优化性能。每当DOM变动时，会计算当前DOM的布局得分，并记录下来。
// 报告数据：reportData函数用于计算和报告FMP时间。如果支持Web Worker，它会将计算任务交给Web Worker执行，以避免阻塞主线程。计算结果会通过控制台输出。如果不支持Web Worker，则直接在主线程计算并输出。
// 监听onload事件：在页面加载完成后（onload事件触发），延时1秒后调用reportData函数来报告FMP时间。这是因为FMP通常发生在页面加载的后期，延时可以确保捕获到更准确的FMP时间。
// Web Worker的使用：如果浏览器支持Web Worker，代码会创建一个新的Worker实例，并将记录的数据发送给Worker进行FMP计算。这样可以利用Web Worker的并行处理能力，避免在主线程上执行计算密集型任务，从而提高页面的响应性和性能。
