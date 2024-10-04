import { IClickEventData, IReportData, ICustomClickOptions } from '../../types'
import { lazyReport } from '../../utils'
import { getPathTo } from '../utils'

// 手动上报
export function customTrackerClick(options: ICustomClickOptions) {
  const { type: subType, message } = options
  const reportData: IClickEventData = {
    subType: subType,
    data: message
  }
  lazyReport('behavior', reportData as IReportData)
}

// 自动上报
export function autoTrackerClick() {
  document.body.addEventListener(
    'click',
    function (e) {
      const clickDOM: EventTarget | null = e.target
      // 获取标签上的data-target属性的值
      let target = (clickDOM as HTMLElement)?.getAttribute('data-target')
      // 获取标签上的data-no属性的值
      let hasTagNo = (clickDOM as HTMLElement)?.getAttribute('data-no')

      if (hasTagNo) {
        return
      }

      const reportData: IClickEventData = {
        subType: 'click',
        data: target || getPathTo(clickDOM as HTMLElement)
      }
      lazyReport('behavior', reportData as IReportData)
    },
    false
  )
}
