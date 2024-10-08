import React from 'react'
import { Button } from 'antd'
import Monitor from '@front-monitor/core'
import { PerformancePlugin } from '@front-monitor/performance'
// import { performancePlugin } from '@front-monitor/performance'
console.log(123)
const monitor = new Monitor({
  config: {
    userId: '123',
    url: 'http://localhost:8000/report'
    // reportConfig: { isImgReport: true },
  }
})

monitor.init()
new PerformancePlugin({
  // TTFB: true,
  // CLS: true,
  // FCP: true,
  // FID: true,
  // FP: true,
  // LCP: true,
  // longTask: true,
  // FMP: true
})

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
        monitor.handleCustomError({
          message: 'Oops something went wrong',
          error: '未知错误',
          errorType: 'jsError'
        })
        e.stopPropagation()
      }}
    >
      自定义错误
    </Button>
  </div>
)

export default App
