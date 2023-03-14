import {css, cx} from '@emotion/css'
import {define, node, oneOf, size} from 'form-builder'
import {forwardRef} from 'react'

const isHorizontal = (element?: Element) => {
  if (!element) return false
  const style = getComputedStyle(element)
  return style.display === 'flex' && style.flexDirection === 'row'
}

const RsContainer = forwardRef(({direction, className, ...props}: any, ref: any) => {
  const horizontal = direction === 'horizontal' || isHorizontal(ref?.current)
  return <div {...props} ref={ref} className={cx(className, {horizontal}, containerStyles)}/>
})

RsContainer.displayName = 'Container'

//TODO property what say it is a container and can have children. Create smth like reactnode property?
export const rsContainer = define(RsContainer)
  .typed('RsContainer')
  .props({
    children: node.hinted('Component children'),
    direction: oneOf('vertical', 'horizontal')
      .default('vertical')
      .radio()
      .hinted('Component direction')
  })
  .css({
    gap: size.default('10px'),
    alignItems: oneOf('start', 'center', 'baseline', 'end', 'stretch'),
    justifyContent: oneOf('flex-start', 'flex-end', 'center', 'space-between', 'space-around',
      'space-evenly', 'start', 'end', 'left', 'right'),
  })

const containerStyles = css`
  display: flex;
  flex-direction: column;

  &.horizontal {
    display: flex;
    flex: 1;
    flex-direction: row;

    & > * {
      flex: 1;
    }
  }
`
