import { BEHAVIOR_TYPE, ERROR_TYPE, STATUS_CODE } from '@/utils/src/constants'

// 用户行为类型
export enum CACHEEVENTTYPES {
  HTTP = 'http',
  CLICK = 'click',
  RESOURCE = 'resource',
  CODEERROR = 'codeError',
  ROUTE = 'route',
  CUSTOM = 'custom'
}

// 存放用户行为数据
export interface ICacheEventData {
  type: ERROR_TYPE | BEHAVIOR_TYPE //事件类型
  category: CACHEEVENTTYPES // 用户行为类型
  status: STATUS_CODE // 行为状态
  time: number // 发生时间
  data: any
}
