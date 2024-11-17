import { Callback } from '../../../../utils/src/types'
import { ERROR_TYPE, STATUS_CODE } from '../../../../utils/src/constants'
import { _Monitor } from '../../../../utils'
import { notify } from '../../utils/subscribe'

export function openWhiteScreen(
  callback: Callback,
  { skeletonProject, whiteBoxElements }: any
) {
  let _whiteLoopNum = 0
  const _skeletonInitList: any = [] // 存储初次采样点
  let _skeletonNowList: any = [] // 存储当前采样点

  //项目有骨架屏
  if (skeletonProject) {
    if (document.readyState != 'complete') {
      idleCallback()
    }
  } else {
    // 页面加载完毕
    if (document.readyState === 'complete') {
      idleCallback()
    } else {
      window.addEventListener('load', idleCallback)
    }
  }

  // 选中dom点的名称
  function getSelector(element: any) {
    if (element.id) {
      return '#' + element.id
    } else if (element.className) {
      return (
        '.' +
        element.className
          .split(' ')
          .filter((item: any) => !!item)
          .join('.')
      )
    } else {
      return element.nodeName.toLowerCase()
    }
  }

  // 判断采样点是否为容器节点
  function isContainer(element: HTMLElement) {
    const selector = getSelector(element)
    if (skeletonProject) {
      _whiteLoopNum
        ? _skeletonNowList.push(selector)
        : _skeletonInitList.push(selector)
    }
    return whiteBoxElements?.indexOf(selector) != -1
  }

  // 采样对比
  function sampling() {
    let emptyPoints = 0
    for (let i = 1; i <= 9; i++) {
      const xElements = document.elementsFromPoint(
        (window.innerWidth * i) / 10,
        window.innerHeight / 2
      )
      const yElements = document.elementsFromPoint(
        window.innerWidth / 2,
        (window.innerHeight * i) / 10
      )
      if (isContainer(xElements[0] as HTMLElement)) emptyPoints++
      // 中心点只计算一次
      if (i != 5) {
        if (isContainer(yElements[0] as HTMLElement)) emptyPoints++
      }

      console.log('xElements:', xElements, 'yElements', yElements)
    }

    console.log('_skeletonInitList', _skeletonInitList, _skeletonNowList)

    // 页面正常渲染，停止轮训
    if (emptyPoints != 17) {
      if (skeletonProject) {
        // 第一次不比较
        if (!_whiteLoopNum) return openWhiteLoop()
        // 比较前后dom是否一致
        if (_skeletonNowList.join() == _skeletonInitList.join())
          return callback({
            status: STATUS_CODE.ERROR
          })
      }
      if (_Monitor.loopTimer) {
        clearTimeout(_Monitor._loopTimer)
        _Monitor._loopTimer = null
      }
    } else {
      // 开启轮训
      if (!_Monitor._loopTimer) {
        openWhiteLoop()
      }
    }
    // 17个点都是容器节点算作白屏
    callback({
      status: emptyPoints == 17 ? STATUS_CODE.ERROR : STATUS_CODE.OK
    })
  }

  // 开启白屏轮训
  function openWhiteLoop(): void {
    if (_Monitor.loopTimer) return
    _Monitor.loopTimer = setInterval(() => {
      if (skeletonProject) {
        _whiteLoopNum++
        _skeletonNowList = []
      }
      idleCallback()
    }, 1000)
  }

  function idleCallback() {
    if ('requestIdleCallback' in window) {
      requestIdleCallback((deadline) => {
        // timeRemaining：表示当前空闲时间的剩余时间
        if (deadline.timeRemaining() > 0) {
          sampling()
        }
      })
    } else {
      sampling()
    }
  }
}

export const whiteScreen = (): void => {
  notify(ERROR_TYPE.WHITESCREEN_ERROE)
}
