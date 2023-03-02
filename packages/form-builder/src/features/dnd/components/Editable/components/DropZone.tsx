import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import {useComponentData} from 'fb-core'
import {observer} from 'mobx-react'
import {ComponentProps} from 'react'
import {useDropZone} from '../hooks/useDropZone'
import {DropView} from './DropView'

interface DropZoneProps extends ComponentProps<any> {
  isAfter?: boolean
  isInner?: boolean
  className?: any
  children?: any
  bindTo?: string
}

const DropZone = observer(({isAfter = false, className, isInner, ...props}: DropZoneProps) => {
  const {isRoot, isContainer} = useComponentData().componentStore
  const {bindTo} = props

  const [{isActive, isOver}, drop] = useDropZone(isAfter, isRoot || isInner)
  const dropClassNames = {isAfter, isActive, isContainer, isRoot, isInner}

  const dropView = <DropView {...{...dropClassNames, isOver, bindTo}}/>

  return <>
    <Container ref={drop} {...props} className={cx(dropClassNames, className)}>
      {(isRoot || isInner) && dropView}
    </Container>
    {!isRoot && !isInner && dropView}
  </>
})

const Container = styled.div`
  position: absolute;
  top: 0;
  height: 50%;
  width: 100%;
  z-index: 10;
  display: flex;

  &.isContainer {
    height: 40px;
    z-index: 9;
  }

  &.isAfter {
    top: 50%;

    &.isContainer {
      top: initial;
      bottom: 0;
    }

    &.isRoot {
      position: relative;
      flex: 1;
    }
  }

  .horizontal > * > & {
    height: 100%;
    width: 50%;
    top: 0;
    inset-inline-start: 0;
  }

  .horizontal > * > & {
    &.isContainer {
      width: 40px;
    }

    &.isAfter {
      inset-inline-start: 50%;

      &.isContainer {
        inset-inline-start: initial;
        inset-inline-end: 0;
      }
    }
  }

  &.isInner {
    position: relative;
    top: 0;
    padding: 10px;
    min-height: 40px;
  }
`

export {DropZone}
