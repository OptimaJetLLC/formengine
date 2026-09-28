import type {Page} from '@playwright/test'
import {whenCiFailureReportDemoEnabled} from './ci-failure-report'
import type {CiFailureReportCaseKind} from './ci-failure-report.cases'
import {getCiFailureReportCasesForSuite} from './ci-failure-report.cases'

type PlaywrightExpect = typeof import('@playwright/test').expect
type PlaywrightTest = typeof import('@playwright/test').test

async function runPlaywrightCase(kind: CiFailureReportCaseKind, expect: PlaywrightExpect, page: Page): Promise<void> {
  switch (kind) {
    case 'assertion':
      await page.goto('/')
      await expect(page).toHaveTitle(/this title does not exist/)
      return
    case 'console-on-failure':
      await page.goto('/')
      await page.evaluate(() => {
        console.log('e2e demo diagnostic', {step: 'before-assertion'})
      })
      await expect(page.getByRole('heading', {name: 'this heading does not exist'})).toBeVisible()
      return
    default:
      throw new Error(`Unsupported playwright demo case: ${kind}`)
  }
}

/**
 * Registers intentional failing playwright cases for CI reporter validation.
 * @param test playwright test function
 * @param expect playwright expect function
 */
export function registerPlaywrightCiFailureReportDemo(test: PlaywrightTest, expect: PlaywrightExpect): void {
  const describeDemo = whenCiFailureReportDemoEnabled(test.describe, test.describe.skip)
  const tags = ['@designer', `@${process.env['TEST_TEMPLATE']}`]

  describeDemo('CI failure report demo (e2e)', () => {
    for (const testCase of getCiFailureReportCasesForSuite('e2e')) {
      if (testCase.kind === 'thrown-error') {
        test(testCase.title, {tag: tags}, async () => {
          throw new Error('Demo thrown error from e2e test')
        })
        continue
      }

      test(testCase.title, {tag: tags}, async ({page}) => {
        await runPlaywrightCase(testCase.kind, expect, page)
      })
    }
  })
}
