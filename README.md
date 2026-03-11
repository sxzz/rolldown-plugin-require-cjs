# rolldown-plugin-require-cjs

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Unit Test][unit-test-src]][unit-test-href]

Transform ESM imports to CJS requires when the imported module is pure CJS.

## Why?

Some packages only provide CJS builds (e.g., [`typescript`](https://npmjs.com/package/typescript), [`@babel/parser`](https://npmjs.com/package/@babel/parser)), and importing them using ESM syntax increases Node's `cjs-module-lexer` overhead. This plugin converts ESM imports to CJS requires for such pure CJS packages, allowing Node to skip the cjs-module-lexer step and improve performance.

If performance is insignificant for your project, please do not use this plugin, as it introduces additional complexity and maintenance overhead.

See more: https://x.com/sanxiaozhizi/status/1968580207322808812

## Appeal

We encourage the JavaScript ecosystem to continue its transition toward ESM. If you maintain a package that is still CJS-only, please consider offering an ESM build or migrating fully to ESM. Doing so will reduce reliance on plugins like this one and enhance the overall performance of the ecosystem.

## Install

```bash
npm i -D rolldown-plugin-require-cjs
```

## Options

```ts
export interface Options {
  include?: Array<string | RegExp> | string | RegExp
  exclude?: Array<string | RegExp> | string | RegExp
  order?: 'pre' | 'post' | undefined
  /**
   * A function to determine whether a module should be transformed.
   * Return `true` to force transformation, `false` to skip transformation,
   * or `undefined` to let the plugin decide automatically.
   */
  shouldTransform?: string[] | TransformFn
}

/**
 * @returns A boolean or a promise that resolves to a boolean,
 * or `undefined` to let the plugin decide automatically.
 */
export type TransformFn = (
  /**
   * The module ID (path) being imported.
   */
  id: string,
  /**
   * The module ID (path) of the importer.
   */
  importer: string,
) => Awaitable<boolean | undefined | void>
```

## Example

```ts
RequireCJS({
  shouldTransform(id, importer) {
    // Force transformation for specific dependencies
    if (id === 'typescript') return true
    // Skip transformation for specific dependencies
    if (id === 'esm-only') return false
    // Auto-detect for other dependencies
    return undefined
  },
})
```

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2025-PRESENT [Kevin Deng](https://github.com/sxzz)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/rolldown-plugin-require-cjs.svg
[npm-version-href]: https://npmjs.com/package/rolldown-plugin-require-cjs
[npm-downloads-src]: https://img.shields.io/npm/dm/rolldown-plugin-require-cjs
[npm-downloads-href]: https://www.npmcharts.com/compare/rolldown-plugin-require-cjs?interval=30
[unit-test-src]: https://github.com/sxzz/rolldown-plugin-require-cjs/actions/workflows/unit-test.yml/badge.svg
[unit-test-href]: https://github.com/sxzz/rolldown-plugin-require-cjs/actions/workflows/unit-test.yml
