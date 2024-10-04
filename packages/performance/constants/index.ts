// TTFB
export const TTFB_RANGE = {
  PRETTY: 200,
  ACCEPTED: 500
}

// TCP
export const STANDARD_FCP = 1800

// LCP
export const STANDARD_LCP = 2500

// FMP
const navigationEntries: PerformanceNavigationTiming[] =
  performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]

export const START_TIME = navigationEntries[0].responseEnd
export const IGNORE_TAG_SET = ['SCRIPT', 'STYLE', 'META', 'HEAD', 'LINK']

export const TAG_WEIGHT_MAP = {
  SVG: 2,
  IMG: 2,
  CANVAS: 4,
  OBJECT: 4,
  EMBED: 4,
  VIDEO: 4
}

export const WW = window.innerWidth
export const WH = window.innerHeight
export const VIEWPORT_AREA = WW * WH
export const LIMIT = 1000
export const DELAY = 500

// FID
export const STANDARD_FID = 100

// CLS
export const STANDARD_CLS = 0.1
