import type {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faSave from '@fortawesome/free-solid-svg-icons/faSave.js'
import {useCallback} from 'react'
import {Dropdown} from 'rsuite'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {FaIcon} from '../../../../components/Icons'
import {customizable} from '../../../../customization/customizable'
import {useTranslationPart} from '../../../../localization/hooks'
import {useSaveForm} from '../useSaveForm'
import type {CustomizableMenuItemProps} from './CustomizableMenuItemProps'

const saveIcon = <FaIcon icon={faSave as unknown as IconDefinition} />

const RawSaveButton = ({className}: CustomizableMenuItemProps) => {
  const builderStore = useBuilderStore()
  const t = useTranslationPart('leftMenu')
  const onSave = useSaveForm()

  const handleSave = useCallback(() => {
    onSave()
  }, [onSave])

  if (!builderStore.formStorageEnabled) return null

  return (
    <Dropdown.Item onSelect={handleSave} icon={saveIcon} className={className}>
      {t('save')}
    </Dropdown.Item>
  )
}

export const SaveButton = customizable('MainMenu_Item_Save', RawSaveButton)
