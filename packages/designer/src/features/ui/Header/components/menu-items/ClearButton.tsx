import type {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faTrash from '@fortawesome/free-solid-svg-icons/faTrash.js'
import {useCallback} from 'react'
import {Dropdown} from 'rsuite'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {FaIcon} from '../../../../components/Icons'
import {customizable} from '../../../../customization/customizable'
import {useTranslationPart} from '../../../../localization/hooks'
import type {CustomizableMenuItemProps} from './CustomizableMenuItemProps'

const trashIcon = <FaIcon icon={faTrash as unknown as IconDefinition}/>

const RawClearButton = ({className}: CustomizableMenuItemProps) => {
  const builderStore = useBuilderStore()
  const t = useTranslationPart('leftMenu')
  const handleClear = useCallback(() => builderStore.clear(), [builderStore])

  return (
    <Dropdown.Item onSelect={handleClear} data-testid="main-menu-clear" icon={trashIcon} className={className}>
      {t('clear')}
    </Dropdown.Item>
  )
}

export const ClearButton = customizable('MainMenu_Item_Clear', RawClearButton)
