import { IReportData, IPageChangeData } from '../../types'
import { lazyReport } from '../../utils'

class PageChangeTracker {
  private beforeTime
  private beforePage
  private stayTime
  constructor() {
    this.beforeTime = Date.now() // 进入页面的时间
    this.beforePage = '' //上一个页面
    this.stayTime = 0 // 停留时间
  }

  getStayTime() {
    let curTime = Date.now()
    let stayTime = curTime - this.beforeTime
    this.beforeTime = curTime
    this.stayTime = stayTime
  }

  listenandReport() {
    const currentPage = window.location.href
    const reportData: IPageChangeData = {
      subType: 'pageChange',
      stayTime: this.stayTime,
      page: this.beforePage
    }
    lazyReport('behavior', reportData as IReportData)
    this.beforePage = currentPage
  }
}

// history模式
export function historyPageTrackerReport() {
  const tracker = new PageChangeTracker()
  ;['load', 'unload', 'popState', 'pushState'].forEach((item) => {
    window.addEventListener(item, function () {
      tracker.listenandReport()
    })
  })
}

// hash模式
export function hashPageTrackerReport() {
  const tracker = new PageChangeTracker()
  window.addEventListener('hashchange', function () {
    tracker.listenandReport()
  })
}
