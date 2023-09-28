import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import * as faSave from '@fortawesome/free-solid-svg-icons/faSave.js'
import * as faTrash from '@fortawesome/free-solid-svg-icons/faTrash.js'
import {namedObserver} from '@react-form-builder/core'
import {Export as ExportIcon, FileDownload as FileDownloadIcon, FileUpload as FileUploadIcon, Import as ImportIcon} from '@rsuite/icons'
import {Ref} from 'react'
import {useTranslation} from 'react-i18next'
import {Dropdown, IconButton} from 'rsuite'
import type {WithAsProps} from 'rsuite/esm/@types/common'
import {uploadBinaryFile} from '../../../../stores/fileUpload'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {FaIcon} from '../../../components/Icons'
import {MenuLanguageSwitch} from '../../../localization'
import {useShowMessage} from '../../../toast/toast'
import {exportForms, importForms} from './formUtils'

const ExportFormsButton = namedObserver('ExportFormsButton', () => {
  const store = useBuilderStore()
  const {t} = useTranslation()
  const showMessage = useShowMessage()

  const onExport = () => {
    exportForms(store, 'forms.zip')
      .then(() => showMessage({type: 'success', message: t('leftMenu.exportFormsSuccess')}))
      .catch(err => {
        console.error(err)
        showMessage({type: 'error', message: t('leftMenu.exportFormsError')})
      })
  }

  return <Dropdown.Item onSelect={onExport} icon={<ExportIcon/>}>
    {t('leftMenu.exportForms')}
  </Dropdown.Item>
})

const ImportFormsButton = namedObserver('ImportFormsButton', () => {
  const store = useBuilderStore()
  const {t} = useTranslation()
  const showMessage = useShowMessage()

  const onImport = () => {
    uploadBinaryFile(content => content
      .then(data => importForms(store, data))
      .then(() => showMessage({type: 'success', message: t('leftMenu.importFormsSuccess')}))
      .catch(err => {
        console.error(err)
        showMessage({type: 'error', message: t('leftMenu.importFormsError')})
      })
    )
  }

  return <Dropdown.Item onSelect={onImport} icon={<ImportIcon/>}>
    {t('leftMenu.importForms')}
  </Dropdown.Item>
})

const renderToggle = (props: WithAsProps, ref: Ref<any>) => <IconButton icon={<FaIcon icon={faBars}/>}  {...props} ref={ref} size={'sm'}
                                                                        appearance={'primary'}/>

export const Menu = namedObserver('Menu', () => {
  const builderStore = useBuilderStore()
  const {t} = useTranslation()
  const showMessage = useShowMessage()
  const onSave = (formName?: string) => {
    builderStore.save(formName)
      .then(() => showMessage({type: 'success', message: t('leftMenu.formSaved')}))
      .catch(err => {
        console.error(err)
        showMessage({type: 'error', message: t('leftMenu.formSaveError')})
      })
  }
  const onSaveAs = () => {
    builderStore.showPromptModal({
      value: '',
      title: t('leftMenu.enterFormName'),
      placeholder: t('leftMenu.formNamePlaceholder'),
      onOk: value => {
        if (value) onSave(value)
      }
    })
  }

  return <>
    <Dropdown title={t('leftMenu.menu')} size={'sm'} renderToggle={renderToggle}>
      <Dropdown.Item onSelect={builderStore.download.bind(builderStore)} icon={<FileDownloadIcon/>}>
        {t('leftMenu.download')}
      </Dropdown.Item>
      <Dropdown.Item onSelect={builderStore.upload.bind(builderStore)} icon={<FileUploadIcon/>}>
        {t('leftMenu.upload')}
      </Dropdown.Item>
      <MenuLanguageSwitch/>
      {builderStore.formStorageEnabled && <>
        <Dropdown.Item onSelect={onSave} icon={<FaIcon icon={faSave as unknown as IconDefinition}/>}>
          {t('leftMenu.save')}
        </Dropdown.Item>
        <Dropdown.Item onSelect={onSaveAs} icon={<FaIcon icon={faSave as unknown as IconDefinition}/>}>
          {t('leftMenu.saveAs')}
        </Dropdown.Item>
        <ExportFormsButton/>
        <ImportFormsButton/>
      </>}
      <Dropdown.Item onSelect={builderStore.clear.bind(builderStore)} icon={<FaIcon icon={faTrash as unknown as IconDefinition}/>}>
        {t('leftMenu.clear')}
      </Dropdown.Item>
    </Dropdown>
  </>
})
