import React from 'react'
import { Button, Breadcrumb, Skeleton } from 'antd'
import { Monitor } from '@front-monitor/core'
import PerformancePlugin from '@front-monitor/performance'
// import recordPlugin from '@front-monitor/record'

const monitor = new Monitor({
  userId: '123',
  url: 'http://localhost:8000/report',
  appKey: '11',
  skeletonProject: true,
  repeatCodeError: true,
  handleHttpStatus(data) {
    let { status } = data
    return status !== 404 ? true : false
  }
  // reportConfig: { isImgReport: true }
})

monitor.init()
monitor.use(PerformancePlugin)

const App = () => (
  <div className="App">
    <Button
      type="primary"
      style={{ marginRight: '10px' }}
      onClick={(e) => {
        const a = undefined
        console.log(a.length)
      }}
    >
      JS错误
    </Button>
    <Button
      type="primary"
      style={{ marginRight: '10px' }}
      onClick={(e) => {
        setTimeout(() => {
          let a = undefined
          console.log(a.length)
        }, 1000)
      }}
    >
      异步错误
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
      style={{ marginRight: '10px' }}
      onClick={(e) => {
        fetch('http://localhost:8000/repor').then((res) => {
          console.log(res)
        })
      }}
    >
      HTTP错误
    </Button>
    <Button
      type="primary"
      style={{ marginRight: '10px' }}
      onClick={(e) => {
        const img = new Image()
        img.src = '/path/to/nonexistent-image.jpg'
        document.head.appendChild(img)
      }}
    >
      资源错误
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
    <Breadcrumb
      items={[
        {
          title: <a href="#home">Home</a>
        },
        {
          title: <a href="#center">Application Center</a>
        },
        {
          title: <a href="#list">Application List</a>
        },
        {
          title: <a href="#app">An Application</a>
        }
      ]}
    />
    <Skeleton />
  </div>
)

// setTimeout(() => {
//   Promise.reject('error-123')
// }, 5000)
export default App
