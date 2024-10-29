import { _Monitor, generateUniqueId, reportData } from '../../../utils'
import { record } from 'rrweb'
import pako from 'pako'
import { Base64 } from 'js-base64'
import { IReportData } from '../../../utils/src/types'
import { IRecordData } from '../types'
import { RECORD_TYPE, TYPES } from '../../../utils/src/constants'

export function recordScreen(reportData: any, recordScreenTime: number) {
  let events: any[] = []
  record({
    emit(event, isCheckout) {
      if (isCheckout) {
        if (_Monitor.hasError) {
          const recordScreenId = _Monitor.recordScreenId
          _Monitor.recordScreenId = generateUniqueId('record', Date.now())
          const data: IRecordData = {
            subType: RECORD_TYPE.RECORD_SCREEN,
            recordScreenId,
            time: Date.now(),
            events: zip(events)
          }
          reportData.send(TYPES.RECORD, data as IReportData)
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
