import styled from '@emotion/styled'
import {commonStyles, containerStyles, getDefaultCss} from '../annotation'
import {toStyleProperties} from '../annotation/toStyleProperties'
import {Model} from '../define'


const Screen = styled.div`
  display: flex;
`
Screen.displayName = 'Screen'
const {flexDirection, gap} = containerStyles
export const screenStyleProperties = toStyleProperties({
  ...containerStyles,
  ...commonStyles,
  flexDirection: flexDirection.default('column'),
  gap: gap.default('10px')
})

const defaultCss = getDefaultCss(screenStyleProperties)

/**
 * Form viewer screen metadata. **Internal use only.**
 */
export const screenModel = new Model(Screen, undefined, undefined,
  undefined, undefined, undefined, defaultCss, undefined, undefined,
  'container')
