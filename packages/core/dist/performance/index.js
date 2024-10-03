'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.performancePlugin = performancePlugin
const src_1 = require('./src')
function performancePlugin(options) {
  for (const key in options) {
    const val = options[key]
    if (val) {
      ;(0, src_1.calcuTTFB)()
      console.log('213123')
      //   const functionName = `calcu${key}`
      //   functionName()
      //   // @ts-ignore
      // (typeof performanceLists[functionName] === 'function') {
      //     // @ts-ignore
      //     performanceLists[functionName]()
      //   } else   if {
      //     console.warn(
      //       `Function ${functionName} does not exist in performanceLists`
      //     )
      //   }
    }
  }
}
