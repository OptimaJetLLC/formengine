// eslint-disable-next-line import/no-extraneous-dependencies
import {expect, test} from '@playwright/test'
import {registerPlaywrightCiFailureReportDemo} from '../../../common/ci-failure-report.playwright'

registerPlaywrightCiFailureReportDemo(test, expect)
