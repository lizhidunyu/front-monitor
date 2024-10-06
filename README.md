### 安装

```
<<<<<<< HEAD
import Monitor from "@front-monitor/core"; //核心模块
import { performancePlugin } from "@front-monitor/performance"; //性能监控模块
```

### 引入
=======
import Monitor from "front-monitor"; 
import { performancePlugin } from "monitor-performance";
```

###  引入 
>>>>>>> 5ef1eccdc729a49c551a3689d5d9949a781efb43

```
const monitor = new Monitor({
  config: {
    userId: "123",
<<<<<<< HEAD
    appId:'',
    url: "http://localhost:8000/login",
    autoTracker: false // 是否使用无痕埋点, 默认是false
    reportConfig: // 上报方式配置
      {
        isImgReport: false,  //  是否使用图片上报
        isImmediate: false // 是否立即上报
    },
  },
});

// 初始化
monitor.init();
// 引入性能监控插件，支持自定义性能监控列表
monitor.observePerformance({ TTFB: true });
```
=======
    url: "http://localhost:8000/login",
    reportConfig: { isImgReport: true },
  },
});

monitor.init();
monitor.observePerformance({ TTFB: true });
```

>>>>>>> 5ef1eccdc729a49c551a3689d5d9949a781efb43
