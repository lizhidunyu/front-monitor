import { getStyle } from '../utils/index'
import {
  START_TIME,
  IGNORE_TAG_SET,
  TAG_WEIGHT_MAP,
  WW,
  WH,
  VIEWPORT_AREA,
  LIMIT,
  DELAY
} from '../constants'
import { Callback } from '../../../utils/src/types'
import { IPerformanceData } from '../types'
import { PERFORMANCE_TYPE } from '../../../utils/src/constants'

export class FMPTiming {
  private statusCollector: any[]
  private flag: boolean
  private observer: MutationObserver | null
  private callbackCount: number
  private resourceMap: Record<string, any> = {}
  private callbackFn: Callback
  public fmpTiming: Number = 0

  constructor(callback: Callback) {
    this.statusCollector = []
    this.flag = true
    this.observer = null
    this.callbackCount = 1
    this.resourceMap = {}
    this.fmpTiming = 0
    this.initObserver()
    this.callbackFn = callback
  }

  // 记录在代码执行之前加载的元素的时间点，生成初次快照
  firstSnapshot() {
    // @ts-ignore
    let t = window.__DOMSTART - START_TIME
    let bodyTarget = document.body
    if (bodyTarget) {
      this.doTag(bodyTarget, this.callbackCount++)
    }
    this.statusCollector.push({
      t
    })
  }

  // body的元素进行深度遍历，进行打点，记录是在哪一次回调的时候记录的
  doTag(target: Element, callbackCount: number | string) {
    let tagName = target.tagName

    if (IGNORE_TAG_SET?.indexOf(tagName) === -1) {
      let childs = target?.children
      if (childs.length > 0) {
        for (let i = childs.length - 1; i >= 0; i--) {
          if (childs[i].getAttribute('f_c') === null) {
            childs[i].setAttribute('f_c', callbackCount as string)
          }
          this.doTag(childs[i], callbackCount)
        }
      }
    }
  }

  // 初始化监听
  initObserver() {
    this.firstSnapshot()
    this.observer = new MutationObserver(() => {
      let t = Date.now() - START_TIME
      let bodyTarget = document.body

      if (bodyTarget) {
        this.doTag(bodyTarget, this.callbackCount++)
      }
      this.statusCollector.push({
        t
      })
    })

    this.observer.observe(document, {
      childList: true,
      subtree: true
    })

    if (document.readyState === 'complete') {
      this.calFinallScore()
    } else {
      window.addEventListener(
        'load',
        () => {
          this.calFinallScore()
        },
        true
      )
    }
  }

  // 判断是否可以进行计算过程
  checkCanCalcu(start: number) {
    let ti = Date.now() - start
    return !(
      ti > LIMIT || // 如果监听的时间超过LIMIT
      ti - //或者发生回调的时间间隔已经超过1s中
        (this.statusCollector[this.statusCollector?.length - 1].t || 0) >
        1000
    )
  }

  initResourceMap() {
    performance.getEntries().forEach((item: any) => {
      this.resourceMap[item.name] = item?.responseEnd
    })
  }

  // 计算得分
  calFinallScore() {
    if (MutationObserver && this.flag) {
      // 认为页面已经稳定，停止dom元素加载的监听，开始进入计算过程
      if (!this.checkCanCalcu(START_TIME)) {
        ;(this.observer as MutationObserver).disconnect()

        this.flag = false
        let res = this.deepTraversal(document.body)

        let topScoreElement: any
        res.deepTravSubRes.forEach((item: any) => {
          if (!topScoreElement || item.score > topScoreElement.score) {
            topScoreElement = item
          }
        })

        this.initResourceMap()
        let resultSet = this.filterTheResultSet(topScoreElement.elementSet)
        let fmpTiming = this.calResult(resultSet)
        this.fmpTiming = fmpTiming
        this.report(this.fmpTiming)
      } else {
        setTimeout(() => {
          this.calFinallScore()
        }, DELAY)
      }
    }
  }

  report(data: Number) {
    const reportData: IPerformanceData = {
      subType: PERFORMANCE_TYPE.FMP,
      value: data as number
    }
    // reportData('performance', reportData as IReportData)
    this.callbackFn(reportData)
  }

