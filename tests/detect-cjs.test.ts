import { init } from 'cjs-module-lexer'
import { describe, expect, test } from 'vitest'
import { isPureCJS } from '../src/index.ts'

describe('isPureCJS', async () => {
  await init()

  test('typescript is pure CJS', async () => {
    expect(await isPureCJS('typescript', import.meta.url)).toBe(true)
  })

  test('eslint is pure CJS', async () => {
    expect(await isPureCJS('eslint', import.meta.url)).toBe(true)
  })

  test('cjs-module-lexer is not CJS', async () => {
    expect(await isPureCJS('cjs-module-lexer', import.meta.url)).toBe(false)
  })

  test('eslint-plugin-vue is pure CJS', async () => {
    expect(await isPureCJS('eslint-plugin-vue', import.meta.url)).toBe(true)
  })
})
