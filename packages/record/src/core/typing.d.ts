// 声明 pako 模块
declare module 'pako' {
  export function gzip(data: string | Uint8Array, options?: object): Uint8Array
}

// 声明 js-base64 模块
declare module 'js-base64' {
  export class Base64 {
    static encode(input: string | number): string
    static btoa(input: string): string
  }
}
