'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.calcuTTFB = void 0
const utils_1 = require('../../utils')
const constants_1 = require('../constants')
const calcuTTFB = () => {
  const entryHandler = (list) => {
    const entries = list.getEntries()
    let ttfbValue
    entries.forEach((entry) => {
      if (entry.entryType === 'navigation') {
        const navigationEntry = entry
        ttfbValue = navigationEntry.responseStart - navigationEntry.requestStart
        const reportData = {
          subType: 'TTFB',
          value: ttfbValue,
          rating:
            ttfbValue <= constants_1.TTFB_RANGE.PRETTY
              ? 'good'
              : ttfbValue <= constants_1.TTFB_RANGE.ACCEPTED
                ? 'normal'
                : 'bad'
        }
        ;(0, utils_1.lazyReport)('performance', reportData)
      }
    })
  }
  const observer = new PerformanceObserver(entryHandler)
  observer.observe({ type: 'navigation', buffered: true })
}
exports.calcuTTFB = calcuTTFB
