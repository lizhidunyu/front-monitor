#### 更新中...

### 安装

```javascript
npm i @front-monitor/core
npm i @front-monitor/performance
npm i @front-monitor/record
```

### 引入

```javascript
import Monitor from '@front-monitor/core' //核心模块
import performancePlugin from '@front-monitor/performance' //性能监控模块
import recordPlugin from '@front-monitor/record' //录屏模块

const monitor = new Monitor()

// 初始化
monitor.init({
  url: 'http://localhost:8000/report',
  appId: '',
  userId: '',
  autoTracker: false, //是否使用无痕埋点
  skeletonProject: false, // 是否属于骨架屏
  whiteBoxElements: [], // 白屏检测的容器列表
  maxCacheEventsNum: 10,
  filterXhrUrlRegExp: '', // 过滤的接口请求正则
  handleHttpStatus: null, // 用户设置handleHttpStatus函数来判断接口是否正确
  beforePushCache: null,
  whiteScreen: true,
  skeletonProject: false,
  whiteBoxElements: ['html', 'body', '#app', '#root']
  // 上报配置
  reportConfig: {
    isImgReport: false, // 是否采用图片上报
    isImmediate: false // 是否延迟上报
  },
})
// 引入性能监控插件，支持自定义性能监控列表
monitor.use(performancePlugin,{
  performanceConfig: {
    TTFB: true, // 支持自定义监视的性能列表
    CLS: true,
    FCP: true,
    FID: true,
    FP: true,
    LCP: true,
    longTask: true,
    FMP: true,
    resourceList: true,

  },
})
// 引入录屏插件，支持自定义录屏时长
monitor.use(recordPlugin,{
 //录屏配置
  recordConfig: {
    recordScreentime: 10,
    recordScreenTypeList: ['error']
  }
})
```

### Vue2引入插件

```javascript
Vue.use(monitor)
```

### Vue3引入插件

```javascript
const app = createApp(App)
app.use(monitor)
```

### React引入插件

```javascript
monitor.init()
monitor.use(performancePlugin)
monitor.use(recordPlugin)
```

### 体验

```javascript
// test/demo 启动项目
npm run start

// test/server 上报数据
npm run serve

```
