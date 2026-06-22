import {Export as ExportIcon} from '@rsuite/icons'
import {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {Dropdown} from 'rsuite'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {customizableObserver} from '../../../../customization/customizableObserver'
import {useShowMessage} from '../../../../toast/toast'
import {exportForms} from '../formUtils'
import type {CustomizableMenuItemProps} from './CustomizableMenuItemProps'

const exportIcon = <ExportIcon/>

const RawExportFormsButton = ({className}: CustomizableMenuItemProps) => {
  const store = useBuilderStore()
  const {t} = useTranslation()
  const showMessage = useShowMessage()

  const onExport = useCallback(() => {
    exportForms(store, 'forms.zip')
      .then(() => showMessage({type: 'success', message: t('leftMenu.exportFormsSuccess')}))
      .catch(err => {
        console.error(err)
        showMessage({type: 'error', message: t('leftMenu.exportFormsError')})
      })
  }, [store, showMessage, t])

  return (
    <Dropdown.Item onSelect={onExport} icon={exportIcon} className={className}>
      {t('leftMenu.exportForms')}
    </Dropdown.Item>
  )
}

// eslint-disable-next-line no-secrets/no-secrets
export const ExportFormsButton = customizableObserver('MainMenu_Item_ExportForms', RawExportFormsButton)
