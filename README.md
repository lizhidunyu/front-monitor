### 安装

```
import Monitor from "front-monitor"; 
import { performancePlugin } from "monitor-performance";
```

###  引入 

```
const monitor = new Monitor({
  config: {
    userId: "123",
    url: "http://localhost:8000/login",
    reportConfig: { isImgReport: true },
  },
});

monitor.init();
monitor.observePerformance({ TTFB: true });
```

