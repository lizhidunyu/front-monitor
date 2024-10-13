import { TYPES } from '@/constants'
import { ICustomRecordOptions } from '../../types'
import { _Monitor, generateUniqueId } from '@/utils'
import { recordScreen } from './core'

export default class recordPlugin {
  recordScreentime = 10 // 默认录屏时长
  recordScreenTypeList: string[] = [TYPES.ERROR] // 录屏事件集合

  constructor(options: ICustomRecordOptions) {
    const { recordScreenTypeList, recordScreentime } = options
    this.recordScreenTypeList = recordScreenTypeList || [TYPES.ERROR]
    this.recordScreentime = recordScreentime || 10
  }

  core({ lazyReport, options }: any) {
    options.recordConfig.recordScreen = true
    options.recordConfig.recordScreenTypeList = this.recordScreenTypeList
    _Monitor.recordScreenId = generateUniqueId('record', Date.now())
    recordScreen(lazyReport, this.recordScreentime)
  }
}
