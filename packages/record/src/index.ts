import { TYPES } from '../../utils/src/constants'
import { IRecordPlugin } from '../../core/src/types'
import { _Monitor, generateUniqueId } from '../../utils'
import { recordScreen } from './core'

export default class recordPlugin {
  recordScreentime = 10 // 默认录屏时长
  recordScreenTypeList: string[] = [TYPES.ERROR] // 录屏事件集合

  constructor(options: IRecordPlugin) {
    const { recordScreenTypeList, recordScreentime } = options
    this.recordScreenTypeList = recordScreenTypeList || [TYPES.ERROR]
    this.recordScreentime = recordScreentime || 10
  }

  core({ reportData, options }: any) {
    options.recordConfig.recordScreen = true
    options.recordConfig.recordScreenTypeList = this.recordScreenTypeList
    _Monitor.recordScreenId = generateUniqueId('record', Date.now())
    recordScreen(reportData, this.recordScreentime)
  }
}
