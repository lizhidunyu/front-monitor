import { Callback } from '../../types'

export class Queue {
  private stack: any[] = []
  private isFlushing = false

  constructor() {}
  addFn(fn: Callback): void {
    // 如果api不支持，立即上报
    if (!('requestIdleCallback' in window || 'Promise' in window)) {
      fn()
      return
    }
    this.stack.push(fn())
    if (!this.isFlushing) {
      this.isFlushing = true
      // 优先使用requestIdleCallback
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => this.flushStack())
      } else {
        // 其次使用微任务上报
        Promise.resolve().then(() => this.flushStack())
      }
    }
  }
  clear() {
    this.stack = []
  }
  getStack() {
    return this.stack
  }
  flushStack(): void {
    const flushStack = this.stack.slice(0)
    this.stack = []
    this.isFlushing = false
    for (let i = 0; i < flushStack.length; i++) {
      flushStack[i]()
    }
  }
}
