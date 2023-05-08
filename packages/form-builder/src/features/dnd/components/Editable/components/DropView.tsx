import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import PlusIcon from '@rsuite/icons/Plus'
import {useComponentData} from 'fb-core'
import {ComponentProps} from 'react'
import {IconButton} from 'rsuite'
import {isRootType} from '../../../../../utils/isRoot'
import {InsertPosition} from '../../../../../utils/types'
import {useComponentsModal} from '../../../../ui/ComponentBar/ComponentsModal'

interface DropViewProps extends ComponentProps<any> {
  isAfter?: boolean
  isActive?: boolean
  isOver?: boolean
  isInner?: boolean
  bindTo?: string
  bindCondition?: string
}

export const DropView = (props: DropViewProps) => {
  const {store} = useComponentData()
  const isRoot = isRootType(store)
  const isContainer = Boolean(store.children)
  const {bindTo, bindCondition, ...classNamesFromProps} = props
  const dropClassNames = {isContainer, isRoot, ...classNamesFromProps}
  const label = `${props.isAfter ? 'AFTER' : 'BEFORE'} ${store.key}`

  return <Container className={cx({...dropClassNames})}>
    <LabelContainer>
      {isRoot || props.isInner
        ? <AddButton bindTo={bindTo} bindCondition={bindCondition}/>
        : <Label className={cx(dropClassNames)}>{label}</Label>
      }
    </LabelContainer>
  </Container>
}

const AddButton = ({bindTo, bindCondition}: { bindTo?: string, bindCondition?: string }) => {
  const target = useComponentData()
  const {openModal, ComponentsModal} = useComponentsModal(target)
  return <>
    <IconButton onClick={() => openModal(InsertPosition.Inner, bindTo, bindCondition)}
                icon={<PlusIcon/>} color="green" appearance={'primary'} circle size={'xs'}/>
    <ComponentsModal/>
  </>
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


const LabelContainer = styled.label`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 6px;
`

const Label = styled.label`
  display: none;
  opacity: 0.4;
  text-align: center;
  text-overflow: ellipsis;
  line-height: 12px;
  font-size: 12px;
  overflow: hidden;

  &.isActive, .isInner & {
    display: block;
  }

  .horizontal .isContainer > &:not(.isInner) {
    writing-mode: tb-rl;
    transform: rotate(-180deg);
  }
`
