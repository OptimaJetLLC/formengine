import {cfComponentIsPreset, getTemplateName, isTemplateType, namedObserver, startCase, useComponentData} from '@react-form-builder/core'
import cx from 'clsx'
import type {FunctionComponent, MouseEventHandler, ReactNode, RefCallback, SVGProps} from 'react'
import {useCallback, useMemo} from 'react'
import {icons} from '../../../icons'
import {getIcon} from '../../../icons/utils'
import {useCanAddComponent} from '../../../utils/AddComponentContext'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {transformComponentNameToCssClass} from '../../../utils/transformComponentNameToCssClass'
import {PresetIcon} from '../../preset-component/PresetIcon'
import type {DraggableProps} from '../../ui/ComponentBar'
import {useComponentLibraryDescription} from '../../ui/ComponentBar/useComponentLibraryDescription'
import {ItemType} from '../consts'
import styles from './AddedComponent.module.css'
import {DragPreview} from './Editable/components/DragPreview'
import {useDragWithPreview} from './Editable/hooks/useDragWithPreview'
import {PresetToolbar} from './PresetToolbar'
import {useHovered} from './useHovered'

type IconComponent = FunctionComponent<SVGProps<SVGSVGElement>>

const Draggable = ({children}: { children: ReactNode }) => {
  const [{isDragging}, drag] = useDragWithPreview(ItemType.AddedComponent)

  return (
    <>
      {/* TODO FE-1065 */}
      <div className={styles.draggableContainer} ref={drag as unknown as RefCallback<HTMLDivElement>}>
        {children}
      </div>
      {isDragging && <DragPreview>{children}</DragPreview>}
    </>
  )
}

const componentStaticClassname = 'FE_Palette_Component'

const RawAddedComponent = ({draggable = true, onAdd, onDoubleClick}: DraggableProps) => {
  const data = useComponentData()
  const {name = '', type} = data.model
  const builderStore = useBuilderStore()

  const Icon = useMemo((): IconComponent => {
    const iconName = startCase(name).replaceAll(' ', '')
    const componentIcon = getIcon(builderStore.getComponentMetadata(type).icon ?? iconName)
    const defaultIcon = data.model.isFeatureEnabled(cfComponentIsPreset) ? PresetIcon : icons.Default
    return (componentIcon ?? defaultIcon) as IconComponent
  }, [builderStore, data.model, name, type])

  const {hovered, ...hoveredProps} = useHovered()

  const getLibraryDescription = useComponentLibraryDescription()

  const componentName = useMemo(() => {
    if (isTemplateType(data.store.type)) {
      return getTemplateName(data.store.type)
    }
    return getLibraryDescription(libraryDescription => libraryDescription?.components?.[type]?.name)
      || name || type
  }, [data.store.type, getLibraryDescription, name, type])

  const canAddComponent = useCanAddComponent()
  const disabled = useMemo(() => !canAddComponent(data), [canAddComponent, data])
  const cls = useMemo(() => cx([
    styles.container,
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

  const elementToolbar = useMemo(() => {
    if (!hovered || !data.model.isFeatureEnabled(cfComponentIsPreset)) return null
    return <PresetToolbar/>
  }, [data.model, hovered])

  const element = (
    <div
      {...hoveredProps}
      className={cls}
      data-testid={`${data.model.type}-palette-component`}
      onClick={onClick}
      onDoubleClick={handleDoubleClick}
    >
      <Icon width={18} height={18} viewBox="0 0 24 24"/>
      <label>{componentName}</label>
      {elementToolbar}
    </div>
  )

  return draggable
    ? <Draggable>{element}</Draggable>
    : element
}

export const AddedComponent = namedObserver('AddedComponent', RawAddedComponent)
