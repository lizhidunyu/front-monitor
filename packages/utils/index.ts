export { Queue } from './src/core/queue'
export { CacheEvents } from '../core/src/utils/cache-events'
export { reportData } from './src/core/report'
export {
  generateUniqueId,
  isSupportSendBeacon,
  originalOpen,
  originalSend,
  getLocationHref,
  getTimestamp
} from './src/core/core'
export { _Monitor, getGlobalMonitor, setFlag, getFlag } from './src/core/global'
export { getErrorUid, hashMapExist } from './src/core/unique-error'
