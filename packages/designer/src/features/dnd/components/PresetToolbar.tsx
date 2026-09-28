import {useComponentData} from '@react-form-builder/core'
import {useCallback, useMemo} from 'react'
import {useDragLayer} from 'react-dnd'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {RemoveButton} from '../../components/Buttons'
import styles from './PresetToolbar.module.css'
import {useHovered} from './useHovered'

/**
 * The preset toolbar component.
 * @returns the React element.
 */
export const PresetToolbar = () => {
  const {name} = useComponentData().model
  const {hovered, ...hoveredProps} = useHovered()
  const builderStore = useBuilderStore()
  const builderPresets = builderStore.presetComponentOptions

  const {isDragging} = useDragLayer(monitor => ({isDragging: monitor.isDragging()}))

  const handleClick = useCallback(() => builderPresets.removePresetComponent(name), [builderPresets, name])
  const canRemove = useMemo(() => builderPresets.canRemovePresetComponent(name), [builderPresets, name])

  if (isDragging || builderPresets.disableRemoving || !canRemove) return null

  return (
    <span {...hoveredProps} className={styles.toolbar}>
      <RemoveButton onClick={handleClick} hintPlacement={'autoHorizontal'} className="remove-preset-button show" />
    </span>
  )
}
