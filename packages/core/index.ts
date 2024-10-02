import { setConfig, config } from './config'
import { catchError } from './src/error-catch'

const monitor = {
  init(options = {}) {
    setConfig(options)
    catchError()
  }
}

export default monitor
