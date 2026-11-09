import {registerHooks} from 'node:module'
import {dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import {createResolve} from '../common/lib/loader/react-version-import.js'

const suiteDir = dirname(fileURLToPath(import.meta.url))

registerHooks({resolve: createResolve(suiteDir)})
