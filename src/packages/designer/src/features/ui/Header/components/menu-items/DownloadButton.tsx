import {FileDownload as FileDownloadIcon} from '@rsuite/icons'
import {useCallback} from 'react'
import {Dropdown} from 'rsuite'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {customizable} from '../../../../customization/customizable'
import {useTranslationPart} from '../../../../localization/hooks'
import type {CustomizableMenuItemProps} from './CustomizableMenuItemProps'

const downloadIcon = <FileDownloadIcon/>

const RawDownloadButton = ({className}: CustomizableMenuItemProps) => {
  const builderStore = useBuilderStore()
  const t = useTranslationPart('leftMenu')
  const handleDownload = useCallback(() => builderStore.download(), [builderStore])

  return (
    <Dropdown.Item onSelect={handleDownload} icon={downloadIcon} className={className}>
      {t('download')}
    </Dropdown.Item>
  )
}

export const DownloadButton = customizable('MainMenu_Item_Download', RawDownloadButton)
