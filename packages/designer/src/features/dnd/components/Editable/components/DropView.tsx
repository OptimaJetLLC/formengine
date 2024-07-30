import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import {useComponentData} from '@react-form-builder/core'
import {Plus as PlusIcon} from '@rsuite/icons'
import type {ComponentProps} from 'react'
import {IconButton} from 'rsuite'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'

interface DropViewProps extends ComponentProps<any> {
  isAfter?: boolean
  isActive?: boolean
  isOver?: boolean
  isInner?: boolean
  slot?: string
  slotCondition?: string
}

/**
 * The React form builder component that displays the container into which you can drag and drop a component.
 * @param props the React component properties.
 * @returns the React element.
 */
export const DropView = (props: DropViewProps) => {
  const componentData = useComponentData()
  const store = componentData.store
  const isRoot = componentData.isRoot
  const isContainer = Boolean(store.children)
  const {slot, slotCondition, ...classNamesFromProps} = props
  const dropClassNames = {isContainer, isRoot, ...classNamesFromProps}
  const label = `${props.isAfter ? 'AFTER' : 'BEFORE'} ${store.key}`

  return <Container className={cx({...dropClassNames})}>
    <LabelContainer>
      {isRoot || props.isInner
        ? <AddButton slot={slot} slotCondition={slotCondition}/>
        : <Label className={cx(dropClassNames)}>{label}</Label>
      }
    </LabelContainer>
  </Container>
}

const AddButton = ({slot, slotCondition}: { slot?: string, slotCondition?: string }) => {
  const builderStore = useBuilderStore()
  const target = useComponentData()
  const handleClick = () => {
    builderStore.showComponentsModal(source => {
      builderStore.add(source, target, 'inner', slot, slotCondition)
    })
  }
  return <>
    <IconButton onClick={handleClick}
                icon={<PlusIcon/>} color="green" appearance={'primary'} circle size={'xs'}/>
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
