export const _Monitor = getGlobalMonitor()

export function getGlobalMonitor() {
  ;(window as unknown as any)._Monitor = (window as unknown as any)
    ._Monitor || {
    hasError: false,
    vue: null,
    react: null,
    recordScreenId: null
  }
  return (window as unknown as any)._Monitor
}
