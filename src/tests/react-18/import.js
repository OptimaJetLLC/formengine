import {register} from 'node:module'
import {dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import {createResolve, load} from '../common/lib/loader/react-version-import.js'

const suiteDir = dirname(fileURLToPath(import.meta.url))

register('./import.js', import.meta.url)

export {load}
export const resolve = createResolve(suiteDir)