  filterTheResultSet(elementSet: any[]) {
    let sum = 0
    elementSet.forEach((item) => {
      sum += item.score
    })

    // 对这个集合的得分取均值
    let avg = sum / elementSet.length

    //然后过滤出在平均分之上的元素集合，然后进行时间计算
    return elementSet.filter((item) => {
      return item.score > avg
    })
  }

  // "可视区域内得分最高的元素的集合"
  calResult(resultSet: any[]) {
    let renderTime = 0

    resultSet.forEach((item) => {
      let currentTime = 0
      if (item.weight === 1) {
        let index = +item.node.getAttribute('f_c') - 1
        currentTime = this.statusCollector[index].t
      } else if (item.weight === 2) {
        if (item.node.tagName === 'IMG') {
          currentTime = this.resourceMap[item.node.src]
        } else if (item.node.tagName === 'SVG') {
          let index = +item.node.getAttribute('f_c') - 1
          currentTime = this.statusCollector[index].t
        } else {
          //background image
          let match = getStyle(item.node, 'background-image').match(
            /url\(\"(.*?)\"\)/
          )

          let s
          if (match && match[1]) {
            s = match[1]
          }
          if (s.indexOf('http') == -1) {
            s = location.protocol + match[1]
          }
          currentTime = this.resourceMap[s]
        }
      } else if (item.weight === 4) {
        if (item.node.tagName === 'CANVAS') {
          let index = +item.node.getAttribute('f_c') - 1
          currentTime = this.statusCollector[index].t
        } else if (item.node.tagName === 'VIDEO') {
          currentTime = this.resourceMap[item.node.src]

          !currentTime && (currentTime = this.resourceMap[item.node.poster])
        }
      }

      console.log(currentTime, item.node)
      renderTime < currentTime && (renderTime = currentTime)
    })

    return renderTime
  }

  /**——————————————计算过程————————————————**/

  // 递归遍历 DOM 树
  deepTraversal(node: Element): any {
    if (!node) {
      return {}
    }
    const deepTravSubRes = [] // 存储子节点的结果
    // 遍历子节点
    for (const child of node.children) {
      const s = this.deepTraversal(child)
      if (s && s.score) {
        deepTravSubRes.push(s)
      }
    }
    return this.calScore(node, deepTravSubRes) // 计算当前节点的分数
  }

  // 计算当前节点的得分
  calScore(node: Element, deepTravSubRes: any[]) {
    let { width, height, left, top, bottom, right } =
      node.getBoundingClientRect() // 获取了元素的位置和大小
    let isVisible = 1 // 默认节点可见

    if (WH < top || WW < left) {
      isVisible = 0 //不在可视viewport中
    }

    let subNodeScore = 0
    deepTravSubRes.forEach((item) => {
      subNodeScore += item.score // 累加子节点的得分
    })

    const nodeTagName = node?.tagName
    let weight = (TAG_WEIGHT_MAP as unknown as any)?.[nodeTagName] || 1
    if (
      weight === 1 &&
      getStyle(node, 'background-image') &&
      getStyle(node, 'background-image') !== 'initial'
    ) {
      weight = TAG_WEIGHT_MAP['IMG'] //将有图片背景的普通元素 权重设置为img
    }
    let score = width * height * weight * isVisible // 计算当前节点的得分
    let elementSet = [{ node, score, weight }]
    let areaPercent = this.calAreaPercent(node) // 计算节点的可见面积比例

    // / 将元素的子元素得分之和与其得分进行比较，去较大值，记录得分元素集
    if (subNodeScore > score * areaPercent || areaPercent === 0) {
      score = subNodeScore
      elementSet = []

      deepTravSubRes.forEach((item) => {
        elementSet = elementSet.concat(item.elementSet)
      })
    }

    return {
      deepTravSubRes,
      score,
      elementSet
    }
  }

  // 计算元素位置占比
  calAreaPercent(node: Element) {
    let { left, right, top, bottom, width, height } =
      node.getBoundingClientRect()
    let wl = 0
    let wt = 0
    let wr = WW
    let wb = WH
    let overlapX =
      right - left + (wr - wl) - (Math.max(right, wr) - Math.min(left, wl))
    if (overlapX <= 0) {
      //x 轴无交点
      return 0
    }

    let overlapY =
      bottom - top + (wb - wt) - (Math.max(bottom, wb) - Math.min(top, wt))
    if (overlapY <= 0) {
      return 0
    }

    return (overlapX * overlapY) / (width * height) // 返回可见比例
  }
}
