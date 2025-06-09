import {test} from '@playwright/test'
import {testResponsive} from '../../../common/lib/screenshot'
import {dirname, resolve} from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const localFolder = resolve(__dirname, '../../reports/screenshots/designer')

test('check responsive layout', {
  tag: ['@designer', '@responsive', `@${process.env['TEST_TEMPLATE']}`]
}, async ({page}) => {
  await testResponsive(localFolder, page)
})
