import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import type {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faClone from '@fortawesome/free-regular-svg-icons/faClone.js'
import * as faTrash from '@fortawesome/free-regular-svg-icons/faTrashAlt.js'
import {cfDisableComponentRemove, useComponentData} from '@react-form-builder/core'
import type {MouseEventHandler, ReactNode} from 'react'
import {useCallback, useEffect, useMemo, useRef} from 'react'
import scrollIntoView from 'scroll-into-view-if-needed'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {stopEvent} from '../../../../../utils/stopEvent'
import {Hinted} from '../../../../annotation-editors/Hinted'
import {FaIcon} from '../../../../components/Icons'
import {customizableObserver} from '../../../../customization'
import {useTranslationPart} from '../../../../localization/hooks'
import {useSelection} from '../hooks/useSelection'
import {AddButton} from './AddButton'
import {PresetComponentButton} from './PresetComponentButton'

const ToolbarContainer = styled.div`
  inset: initial;
  inset-inline-end: 5px;
  top: -13px;

  &.compact {
    top: 8px;
  }

  position: absolute;
  z-index: 12;
  color: var(--rs-btn-ghost-text);
  cursor: pointer !important;
  white-space: nowrap;
  border-radius: 5px;
  height: 20px;
  width: fit-content;
  padding-inline: 5px;
  font-weight: 400;
  font-size: 14px;
  background-color: white;

  .rs-theme-dark & {
    background-color: #3b3f43;
  }

  & > .rs-icon {
    cursor: pointer;
  }
`

const Title = styled.label`
  display: inline;
  cursor: move;
`

/**
 * Toolbar React component properties.
 */
export interface ToolbarProps {
  /**
   * Flag if true - the toolbar is displayed in compact mode, false otherwise.
   */
  compact?: boolean
  /**
   * The CSS class name.
   */
  className?: string
}

interface ToolbarItemProps extends ToolbarProps {
  storeKey?: string
  storeType?: string
  selected: boolean
  onClone?: MouseEventHandler
  onRemove?: MouseEventHandler
  closeHint?: string
  removeHint?: string
  toolbarClassname?: string
  className?: string
}

const RawToolbarTitle = ({compact, storeKey, storeType, className}: ToolbarItemProps) => {
  return compact ? null : <Title className={className}>
    {storeKey}
    <label>{` (${storeType})`}</label>
  </Title>
}

const ToolbarTitle = customizableObserver('Component_Toolbar_Title', RawToolbarTitle)

const RawToolbarAddButton = ({className}: ToolbarItemProps) => {
  return <span className={className}>
    <AddButton/>
  </span>
}

const ToolbarAddButton = customizableObserver('Component_Toolbar_AddButton', RawToolbarAddButton)

const RawToolbarCloneButton = ({onClone, closeHint, className}: ToolbarItemProps) => {
  return <span className={className}>
    <Hinted hint={closeHint} placement={'autoVertical'}>
      <FaIcon
        data-testid="tree-clone-button"
        onClick={onClone}
        icon={faClone as unknown as IconDefinition}
        className={'clone-button'}
      />
    </Hinted>
  </span>
}

const ToolbarCloneButton = customizableObserver('Component_Toolbar_CloneButton', RawToolbarCloneButton)

const RawToolbarPresetButton = ({className}: ToolbarItemProps) => {
  return <span className={className}>
    <PresetComponentButton/>
  </span>
}

const ToolbarPresetButton = customizableObserver('Component_Toolbar_PresetComponentButton', RawToolbarPresetButton)

const RawToolbarRemoveButton = ({onRemove, removeHint, className}: ToolbarItemProps) => {
  return <span className={className}>
    <Hinted hint={removeHint} placement={'autoVertical'}>
      <FaIcon
        onClick={onRemove}
        icon={faTrash as unknown as IconDefinition}
        className={'remove-button'}
      />
    </Hinted>
  </span>
}

const ToolbarRemoveButton = customizableObserver('Component_Toolbar_RemoveButton', RawToolbarRemoveButton)

const SItems = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`

const RawToolbarItems = ({children, className}: ToolbarItemProps & { children: ReactNode }) => {
  return <SItems className={className}>{children}</SItems>
}

const ToolbarItems = customizableObserver('Component_Toolbar_Items', RawToolbarItems)

const RawToolbar = ({compact, className}: ToolbarProps) => {
  const builderStore = useBuilderStore()
  const data = useComponentData()
  const {model, parent, store, isRoot} = data
  const [{selected}] = useSelection()
  const ref = useRef<HTMLDivElement>(null)
  const t = useTranslationPart('toolbar')
  const disableRemove = useMemo(() => model.isFeatureEnabled(cfDisableComponentRemove), [model])
  const closeHint = t('cloneComponent')
  const removeHint = t('removeComponent')
  const disablePresetCreation = builderStore.presetComponentOptions.disableCreation
  const storeKey = store.key
  const storeType = store.type

  const toolbarClassname = useMemo(() => {
    const parentType = parent ? `parent-type-${parent?.model.type}` : ''
    const type = `type-${model.type}`
    return cx({compact: compact}, 'Toolbar', parentType, type)
  }, [compact, model.type, parent])

  const onClone: MouseEventHandler = useCallback(e => {
    stopEvent(e)
    builderStore.clone(data)
  }, [data, builderStore])

  const onRemove: MouseEventHandler = useCallback(e => {
    stopEvent(e)
    builderStore.remove(data)
  }, [data, builderStore])

  const customizationProps: ToolbarItemProps = useMemo(() => ({
    removeHint,
    selected,
    closeHint,
    onClone,
    compact,
    onRemove,
    storeKey,
    storeType,
    toolbarClassname
  }), [closeHint, compact, onClone, onRemove, removeHint, selected, storeKey, storeType, toolbarClassname])

  useEffect(() => {
    if (!compact && selected && ref.current) {
      scrollIntoView(ref.current, {scrollMode: 'if-needed'})
    }
  }, [selected, compact])

  return <ToolbarContainer ref={ref} className={cx(toolbarClassname, className)}>
    <ToolbarItems {...customizationProps}>
      <ToolbarTitle {...customizationProps}/>
      <ToolbarAddButton {...customizationProps}/>
      {!isRoot && <>
        <ToolbarCloneButton {...customizationProps}/>
        {!disablePresetCreation && <ToolbarPresetButton {...customizationProps}/>}
      </>}
      {!disableRemove && <ToolbarRemoveButton {...customizationProps}/>}
    </ToolbarItems>
  </ToolbarContainer>
}

export const Toolbar = customizableObserver('Component_Toolbar', RawToolbar)
