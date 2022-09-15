import {css, cx} from '@emotion/css'
import ColumnsIcon from '@rsuite/icons/Columns'
import {forwardRef} from 'react'
import {node} from '../../features/annotation'
import {WithRadioButton} from '../../features/annotation/inputs/RadioButton'
import {AnnotationBuilder} from '../../features/annotation/utils/AnnotationBuilder'
import {define} from '../../features/annotation/utils/define'

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
    direction: new AnnotationBuilder<Direction>({
      component: WithRadioButton([
        {value: 'vertical', icon: <ColumnsIcon rotate={90}/>},
        {value: 'horizontal', icon: <ColumnsIcon/>},
      ])
    }).isRequired('vertical'),
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
