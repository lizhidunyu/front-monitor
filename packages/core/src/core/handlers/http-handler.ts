// 1/错误、用户行为收集这个过程比较适用AOP面向切面编程，
// 其实就是在执行原本方法之前和之后插入一些代码，执行我们想要的收集数据，
// 例如http请求前收集数据，请求后再收集数据这样。

// 2.比如我们对于网络请求的xhr进行拦截，在发送网络请求之前可以判断当前的接口是不是我们需要过滤掉的接口
// 在返回数据的时候，根据用户传入的回调函数进行判断是不是错误，只有发生了错误才上报response等等

// 3.其实就是前置通知、后置通知、返回通知异常通知这样的一些内容。
// 主要是实现函数的重写，传入被重写的对象，key，以及以原有的函数作为参数，传入新的函数，是否进行重写等。

import { ERROR_TYPE } from '../../../../utils/src/constants'
import { isFilterHttpUrl } from '../../utils/add-replace-handler'
import { on, replaceAop } from '../../utils/helper'
import { reportData } from '../../../../utils'
import { notify } from '../../utils/subscribe'
import { Callback } from '../../types/error'
import { options } from '../config'

export const fetchReplace = (): void => {
  if (!('fetch' in window)) {
    return
  }
  // TODO： 比较fetch和xhr两种方式的区别
  replaceAop(window, ERROR_TYPE.FETCH_ERROR, (originalFetch) => {
    return (url: any, config: Partial<Request> = {}) => {
      const sTime = Date.now()
      const method = (config && config.method) || 'GET'
      let fetchData = {
        type: 'fetch',
        method,
        requestData: config && config.body,
        url,
        response: ''
      }
      // 获取配置的headers
      const headers = new Headers(config.headers || {})
      Object.assign(headers, {
        setRequestHeader: headers.set
      })
      config = Object.assign({}, config, headers)
      return originalFetch.apply(window, [url, config]).then(
        (res: any) => {
          // 克隆一份，防止被标记已消费
          // TODO?: res
          const tempRes = res.clone()
          const eTime = Date.now()
          fetchData = Object.assign({}, fetchData, {
            elapsedTime: eTime - sTime,
            Status: tempRes.status,
            time: sTime
          })
          tempRes.text().then((data: any) => {
            // 同理，进接口进行过滤
            if (
              (method === 'POST' && reportData.isSdkTransportUrl(url)) ||
              isFilterHttpUrl(url)
            )
              return
            // 用户设置handleHttpStatus函数来判断接口是否正确，只有接口报错时才保留response
            if (
              options.handleHttpStatus &&
              typeof options.handleHttpStatus == 'function'
            ) {
              fetchData.response = data
            }
            notify(ERROR_TYPE.FETCH_ERROR, fetchData)
          })
          return res
        },
        (err: any) => {
          const eTime = Date.now()
          if (
            (method === 'POST' && reportData.isSdkTransportUrl(url)) ||
            isFilterHttpUrl(url)
          )
            return
          fetchData = Object.assign({}, fetchData, {
            elapsedTime: eTime - sTime,
            status: 0,
            time: sTime
          })
          notify(ERROR_TYPE.FETCH_ERROR, fetchData)
          throw err
        }
      )
    }
  })
}

export const xhrReplace = (): void => {
  if (!('XMLHttpRequest' in window)) {
    return
  }
  const originalXhrProto = XMLHttpRequest.prototype
  // 传入originalXhrProto, 调用aop函数
  replaceAop(originalXhrProto, 'open', (originalOpen: Callback) => {
    // 拦截原有的xhr.open，并在this身上添加monitor_xhr属性
    return function (this: any, ...args: any[]): void {
      this.monitor_xhr = {
        method: typeof args[0] === 'string' ? args[0].toUpperCase() : args[0],
        url: args[1],
        sTime: Date.now(),
        type: ERROR_TYPE.XHR_ERROR
      }
      originalOpen.apply(this, args)
    }
  })
  replaceAop(originalXhrProto, 'send', (originalSend: Callback) => {
    return function (this: any, ...args: any[]): void {
      const { method, url } = this.monitor_xhr
      // 监听loadend事件，接口成功或失败都会执行
      on(this, 'loadend', function (this: any) {
        // NOTICE
        // isSdkTransportUrl 判断当前接口是否为上报的接口
        // isFilterHttpUrl 判断当前接口是否为需要过滤掉的接口
        if (
          (method === 'POST' && reportData.isSdkTransportUrl(url)) ||
          isFilterHttpUrl(url)
        ) {
          return
        }
        const { responseType, response, status } = this
        this.monitor_xhr.requestData = args[0]
        const eTime = Date.now()
        // 设置接口的time，用户行为按时间排序
        this.monitor_xhr.time = this.monitor_xhr.sTime
        this.monitor_xhr.Status = status
        // TODO: responseType都有哪些类型？
        if (['', 'json', 'text'].indexOf(responseType) !== -1) {
          // 用户设置handleHttpStatus函数来判断接口是否正确，只有接口报错时才保留response
          if (
            options.handleHttpStatus &&
            typeof options.handleHttpStatus == 'function'
          ) {
            this.monitor_xhr.response = response && JSON.parse(response)
          }
        }
        // 接口的执行时长
        this.monitor_xhr.elapsedTime = eTime - this.monitor_xhr.sTime
        // 执行之前注册的xhr回调函数
        notify(ERROR_TYPE.XHR_ERROR, this.websee_xhr)
      })
      originalSend.apply(this, args)
    }
  })
}
