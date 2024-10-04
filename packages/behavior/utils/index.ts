/** 无痕埋点：返回 XPath: 表示该元素在整个文档中的唯一位置**/
export const getPathTo = (element: HTMLElement): any => {
  // 1.根据id定位元素xpath路径
  if (element.id !== '') {
    return `//*[@id=${element.id}]`
  }
  // 2.body元素
  if (element === document.body) {
    return element.tagName
  }
  // 3.递归构建xpath
  let ix = 0
  let siblings = element?.parentNode?.childNodes //当前元素的父元素的所有子节点
  if (siblings) {
    for (let i = 0; i < siblings.length; i++) {
      let sibling = siblings[i]
      //   如果当前的 sibling 等于 element，表示找到了目标元素
      if (sibling === element) {
        return `${getPathTo(element.parentNode as HTMLElement)}/${element.tagName}[${ix + 1}]`
      }
      if (
        sibling.nodeType === 1 &&
        (sibling as HTMLElement).tagName === element.tagName
      ) {
        ix++
      }
    }
  }
}

/** 重写pushState和popState方法 **/
export const modifyHistoryEvent = (name: string) => {
  const originMethod = (window.history as any)[name]
  if (name === 'replaceState') {
    // @ts-ignore
    const { current } = event
    const pathName = location.pathname
    if (current === pathName) {
      // @ts-ignore
      let res = originMethod.apply(this, arguments)
      return res
    }
  }
  // @ts-ignore
  let res = originMethod.apply(this, arguments)
  let e = new Event(name)
  // @ts-ignore
  e.arguments = arguments
  window.dispatchEvent(e)
  return res
}

window.history.pushState = modifyHistoryEvent('pushState')
window.history.replaceState = modifyHistoryEvent('replaceState')
