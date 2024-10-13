export const getStyle = (element: Element, att: any) => {
  if (window.getComputedStyle) {
    return window.getComputedStyle(element)[att]
  } else {
    // 兼容处理
    // @ts-ignore
    return element.currentStyle[att]
  }
}
