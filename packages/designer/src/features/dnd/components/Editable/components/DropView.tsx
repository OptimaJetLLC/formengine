import styled from '@emotion/styled'
import {forwardRef, useComponentData} from '@react-form-builder/core'
import {Plus as PlusIcon} from '@rsuite/icons'
import type {PropsWithoutRef, RefCallback} from 'react'
import {IconButton} from 'rsuite'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'

const InnerContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  min-height: 36px;
  z-index: 12;
  align-items: center;
  justify-content: center;
  outline: 1px solid var(--rs-btn-default-disabled-text);

  &.isActive {
    background-color: rgba(0, 116, 255, 0.15);
    outline: 1px solid blue;
  }

  .selected & {
    outline: none !important;
  }
`

interface DropViewProps extends PropsWithoutRef<any> {
  className?: string
  slot?: string
  slotCondition?: string
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
    <IconButton onClick={handleClick} icon={<PlusIcon/>} color="green"
                appearance={'primary'} circle size={'xs'}/>
  </>
}

/**
 * The React form builder component that displays the inner container into which you can drag and drop a component.
 * @param props the React component properties.
 * @returns the React element.
 */
export const InnerDropView = forwardRef<any, DropViewProps>(({slot, slotCondition, className}, ref) => {
  // TODO FE-1065
  return <InnerContainer className={className} ref={ref as unknown as RefCallback<HTMLDivElement>}>
    <AddButton slot={slot} slotCondition={slotCondition}/>
  </InnerContainer>
})

/**
 * The React form builder component that displays the container into which you can drag and drop a component.
 * @param props the React component properties.
 * @returns the React element.
 */
export const DropView = styled.div`
  position: absolute;
  top: -6px;
  height: 2px;
  width: 100%;
  inset-inline-start: 0;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .isTree & {
    top: 0;
  }

  &.isAfter {
    top: initial;
    bottom: -6px;

    .isTree & {
      bottom: 0;
    }
  }

  .horizontal.isContainer > * > & {
    inset-block: 0;
    inset-inline-start: -6px;
    inset-inline-end: initial;
    height: 100%;
    width: 2px;

    &.isAfter {
      inset-inline-start: initial;
      inset-inline-end: -6px;
    }
  }

  &.isActive {
    opacity: 1;
    background-color: blue;

    .isInner & {
      background-color: rgba(0, 116, 255, 0.15);
      outline: 1px solid blue;
    }
  }
`
