import { calcuTTFB } from './src'

export function performancePlugin(options: any) {
  for (const key in options) {
    const val = options[key]
    if (val) {
      calcuTTFB()
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
