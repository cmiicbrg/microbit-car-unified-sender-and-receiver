import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

const jsFiles = ['**/*.{js,mjs,cjs}']
const tsFiles = ['**/*.{ts,tsx,d.ts}']

export default [
  {
    ...js.configs.recommended,
    files: jsFiles
  },
  {
    files: jsFiles,
    plugins: {
      '@stylistic': stylistic
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/eol-last': ['error', 'always']
    }
  },
  {
    files: tsFiles,
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@stylistic': stylistic
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/eol-last': ['error', 'always']
    }
  },
  {
    ignores: ['**/*.html', 'built/**', 'node_modules/**']
  }
]
