import React from 'react'
import { Button } from 'antd'
import { Monitor } from '@front-monitor/core'
import PerformancePlugin from '@front-monitor/performance'
// import recordPlugin from '@front-monitor/record'
// console.log(Monitor.init())

const monitor = new Monitor({
  userId: '123',
  url: 'http://localhost:8000/report',
  appKey: '11',
  reportConfig: { isImgReport: true }
})

monitor.init()
monitor.use(PerformancePlugin, {
  performanceConfig: {
    TTFB: true, // 支持自定义监视的性能列表
    CLS: true,
    FCP: true,
    FID: true,
    FP: true,
    LCP: true,
    longTask: true,
    FMP: true,
    resourceList: true
  }
})
// monitor.use(recordPlugin, {
//   recordConfig: {
//     recordScreentime: 10, // 默认录屏时长
//     recordScreenTypeList: []
//   }
// })

const App = () => (
  <div className="App">
    <Button
      type="primary"
      style={{ marginRight: '10px' }}
      onClick={(e) => {
        var script = document.createElement('script')
        script.src = 'nonexistent.js'
        document.head.appendChild(script)
      }}
    >
      资源加载错误
    </Button>
    <Button
      type="primary"
      style={{ marginRight: '10px' }}
      onClick={(e) => {
        Promise.reject('error-123')
      }}
    >
      promise错误
    </Button>

    <Button
      type="primary"
      onClick={(e) => {
        // monitor.handleCustomError({
        //   message: 'Oops something went wrong',
        //   error: '未知错误',
        //   errorType: 'jsError'
        // })
        // e.stopPropagation()
      }}
    >
      自定义错误
    </Button>
  </div>
)

export default App
