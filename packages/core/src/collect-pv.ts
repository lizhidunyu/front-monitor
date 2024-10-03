/**
 * @description: 收集页面的pv数据
 */

import { lazyReport } from '../../utils'
import { IReportData, IPVData } from '../../types'

export function getPV() {
  const reportData: IPVData = {
    subType: 'pv'
  }
  lazyReport('business', reportData as IReportData)
}
