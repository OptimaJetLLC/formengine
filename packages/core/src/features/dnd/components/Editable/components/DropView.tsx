import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import React from 'react'
import {useComponentData} from '../../../../../utils/contexts/ComponenDataContext'

interface DropViewProps extends React.ComponentProps<any> {
  isAfter?: boolean
  isActive?: boolean
  isOver?: boolean
  isInner?: boolean
}

export const DropView = (props: DropViewProps) => {
  const {isRoot, isContainer, key} = useComponentData().componentStore
  const dropClassNames = {isContainer, isRoot, ...props}
  const label = `${(isRoot || props.isInner ? '' : props.isAfter ? 'AFTER' : 'BEFORE')} ${key}`

  return <Container className={cx({...dropClassNames})}>
    <Label className={cx(dropClassNames)}>{label}</Label>
  </Container>
}

const Container = styled.div`
  opacity: 0;
  display: flex;
  transition: min-height 120ms ease-in-out;
  transition-delay: 70ms;
  min-height: 0;
  justify-content: center;
  align-items: center;

  .isInner & {
    outline: 1px solid var(--rs-btn-default-disabled-text);
  }

  &.isActive, .isInner & {
    min-height: 40px;
    opacity: 1;
    flex: 1;
    width: 100%;
  }

  &.isActive {
    background-color: rgba(0, 116, 255, 0.15);
    outline: 1px solid blue;
  }

  .horizontal > * > &.isContainer:not(.isInner) {
    height: 100%;
    width: 40px;

    &.isAfter {
      inset-inline-start: initial;
      inset-inline-end: 0;
    }
  }

  &.isContainer {
    position: absolute;
    top: 0;
    inset-inline-start: 0;

    &.isAfter {
      top: initial;
      bottom: 0;
    }

    &.isRoot {
      top: 0;
      position: relative;
      max-height: 50px;
    }
  }
`

const Label = styled.label`
  display: none;
  position: absolute;
  opacity: 0.4;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 12px;
  font-size: 12px;

  &.isActive, .isInner & {
    display: block;
  }

  .horizontal .isContainer > &:not(.isInner) {
    writing-mode: tb-rl;
    transform: rotate(-180deg);
  }
`
