import {spawnSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import {describe, expect, it} from 'vitest'

const repositoryRoot = fileURLToPath(new URL('../../../', import.meta.url))

describe('React 18 test preloads', () => {
  it('keeps ESM and CommonJS React imports on React 18 without deprecation warnings', () => {
    const result = spawnSync(
      process.execPath,
      [
        '--throw-deprecation',
        '--import',
        './tests/react-18/import.js',
        '--require',
        './tests/react-18/require.cjs',
        '--input-type=module',
        '--eval',
        `
          import assert from 'node:assert/strict'
          import {once} from 'node:events'
          import {createRequire} from 'node:module'
          import {Worker} from 'node:worker_threads'
          import React from 'react'
          import ReactDOM from 'react-dom'
          import {createRoot} from 'react-dom/client'
          import {renderToString} from 'react-dom/server'
          import {jsx} from 'react/jsx-runtime'
          import {jsxDEV} from 'react/jsx-dev-runtime'

          const require = createRequire(import.meta.url)
          assert.equal(React.version, '18.3.1')
          assert.equal(ReactDOM.version, '18.3.1')
          assert.equal(React, require('react'))
          assert.equal(React, (await import('react')).default)
          assert.equal(ReactDOM, require('react-dom'))
          assert.equal(createRoot, require('react-dom/client').createRoot)
          assert.equal(jsx, require('react/jsx-runtime').jsx)
          assert.equal(jsxDEV, require('react/jsx-dev-runtime').jsxDEV)
          assert.equal(renderToString(jsx('span', {children: 'React 18'})), '<span>React 18</span>')

          const worker = new Worker(new URL('data:text/javascript,' + encodeURIComponent(
            "import {parentPort} from 'node:worker_threads'; import React from 'react'; parentPort.postMessage(React.version)"
          )))
          assert.deepEqual(await once(worker, 'message'), ['18.3.1'])
        `,
      ],
      {cwd: repositoryRoot, encoding: 'utf8', env: {...process.env, NODE_OPTIONS: ''}}
    )

    expect(result.error).toBeUndefined()
    expect(result.status, result.stderr).toBe(0)
    expect(result.stderr).not.toContain('DEP0205')
  })
})
