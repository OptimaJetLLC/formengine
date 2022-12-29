import {boolean, color, define, number, oneOf, string} from 'fb-core'
import {Progress} from 'rsuite'

const commonProgressProps = {
  classPrefix: string.default('progress').hinted('The prefix of the component CSS class'),
  percent: number.default(50).withEditorProps({min: 0, max: 100}).hinted('Percent of progress'),
  showInfo: boolean.default(true).hinted('Show text'),
  status: oneOf('success', 'fail', 'active')
    .default('active')
    .hinted('Progress status'),
  strokeColor: color.hinted('Line color'),
  strokeWidth: number.hinted('Line width'),
}

export const progressCircle = define(Progress.Circle)
  .named('ProgressCircle')
  .props({
    ...commonProgressProps,
    gapDegree: number.withEditorProps({min: 0, max: 360}).hinted('The gap degree of half circle, 0 ~ 360'),
    gapPosition: oneOf('right', 'top', 'bottom', 'left')
      .default('top')
      .hinted('Circular progress bar Notch position'),
    strokeLinecap: oneOf('round', 'square', 'butt')
      .default('round')
      .hinted('The end of different types of open paths'),
    strokeWidth: number.default(6).hinted('Line width'),
    trailColor: color.hinted('Trail color'),
    trailWidth: number.default(6).hinted('Trail width')
  })

export const progressLine = define(Progress.Line)
  .named('ProgressLine')
  .props({
    ...commonProgressProps,
    vertical: boolean.default(false).hinted('The progress bar is displayed vertically')
  })
