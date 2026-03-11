import type { FilterPattern } from 'unplugin-utils'

type Awaitable<T> = T | Promise<T>

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

export interface Options {
  include?: FilterPattern
  exclude?: FilterPattern
  order?: 'pre' | 'post' | undefined
  /**
   * A function to determine whether a module should be transformed.
   * Return `true` to force transformation, `false` to skip transformation,
   * or `undefined` to let the plugin decide automatically.
   */
  shouldTransform?: string[] | TransformFn
}

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U

export type OptionsResolved = Overwrite<
  Required<Options>,
  Pick<Options, 'order'> & { shouldTransform?: TransformFn }
>

export function resolveOptions(options: Options): OptionsResolved {
  if (Array.isArray(options.shouldTransform)) {
    const { shouldTransform } = options
    options.shouldTransform = (id) => shouldTransform.includes(id)
  }

  return {
    include: options.include || [/\.m?[jt]sx?$/],
    exclude: options.exclude || [/node_modules/, /\.d\.[cm]?ts$/],
    order: 'order' in options ? options.order : 'pre',
    shouldTransform: options.shouldTransform,
  }
}
