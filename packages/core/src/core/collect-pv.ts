/**
 * @description: 收集页面的pv数据
 */

import { reportData } from '../../../utils'
import { IReportData, IPVData } from '../../../types'

export function getPV() {
  const reportData: IPVData = {
    subType: 'pv'
  }
  reportData('business', reportData as IReportData)
}
