import { SubType } from '../common'

export interface IRecordData {
  subType?: SubType
  recordScreenId?: number
  time?: number | string
  events?: string
}

// 录屏插件配置的数据
export interface ICustomRecordOptions {
  recordScreentime?: number
  recordScreenTypeList?: any[]
}
