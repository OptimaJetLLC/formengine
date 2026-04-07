import type {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faRedo from '@fortawesome/free-solid-svg-icons/faRedo.js'
import * as faSave from '@fortawesome/free-solid-svg-icons/faSave.js'
import * as faUndo from '@fortawesome/free-solid-svg-icons/faUndo.js'
import cx from 'clsx'
import type {ComponentProps} from 'react'
import {useCallback, useMemo} from 'react'
import {ButtonGroup, IconButton} from 'rsuite'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {FaIcon} from '../../components/Icons'
import {customizableObserver} from '../../customization'
import {DesignerLocalizationPicker} from './components/DesignerLocalizationPicker'
import {Menu} from './components/Menu'
import {ToggleModeButton} from './components/ToggleModeButton'
import {ToggleTheme} from './components/ToggleTheme'
import {useSaveForm} from './components/useSaveForm'
import {ViewModes} from './components/ViewModes'
import styles from './Header.module.css'

const Toolbar = customizableObserver('Header_Toolbar', ButtonGroup)

const RawHeader = (props: ComponentProps<'div'>) => {
  const builderStore = useBuilderStore()
  const onSave = useSaveForm()
  const undoer = builderStore.undoer

  const handleSave = useCallback(() => onSave(), [onSave])
  const handleUndo = useCallback(() => undoer.undo(), [undoer])
  const handleRedo = useCallback(() => undoer.redo(), [undoer])

  const saveIcon = useMemo(() => <FaIcon icon={faSave as unknown as IconDefinition}/>, [])
  const undoIcon = useMemo(() => <FaIcon icon={faUndo as unknown as IconDefinition}/>, [])
  const redoIcon = useMemo(() => <FaIcon icon={faRedo as unknown as IconDefinition}/>, [])

  return (
    <div {...props} className={cx(styles.container, props.className)}>
      <div className={styles.leftPart}>
        <Menu/>
        <Toolbar size={'sm'} className={styles.toolbar}>
          {builderStore.formStorageEnabled &&
            <IconButton onClick={handleSave} data-testid={'header-save-form-button'}
                        icon={saveIcon} size={'sm'}/>
          }
          <IconButton onClick={handleUndo} disabled={!undoer.hasUndo}
                      icon={undoIcon} size={'sm'}/>
          <IconButton onClick={handleRedo} disabled={!undoer.hasRedo}
                      icon={redoIcon} size={'sm'}/>

        </Toolbar>
      </div>

      <div className={styles.centerPart}>
        <ToggleModeButton/>
      </div>

      <div className={styles.rightPart}>
        <ViewModes/>
        <DesignerLocalizationPicker/>
        <ToggleTheme/>
      </div>
    </div>
  )
}

export const Header = customizableObserver('Header', RawHeader)
