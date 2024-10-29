/**
 * @description: 在监听器触发，回调函数的时候传递的数据类型
 */
import { BEHAVIOR_TYPE, ERROR_TYPE } from '../../../utils/src/constants'
import { Callback } from './error'

// 代理事件的类型
export interface ReplaceHandler {
  type: ERROR_TYPE | BEHAVIOR_TYPE
  callback: Callback
}

// window.addEventlistener
export interface ErrorTarget {
  target?: {
    localName?: string
  }
  error?: any
  message?: string
}

// hash / history
export interface RouteHistory {
  from: string
  to: string
}

// xhr / fetch
export interface HttpData {
  type?: string
  method?: string
  time: number
  url: string // 接口地址
  elapsedTime: number // 接口时长
  message: string // 接口信息
  Status?: number // 接口状态编码
  status?: string // 接口状态
  requestData?: {
    httpType: string // 请求类型 xhr fetch
    method: string // 请求方式
    data: any
  }
  response?: {
    Status: number // 接口状态
    data?: any
  }
}
