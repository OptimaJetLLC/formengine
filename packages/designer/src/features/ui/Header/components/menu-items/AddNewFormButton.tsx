import {Plus as PlusIcon} from '@rsuite/icons'
import {useCallback} from 'react'
import {Dropdown} from 'rsuite'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {useCreateForm} from '../../../../../utils/useCreateForm'
import {customizable} from '../../../../customization/customizable'
import {useTranslationPart} from '../../../../localization/hooks'
import type {CustomizableMenuItemProps} from './CustomizableMenuItemProps'

const plusIcon = <PlusIcon />

const RawAddNewFormButton = ({className}: CustomizableMenuItemProps) => {
  const builderStore = useBuilderStore()
  const t = useTranslationPart('leftMenu')
  const showPromptDialog = useCreateForm()

  const handleAddNewForm = useCallback(() => {
    showPromptDialog()
  }, [showPromptDialog])

  if (!builderStore.formStorageEnabled) return null

  return (
    <Dropdown.Item onSelect={handleAddNewForm} icon={plusIcon} className={className} data-testid="menu-add-new-form-button">
      {t('addNewForm')}
    </Dropdown.Item>
  )
}

export const AddNewFormButton = customizable('MainMenu_Item_AddNewForm', RawAddNewFormButton)
