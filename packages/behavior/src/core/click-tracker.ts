import { TYPES } from '@/utils/src/constants'
import {
  IClickEventData,
  IReportData,
  ICustomClickOptions
} from '../../../types'
import { reportData } from '../../../utils'
import { getPathTo } from '../utils'

// 手动上报
export function customTrackerClick(options: ICustomClickOptions) {
  const { type: subType, message } = options
  const data: IClickEventData = {
    subType: subType,
    data: message
  }
  reportData.send(TYPES.BEHAVIOR, data as IReportData)
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

      const data: IClickEventData = {
        subType: 'click',
        data: target || getPathTo(clickDOM as HTMLElement)
      }
      reportData.send(TYPES.BEHAVIOR, data as IReportData)
    },
    false
  )
}
