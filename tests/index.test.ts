import { rolldownBuild, testFixtures } from '@sxzz/test-utils'
import { describe } from 'vitest'
import { RequireCJS } from '../src'

describe('fixtures', async () => {
  await testFixtures(
    'fixtures/*',
    async (args, id) => {
      const { snapshot } = await rolldownBuild(
        id,
        [
          RequireCJS({
            shouldTransform: (id) => (id === 'force' ? true : undefined),
          }),
        ],
        {
          external: ['typescript', '@babel/parser', 'force', 'auto'],
          platform: 'node',
          treeshake: true,
        },
      )
      return snapshot
    },
    { cwd: import.meta.dirname, promise: true },
  )
})
