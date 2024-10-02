import { config } from '../core/config'
// TODO:可以设置不同的类型，不同的类型对应不同的枚举info

export const lazyReport = (type: string, infos: any) => {
  // TODO:补充数据类型
  const reportParams = {
    ...config,
    type,
    data: infos, // 上报的数据信息
    currentTime: new Date().getTime(), // 时间戳
    currentPage: window.location.href, // 当前页面
    ua: navigator.userAgent //ua信息
  }

  const reportParamsStr = JSON.stringify(reportParams)
  //   cacheData(reportParamsStr)

  console.log('****', type, infos)
}
