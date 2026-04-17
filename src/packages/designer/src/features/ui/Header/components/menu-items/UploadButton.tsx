import {FileUpload as FileUploadIcon} from '@rsuite/icons'
import {useCallback} from 'react'
import {Dropdown} from 'rsuite'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {customizable} from '../../../../customization/customizable'
import {useTranslationPart} from '../../../../localization/hooks'
import type {CustomizableMenuItemProps} from './CustomizableMenuItemProps'

const uploadIcon = <FileUploadIcon/>

const RawUploadButton = ({className}: CustomizableMenuItemProps) => {
  const builderStore = useBuilderStore()
  const t = useTranslationPart('leftMenu')
  const handleUpload = useCallback(() => builderStore.upload(), [builderStore])

  return (
    <Dropdown.Item onSelect={handleUpload} icon={uploadIcon} className={className}>
      {t('upload')}
    </Dropdown.Item>
  )
}

export const UploadButton = customizable('MainMenu_Item_Upload', RawUploadButton)
