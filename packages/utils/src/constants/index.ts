export enum TYPES {
  BUSINESS = 'business',
  ERROR = 'error',
  PERFORMANCE = 'performance',
  BEHAVIOR = 'behavior',
  RECORD = 'record'
}

// export enum EVENTTYPES {
//   XHR = 'xhr',
//   FETCH = 'fetch',
//   CLICK = 'click',
//   HISTORY = 'history',
//   ERROR = 'error',
//   HASHCHANGE = 'hashchange',
//   UNHANDLEDREJECTION = 'unhandledrejection',
//   RESOURCE = 'resource',
//   WHITESCREEN = 'whiteScreen',
//   DOM = 'dom',
//   VUE = 'vue',
//   REACT = 'react',
//   CUSTOM = 'custom',
//   PERFORMANCE = 'performance',
//   RECORDSCREEN = 'recordScreen'
// }

export enum PROJECT_TYPE {
  VUE = 'Vue',
  REACT = 'React'
}

export enum ERROR_TYPE {
  JS_ERROR = 'jsError',
  PROMISE_ERROR = 'promiseError',
  RESOURCE_ERROR = 'resourceError',
  HTTP_ERROR = 'httpError',
  WHITESCREEN_ERROE = 'whitescreenError',
  XHR_ERROR = 'xhrError',
  FETCH_ERROR = 'fetchError'
}

export enum BUSINESS_TYPE {
  PV = 'pv',
  UV = 'uv'
}

export enum PERFORMANCE_TYPE {
  TTFB = 'TTFB',
  FP = 'FP',
  FCP = 'FCP',
  LCP = 'LCP',
  FID = 'FID',
  CLS = 'CLS',
  LONG_TASK = 'longTask',
  FMP = 'FMP',
  RESOURCE_LIST = 'resourceList'
}

export enum BEHAVIOR_TYPE {
  CLICK = 'click',
  HASH_CHANGE = 'hashChange',
  HISTORY_CHANGE = 'historyChange'
}

// 录屏相关
export enum RECORD_TYPE {
  RECORD_SCREEN = 'recordScreen'
}

export enum STATUS_CODE {
  ERROR = 'error',
  OK = 'ok'
}

/** 接口请求相关的常量 */
export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401
}

export enum HTTPTYPE {
  XHR = 'xhr',
  FETCH = 'fetch'
}

export enum EMethods {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE'
}

export interface ResourceTarget {
  src?: string
  href?: string
  localName?: string
}
