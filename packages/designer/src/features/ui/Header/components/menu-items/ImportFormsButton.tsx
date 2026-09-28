import {Import as ImportIcon} from '@rsuite/icons'
import {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {Dropdown} from 'rsuite'
import {uploadBinaryFile} from '../../../../../stores/fileUpload'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {customizableObserver} from '../../../../customization/customizableObserver'
import {useShowMessage} from '../../../../toast/toast'
import {importForms} from '../formUtils'
import type {CustomizableMenuItemProps} from './CustomizableMenuItemProps'

const importIcon = <ImportIcon />

const RawImportFormsButton = ({className}: CustomizableMenuItemProps) => {
  const store = useBuilderStore()
  const {t} = useTranslation()
  const showMessage = useShowMessage()

  const onImport = useCallback(() => {
    uploadBinaryFile(content => {
      content
        .then(data => importForms(store, data))
        .then(() => showMessage({type: 'success', message: t('leftMenu.importFormsSuccess')}))
        .catch(err => {
          console.error(err)
          showMessage({type: 'error', message: t('leftMenu.importFormsError')})
        })
    })
  }, [store, showMessage, t])

  return (
    <Dropdown.Item onSelect={onImport} icon={importIcon} className={className}>
      {t('leftMenu.importForms')}
    </Dropdown.Item>
  )
}

export const ImportFormsButton = customizableObserver('MainMenu_Item_ImportForms', RawImportFormsButton)
