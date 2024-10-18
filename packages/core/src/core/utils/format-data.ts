import { HTTP_CODE, ResourceTarget, STATUS_CODE } from '@/utils/src/constants'
import { options } from '../config'
import { HttpData } from '../../types'
import { getTimestamp } from '@/utils'

// 处理接口的状态
export function httpTransform(data: HttpData): HttpData {
  let message: any = ''
  const {
    elapsedTime,
    time,
    method = '',
    type,
    Status = 200,
    response,
    requestData
  } = data
  let status: STATUS_CODE
  if (Status === 0) {
    status = STATUS_CODE.ERROR
    message =
      // todo: 用户提供接口的超时时间：接口配置的超时时间
      elapsedTime <= options.overTime * 1000
        ? `请求失败，Status值为:${Status}`
        : '请求失败，接口超时'
  } else if ((Status as number) < HTTP_CODE.BAD_REQUEST) {
    status = STATUS_CODE.OK
    if (
      options.handleHttpStatus &&
      typeof options.handleHttpStatus == 'function'
    ) {
      if (options.handleHttpStatus(data)) {
        status = STATUS_CODE.OK
      } else {
        status = STATUS_CODE.ERROR
        message = `接口报错，报错信息为：${
          typeof response == 'object' ? JSON.stringify(response) : response
        }`
      }
    }
  } else {
    status = STATUS_CODE.ERROR
    message = `请求失败`
  }
  message = `${data.url}; ${message}`
  return {
    url: data.url,
    time,
    status,
    elapsedTime,
    message,
    requestData: {
      httpType: type as string,
      method,
      data: requestData || ''
    },
    response: {
      Status,
      data: status == STATUS_CODE.ERROR ? response : null
    }
  }
}

// 处理资源加载失败的状态
export function resourceTransform(target: ResourceTarget): any {
  return {
    time: getTimestamp(),
    // TODO:这里的逻辑？
    message: '',
    //   (interceptStr(target.src as string, 120) ||
    //     interceptStr(target.href as string, 120)) + '; 资源加载失败',
    name: target.localName as string
  }
}
