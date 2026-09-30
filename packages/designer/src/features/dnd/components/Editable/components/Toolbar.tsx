import type {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faClone from '@fortawesome/free-regular-svg-icons/faClone.js'
import * as faTrash from '@fortawesome/free-regular-svg-icons/faTrashAlt.js'
import * as faBars from '@fortawesome/free-solid-svg-icons/faBars.js'
import * as faCrosshairs from '@fortawesome/free-solid-svg-icons/faCrosshairs.js'
import {cfDisableComponentRemove, cfDisableToolbarAdd, cfSingleton, useComponentData} from '@react-form-builder/core'
import cx from 'clsx'
import type {MouseEventHandler, ReactElement, ReactNode} from 'react'
import {useCallback, useMemo, useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {stopEvent} from '../../../../../utils/stopEvent'
import {Hinted} from '../../../../annotation-editors/Hinted'
import {FaIcon} from '../../../../components/Icons'
import {customizableObserver} from '../../../../customization/customizableObserver'
import type {CustomizableKey} from '../../../../customization/types'
import {useTranslationPart} from '../../../../localization/hooks'
import {useSelection} from '../hooks/useSelection'
import {AddButton} from './AddButton'
import {NearbyTreeButton} from './NearbyTreeButton'
import {toolbarHostAttr, toolbarHubAttr, toolbarStripAttr} from './overlayRoot'
import {PresetComponentButton} from './PresetComponentButton'
import styles from './Toolbar.module.css'
import {useToolbarPosition} from './useToolbarPosition'

/**
 * Toolbar React component properties.
 */
interface ToolbarProps {
  /**
   * Flag if true - the toolbar is displayed in compact mode, false otherwise.
   */
  compact?: boolean
  /**
   * The CSS class name.
   */
  className?: string
  /**
   * The element the toolbar is positioned against.
   */
  anchor?: HTMLElement | null
}

interface ToolbarItemProps extends ToolbarProps {
  storeKey?: string
  selected: boolean
  onClone?: MouseEventHandler
  onRemove?: MouseEventHandler
  onReveal?: MouseEventHandler
  closeHint?: string
  removeHint?: string
  revealHint?: string
  toolbarClassname?: string
  className?: string
}

const menuIcon = faBars as unknown as IconDefinition

const RawToolbarTitle = ({compact, storeKey, className}: ToolbarItemProps) => {
  return compact ? null : <label className={cx(styles.title, className)}>{storeKey}</label>
}

const ToolbarTitle = customizableObserver('Component_Toolbar_Title', RawToolbarTitle)

const RawToolbarAddButton = ({className}: ToolbarItemProps) => {
  return (
    <span className={className} onClick={stopEvent}>
      <AddButton />
    </span>
  )
}

interface ActionButtonProps {
  className?: string
  icon: IconDefinition
  iconClassName?: string
  label?: string
  onClick?: MouseEventHandler
  testId?: string
}

const ActionButton = ({className, icon, iconClassName, label, onClick, testId}: ActionButtonProps) => (
  <Hinted hint={label} placement={'autoVertical'}>
    <button
      type="button"
      className={cx(styles.actionButton, iconClassName, className)}
      data-testid={testId}
      aria-label={label}
      onClick={onClick}
    >
      <FaIcon icon={icon} className={iconClassName} />
    </button>
  </Hinted>
)

const ToolbarAddButton = customizableObserver('Component_Toolbar_AddButton', RawToolbarAddButton)

const RawToolbarRevealButton = ({onReveal, revealHint, className}: ToolbarItemProps) => {
  return (
    <span className={className}>
      <ActionButton
        testId="reveal-in-tree-button"
        iconClassName="reveal-in-tree-button"
        icon={faCrosshairs as unknown as IconDefinition}
        label={revealHint}
        onClick={onReveal}
      />
    </span>
  )
}

const ToolbarRevealButton = customizableObserver('Component_Toolbar_RevealInTreeButton', RawToolbarRevealButton)

const RawToolbarNearbyTreeButton = ({className}: ToolbarItemProps) => {
  return (
    <span className={className} onClick={stopEvent}>
      <NearbyTreeButton />
    </span>
  )
}

const ToolbarNearbyTreeButton = customizableObserver('Component_Toolbar_NearbyTreeButton', RawToolbarNearbyTreeButton)

const RawToolbarCloneButton = ({onClone, closeHint, className}: ToolbarItemProps) => {
  return (
    <span className={className}>
      <ActionButton
        testId="tree-clone-button"
        iconClassName="clone-button"
        icon={faClone as unknown as IconDefinition}
        label={closeHint}
        onClick={onClone}
      />
    </span>
  )
}

const ToolbarCloneButton = customizableObserver('Component_Toolbar_CloneButton', RawToolbarCloneButton)

const RawToolbarPresetButton = ({className}: ToolbarItemProps) => {
  return (
    <span className={className}>
      <PresetComponentButton />
    </span>
  )
}

const ToolbarPresetButton = customizableObserver('Component_Toolbar_PresetComponentButton', RawToolbarPresetButton)

const RawToolbarRemoveButton = ({onRemove, removeHint, className}: ToolbarItemProps) => {
  return (
    <span className={className}>
      <ActionButton
        testId="toolbar-remove-button"
        iconClassName="remove-button"
        icon={faTrash as unknown as IconDefinition}
        label={removeHint}
        onClick={onRemove}
      />
    </span>
  )
}

const ToolbarRemoveButton = customizableObserver('Component_Toolbar_RemoveButton', RawToolbarRemoveButton)

const RawToolbarItems = ({children, className}: ToolbarItemProps & {children: ReactNode}) => {
  return <div className={cx(styles.items, className)}>{children}</div>
}

const ToolbarItems = customizableObserver('Component_Toolbar_Items', RawToolbarItems)

const RawToolbar = ({compact, className, anchor}: ToolbarProps) => {
  const builderStore = useBuilderStore()
  const data = useComponentData()
  const {model, parent, store, isRoot} = data
  const [{selected}] = useSelection()
  const ref = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)
  const storeKey = store.key
  const t = useTranslationPart('toolbar')
  const disableRemove = useMemo(() => model.isFeatureEnabled(cfDisableComponentRemove), [model])
  const disableToolbarAdd = useMemo(() => model.isFeatureEnabled(cfDisableToolbarAdd), [model])
  const closeHint = t('cloneComponent')
  const removeHint = t('removeComponent')
  const revealHint = t('revealInTree')
  const disablePresetCreation = builderStore.presetComponentOptions.disableCreation
  const singleton = model.isFeatureEnabled(cfSingleton)

  const toolbarClassname = useMemo(() => {
    const parentType = parent ? `parent-type-${parent?.model.type}` : ''
    const type = `type-${model.type}`
    return cx({compact, expanded: !compact && expanded}, parentType, type)
  }, [compact, expanded, model.type, parent])

  const onClone: MouseEventHandler = useCallback(
    e => {
      stopEvent(e)
      builderStore.clone(data)
    },
    [data, builderStore]
  )

  const onRemove: MouseEventHandler = useCallback(
    e => {
      stopEvent(e)
      builderStore.remove(data)
    },
    [data, builderStore]
  )

  const onReveal: MouseEventHandler = useCallback(
    e => {
      stopEvent(e)
      builderStore.leftPanel.revealInTree(data)
    },
    [data, builderStore]
  )

  const customizationProps: ToolbarItemProps = useMemo(
    () => ({
      removeHint,
      revealHint,
      selected,
      closeHint,
      onClone,
      compact,
      onRemove,
      onReveal,
      storeKey,
      toolbarClassname,
    }),
    [closeHint, compact, onClone, onRemove, onReveal, removeHint, revealHint, selected, storeKey, toolbarClassname]
  )
  const customization = builderStore.props.customization
  const actions = useMemo(() => {
    const items: ReactElement[] = []
    const include = (key: CustomizableKey) => !customization?.[key]?.hidden
    if (!compact) {
      if (include('Component_Toolbar_RevealInTreeButton')) {
        items.push(<ToolbarRevealButton key="reveal" {...customizationProps} />)
      }
      if (include('Component_Toolbar_NearbyTreeButton')) {
        items.push(<ToolbarNearbyTreeButton key="nearby" {...customizationProps} />)
      }
    }
    if (!disableToolbarAdd && include('Component_Toolbar_AddButton')) {
      items.push(<ToolbarAddButton key="add" {...customizationProps} />)
    }
    if (!isRoot && !singleton) {
      if (include('Component_Toolbar_CloneButton')) {
        items.push(<ToolbarCloneButton key="clone" {...customizationProps} />)
      }
      if (!disablePresetCreation && include('Component_Toolbar_PresetComponentButton')) {
        items.push(<ToolbarPresetButton key="preset" {...customizationProps} />)
      }
    }
    if (!disableRemove && include('Component_Toolbar_RemoveButton')) {
      items.push(<ToolbarRemoveButton key="remove" {...customizationProps} />)
    }
    return items
  }, [compact, customization, customizationProps, disablePresetCreation, disableRemove, disableToolbarAdd, isRoot, singleton])

  const isRTL = builderStore.isRTL
  useToolbarPosition(ref, anchor, compact, isRTL, expanded, setExpanded)

  return createPortal(
    <div ref={ref} className={cx(styles.container, toolbarClassname, className, {[styles.rtl]: isRTL})} {...{[toolbarHostAttr]: ''}}>
      <ToolbarItems {...customizationProps}>
        <ToolbarTitle {...customizationProps} />
        {actions.length > 0 && (
          <div className={styles.actions}>
            <div className={styles.strip} {...{[toolbarStripAttr]: ''}}>
              {actions.map(action => (
                <div key={action.key} className={styles.item}>
                  {action}
                </div>
              ))}
            </div>
            {!compact && !expanded && (
              <div className={styles.hub} {...{[toolbarHubAttr]: ''}}>
                <button
                  type="button"
                  className={styles.toggle}
                  aria-label={t('openActions')}
                  data-testid="toolbar-actions-button"
                  onClick={stopEvent}
                >
                  <FaIcon icon={menuIcon} className={styles.toggleIcon} />
                </button>
              </div>
            )}
          </div>
        )}
      </ToolbarItems>
    </div>,
    document.body
  )
}

export const Toolbar = customizableObserver('Component_Toolbar', RawToolbar)
