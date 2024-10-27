// 用于在下次重绘之前调用指定的回调函数，以及取消之前的回调。如果这两个API不可用，函数将返回一个空字符串（虽然在实际应用中，可能更希望抛出一个错误或返回一个更明确的值）。
// 节流逻辑：
// 函数内部定义了一个rafTimer变量，用于存储requestAnimationFrame的返回值。这个返回值是一个非零的数字，表示回调函数的ID，可以用于取消回调。
// runCallback函数是实际执行节流逻辑的地方。它首先检查rafTimer是否存在（即之前是否已经调用了requestAnimationFrame）。如果存在，说明之前已经有一个回调被调度，但尚未执行。为了避免在同一个帧中多次执行回调（这是requestAnimationFrame的一个潜在问题，特别是当事件触发频率很高时），它会先使用cancelAnimationFrame取消之前的回调，然后重新调用requestAnimationFrame来调度新的回调。
// 如果rafTimer不存在，说明之前没有回调被调度，它就直接调用requestAnimationFrame来调度新的回调

export const throttleRequestAnimationFrame = (
  callback: FrameRequestCallback
) => {
  if (!window) {
    return ''
  }

  const { requestAnimationFrame: raf, cancelAnimationFrame: caf } = window

  if (!(typeof raf === 'function') || !(typeof caf === 'function')) {
    return ''
  }

  // raf 的返回值为非 0 数字
  let rafTimer: number = 0

  const runCallback = () => {
    if (rafTimer) {
      // requestAnimationFrame 不管理回调函数
      // 在回调被执行前，多次调用带有同一回调函数的 requestAnimationFrame，会导致回调在同一帧中执行多次
      // 常见的情况是一些事件机制导致多次触发
      // 设定一个 timer，如果接下来回调再次被调度，那么撤销上一个
      // https://www.w3.org/TR/animation-timing/#dom-windowanimationtiming-requestanimationframe
      caf(rafTimer)
      rafTimer = raf(callback)
    } else {
      rafTimer = raf(callback)
    }
  }

  const cancelCallback = () => {
    if (rafTimer) {
      caf(rafTimer)
    }
  }

  return {
    runCallback,
    cancelCallback
  }
}
