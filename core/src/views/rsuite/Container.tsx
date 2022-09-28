import {css, cx} from '@emotion/css'
import {forwardRef} from 'react'
import {node, oneOf} from '../../features/annotation'
import {define} from '../../features/define'

type Direction = 'vertical' | 'horizontal';

const isHorizontal = (element?: Element) => {
  if (!element) return false
  const style = getComputedStyle(element)
  return style.display === 'flex' && style.flexDirection === 'row'
}

const Container = forwardRef(({direction, className, ...props}: any, ref: any) => {
  const horizontal = direction === 'horizontal' || isHorizontal(ref?.current)
  return <div {...props} ref={ref} className={cx(className, {horizontal}, containerStyles)}/>
})

Container.displayName = 'Container'

//TODO property what say it is a container and can have children. Create smth like reactnode property?
export const container = define(Container)
  .props({
    children: node,
    direction: oneOf('vertical', 'horizontal').default('vertical').radio()
  })

const containerStyles = css`
  display: flex;
  gap: 5px;
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
