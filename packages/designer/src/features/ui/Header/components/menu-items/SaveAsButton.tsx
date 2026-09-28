import type {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faSave from '@fortawesome/free-solid-svg-icons/faSave.js'
import {useCallback} from 'react'
import {Dropdown} from 'rsuite'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {FaIcon} from '../../../../components/Icons'
import {customizable} from '../../../../customization/customizable'
import {useTranslationPart} from '../../../../localization/hooks'
import {useSaveFormDialog} from '../../../dialogs/useSaveFormDialog'
import {useSaveForm} from '../useSaveForm'
import type {CustomizableMenuItemProps} from './CustomizableMenuItemProps'

const saveAsIcon = <FaIcon icon={faSave as unknown as IconDefinition} />

const RawSaveAsButton = ({className}: CustomizableMenuItemProps) => {
  const builderStore = useBuilderStore()
  const t = useTranslationPart('leftMenu')
  const onSave = useSaveForm()

  const handleSaveAs = useCallback(
    (value: string) => {
      if (value) onSave(value)
    },
    [onSave]
  )

  const onSaveAs = useSaveFormDialog(handleSaveAs)

  if (!builderStore.formStorageEnabled) return null

  return (
    <Dropdown.Item onSelect={onSaveAs} icon={saveAsIcon} data-testid="main-menu-save-as" className={className}>
      {t('saveAs')}
    </Dropdown.Item>
  )
}

export const SaveAsButton = customizable('MainMenu_Item_SaveAs', RawSaveAsButton)
