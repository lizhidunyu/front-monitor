import { SubType } from '../common'

export interface IRecordData {
  subType?: SubType
  recordScreenId?: number
  time?: number | string
  events?: string
}
