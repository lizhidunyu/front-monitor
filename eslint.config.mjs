import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      parser: tsParser, // 使用 TypeScript 解析器
      globals: globals.browser
    },
    plugins: {
      js: pluginJs,
      '@typescript-eslint': tseslint
    },
    rules: {
      // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
      // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'vue/no-mutating-props': 'off',
      '@typescript-eslint/no-unused-vars': 'off'
    }
  }
]

// module.exports = {
//   root: true,
//   env: {
//     node: true
//   },
//   extends: [
//     // 'plugin:vue/vue3-essential',
//     // 'eslint:recommended',
//     // '@vue/typescript/recommended',
//     // '@vue/prettier',
//     // '@vue/prettier/@typescript-eslint',
//     // 'plugin:prettier/recommended'
//   ],
//   parserOptions: {
//     ecmaVersion: 2020
//   },
//   rules: {
//     'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
//     'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
//     '@typescript-eslint/no-var-requires': 'off',
//     '@typescript-eslint/no-explicit-any': 'off',
//     '@typescript-eslint/explicit-module-boundary-types': 'off',
//     'vue/no-mutating-props': 'off',
//     '@typescript-eslint/no-unused-vars': 'off'
//   },
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     parser: 'babel-eslint'
//   }
// }
