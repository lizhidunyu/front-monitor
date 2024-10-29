const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
// const json = require('@rollup/plugin-json')
const typescript = require('@rollup/plugin-typescript')
import alias from '@rollup/plugin-alias'
const fs = require('fs')
const path = require('path')
const packagesDir = path.resolve(__dirname, 'packages')
const packageFiles = fs
  .readdirSync(packagesDir)
  .filter((file) => fs.statSync(path.join(packagesDir, file)).isDirectory())

function output(pkgName) {
  return {
    input: `./packages/${pkgName}/src/index.ts`,
    output: [
      {
        file: `./packages/${pkgName}/dist/index.cjs.js`,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: `./packages/${pkgName}/dist/index.esm.js`,
        format: 'esm',
        sourcemap: true
      },
      {
        file: `./packages/${pkgName}/dist/index.umd.js`,
        format: 'umd',
        name: `Tmonitor${pkgName.charAt(0).toUpperCase() + pkgName.slice(1)}`, // 假设您想要根据包名动态设置 UMD 全局变量名
        sourcemap: true
      }
      // 如果要压缩，请取消注释以下配置，并确保已安装 terser 插件
      // {
      //   file: `./packages/${pkgName}/dist/index.min.js`,
      //   format: 'umd',
      //   name: `Tmonitor${pkgName.charAt(0).toUpperCase() + pkgName.slice(1)}`,
      //   sourcemap: true,
      //   plugins: [terser()]
      // }
    ],
    plugins: [resolve(), commonjs(), alias({}), typescript({})]
  }
}

module.exports = packageFiles.map((pkgName) => output(pkgName)) // 不需要 .flat()，因为 output 函数已经返回一个配置数组
