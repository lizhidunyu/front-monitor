import { SubType } from '@/utils/src/types'

export interface IRecordData {
  subType?: SubType
  recordScreenId?: number
  time?: number | string
  events?: string
}
