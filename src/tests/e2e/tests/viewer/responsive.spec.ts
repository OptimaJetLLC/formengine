import {test} from '@playwright/test'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {testResponsive} from '../../../common/lib/screenshot'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const localFolder = resolve(__dirname, '../../reports/screenshots/viewer')

test('check responsive layout', {
  tag: ['@viewer', '@responsive', `@${process.env['TEST_TEMPLATE']}`]
}, async ({page}) => {
  await testResponsive(localFolder, page)
})
