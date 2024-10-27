import React from 'react'
import { Button } from 'antd'
import Monitor from '@front-monitor/core'
import PerformancePlugin from '@front-monitor/performance'
// import { performancePlugin } from '@front-monitor/performance'
// console.log(Monitor.init())

// const monitor = new Monitor()

Monitor.init({
  userId: '123',
  dsn: 'http://localhost:8000/report',
  appKey: '11'
  // reportConfig: { isImgReport: true },
})
new PerformancePlugin()

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
