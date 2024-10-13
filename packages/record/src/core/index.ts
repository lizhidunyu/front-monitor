import { _Monitor, generateUniqueId, lazyReport } from '../../../utils'
import { record } from 'rrweb'
import pako from 'pako'
import { Base64 } from 'js-base64'
import { IRecordData, IReportData } from '@/types'
import { RECORD_TYPE, TYPES } from '@/constants'

export function recordScreen(lazyReport: any, recordScreenTime: number) {
  let events: any[] = []
  record({
    emit(event, isCheckout) {
      if (isCheckout) {
        if (_Monitor.hasError) {
          const recordScreenId = _Monitor.recordScreenId
          _Monitor.recordScreenId = generateUniqueId('record', Date.now())
          const reportData: IRecordData = {
            subType: RECORD_TYPE.RECORD_SCREEN,
            recordScreenId,
            time: Date.now(),
            events: zip(events)
          }
          lazyReport(TYPES.RECORD, reportData as IReportData)
          events = []
          _Monitor.hasError = false
        } else {
          // 不上报，清空录屏
          events = []
          _Monitor.recordScreenId = generateUniqueId('record', Date.now())
        }
      }
      events.push(event)
    },
    recordCanvas: true,
    // 默认每10s重新制作快照
    checkoutEveryNms: 1000 * recordScreenTime
  })
}

function zip(data: any): string {
  if (!data) return data
  const dataJson =
    typeof data !== 'string' && typeof data !== 'number'
      ? JSON.stringify(data)
      : data
  const str = Base64.encode(dataJson)
  const binaryString = pako.gzip(str)
  const arr = Array.from(binaryString)
  let s = ''
  arr.forEach((item: any) => {
    s += String.fromCharCode(item)
  })
  return Base64.btoa(s)
}
