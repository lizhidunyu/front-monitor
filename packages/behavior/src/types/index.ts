import { SubType } from '../common'

// 点击事件上报的data数据
export interface IClickEventData {
  subType?: SubType
  data?: any
}

export interface IPageChangeData {
  subType?: SubType
  stayTime?: string | number
  page?: string
}

export type CustomType = any

// 用户自定义需要上报的性能指标
export interface ICustomClickOptions {
  type?: CustomType
  message?: any
}
