import styled from '@emotion/styled'
import {useComponentData} from '@react-form-builder/core'
import {useCallback, useMemo} from 'react'
import {useDragLayer} from 'react-dnd'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {RemoveButton} from '../../components/Buttons'
import {useHovered} from './useHovered'

const SToolbar = styled.span`
  position: absolute;
  height: auto !important;
  inset-inline-end: 6px;
  inset-block-start: 6px;

  button {
    padding: 4px !important;

    * {
      cursor: pointer;
    }
  }
`

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

  return <SToolbar {...hoveredProps}>
    <RemoveButton onClick={handleClick} hintPlacement={'autoHorizontal'}
                  className="remove-preset-button show"/>
  </SToolbar>
}
