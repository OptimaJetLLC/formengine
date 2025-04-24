import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import {namedObserver, useComponentData} from '@react-form-builder/core'
import {camelCase, replace, upperFirst} from 'lodash-es'
import type {MouseEventHandler, ReactNode, RefCallback} from 'react'
import {useCallback, useMemo} from 'react'
import {icons} from '../../../icons'
import {useCanAddComponent} from '../../../utils/AddComponentContext'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {transformComponentNameToCssClass} from '../../../utils/transformComponentNameToCssClass'
import type {DraggableProps} from '../../ui/ComponentBar'
import {ItemType} from '../consts'
import {DragPreview} from './Editable/components/DragPreview'
import {useDragWithPreview} from './Editable/hooks/useDragWithPreview'

const componentStaticClassname = 'FE_Palette_Component'

const RawAddedComponent = ({draggable = true, onAdd, onDoubleClick}: DraggableProps) => {
  const data = useComponentData()
  const {name = ''} = data.model
  const builderStore = useBuilderStore()
  const {icon: CustomIcon} = builderStore.getComponentMetadata(data.model.type)
  const iconName = replace(upperFirst(camelCase(name)), ' ', '') as keyof typeof icons
  const Icon = CustomIcon ?? icons[iconName] ?? icons.Default

  const canAddComponent = useCanAddComponent()
  const disabled = useMemo(() => !canAddComponent(data), [canAddComponent, data])
  const cls = useMemo(() => cx([
    disabled ? 'disabled' : '',
    componentStaticClassname,
    transformComponentNameToCssClass(data.model.typeName),
    transformComponentNameToCssClass(data.model.name),
  ]), [data.model.name, data.model.typeName, disabled])

  const onClick: MouseEventHandler = useCallback(e => {
    if (disabled) return
    e.stopPropagation()
    onAdd?.(data)
  }, [data, disabled, onAdd])

  const handleDoubleClick: MouseEventHandler = useCallback(e => {
    if (disabled) return
    e.stopPropagation()
    onDoubleClick?.(data)
  }, [disabled, onDoubleClick, data])

  const element = (
    <Container onClick={onClick} onDoubleClick={handleDoubleClick} className={cls}>
      <Icon width={18} height={18} viewBox="0 0 24 24"/>
      <label>{name}</label>
    </Container>
  )

  return draggable
    ? <Draggable>{element}</Draggable>
    : element
}

export const AddedComponent = namedObserver('AddedComponent', RawAddedComponent)

const Draggable = ({children}: { children: ReactNode }) => {
  const [{isDragging}, drag] = useDragWithPreview(ItemType.AddedComponent)

  return <>
    {/* TODO FE-1065 */}
    <DraggableContainer ref={drag as unknown as RefCallback<HTMLDivElement>}>{children}</DraggableContainer>
    {isDragging && <DragPreview>{children}</DragPreview>}
  </>
}

const Container = styled.div`
  display: flex;
  padding: 7px;
  gap: 6px;
  min-width: 150px;
  flex: 1;
  max-width: 125px;
  border-radius: 6px;
  background-color: var(--rs-btn-default-bg);
  font-size: 13px;

  &:hover:not(.disabled) {
    box-shadow: var(--rs-state-focus-shadow);
  }

  &:active:not(.disabled), &:focus:not(.disabled) {
    outline: 2px solid var(--rs-btn-primary-bg);
  }

  &.disabled {
    color: var(--rs-btn-default-disabled-text);
  }

  .rs-theme-dark & label {
    opacity: 0.6;
  }
`

const DraggableContainer = styled.div`
  flex: 1;
  
  * {
    cursor: grab;    
  }

  & > div {
    height: 100%;
    min-width: 123px;
    max-width: initial;
  }
`
