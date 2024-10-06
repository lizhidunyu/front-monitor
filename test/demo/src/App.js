import React from 'react'
import { Button } from 'antd'
import Monitor from '@front-monitor/core'
import { performancePlugin } from '@front-monitor/performance'

const monitor = new Monitor({
  config: {
    userId: '123',
    url: 'http://localhost:3000'
    // reportConfig: { isImgReport: true },
  }
})

monitor.init()

monitor.observePerformance({ TTFB: true })

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
