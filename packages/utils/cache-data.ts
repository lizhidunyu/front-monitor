import { IReportData } from '../types'

export class CacheData {
  private cacheStore
  constructor() {
    this.cacheStore = new Map()
  }

  addCache(type: string, data: IReportData) {
    this.cacheStore.set(
      type,
      this.cacheStore.get(type) ? [...this.cacheStore.get(type), data] : [data]
    )
  }

  getCache() {
    const cacheArr: any[] = []
    for (const [key, value] of this.cacheStore) {
      for (const item of value) {
        cacheArr.push([key, item])
      }
    }
    return cacheArr
  }

  length() {
    return this.getCache()?.length
  }

  clearCache() {
    this.cacheStore = new Map()
  }
}
