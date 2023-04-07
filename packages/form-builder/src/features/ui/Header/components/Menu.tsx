import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faPrint from '@fortawesome/free-solid-svg-icons/faPrint'
import * as faSave from '@fortawesome/free-solid-svg-icons/faSave'
import * as faTrash from '@fortawesome/free-solid-svg-icons/faTrash'
import ExportIcon from '@rsuite/icons/Export'
import FileDownloadIcon from '@rsuite/icons/FileDownload'
import FileUploadIcon from '@rsuite/icons/FileUpload'
import ImportIcon from '@rsuite/icons/Import'
import {namedObserver} from 'fb-core'
import {useTranslation} from 'react-i18next'
import {Dropdown} from 'rsuite'
import {uploadBinaryFile} from '../../../../stores/fileUpload'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {LangSwitch} from '../../../localization'
import {useShowMessage} from '../../../toast/toast'
import {FaIcon} from '../../common/Icons'
import {usePromptDialog} from '../../PromptDialog'
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

export const Menu = namedObserver('Menu', () => {
  const store = useBuilderStore()
  const {t} = useTranslation()
  const showMessage = useShowMessage()
  const onSave = () => {
    store.save()
      .then(() => showMessage({type: 'success', message: t('leftMenu.formSaved')}))
      .catch(err => {
        console.error(err)
        showMessage({type: 'error', message: t('leftMenu.formSaveError')})
      })
  }
  const [onSaveAs, promptDialog] = usePromptDialog({
    title: t('leftMenu.enterFormName'), placeholder: t('leftMenu.formNamePlaceholder'),
    onOk: (value) => {
      if (value) {
        store.formName = value
        onSave()
      }
    }
  })

  return <>
    <Dropdown title={t('leftMenu.menu')} size={'sm'}>
      <Dropdown.Item onSelect={store.download.bind(store)} icon={<FileDownloadIcon/>}>
        {t('leftMenu.download')}
      </Dropdown.Item>
      <Dropdown.Item onSelect={store.upload.bind(store)} icon={<FileUploadIcon/>}>
        {t('leftMenu.upload')}
      </Dropdown.Item>
      <LangSwitch/>
      <Dropdown.Item onSelect={onSave} icon={<FaIcon icon={faSave as unknown as IconDefinition}/>}>
        {t('leftMenu.save')}
      </Dropdown.Item>
      <Dropdown.Item onSelect={onSaveAs} icon={<FaIcon icon={faSave as unknown as IconDefinition}/>}>
        {t('leftMenu.saveAs')}
      </Dropdown.Item>
      <ExportFormsButton/>
      <ImportFormsButton/>
      <Dropdown.Item /*onSelect={onPrint}*/ icon={<FaIcon icon={faPrint as unknown as IconDefinition}/>}>
        {t('leftMenu.print')}
      </Dropdown.Item>
      <Dropdown.Item onSelect={store.clear.bind(store)} icon={<FaIcon icon={faTrash as unknown as IconDefinition}/>}>
        {t('leftMenu.clear')}
      </Dropdown.Item>
    </Dropdown>
    {promptDialog}
  </>
})
