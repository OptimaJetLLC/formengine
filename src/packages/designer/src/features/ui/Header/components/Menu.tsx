import type {IconDefinition} from '@fortawesome/fontawesome-common-types'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import * as faSave from '@fortawesome/free-solid-svg-icons/faSave.js'
import * as faTrash from '@fortawesome/free-solid-svg-icons/faTrash.js'
import {namedObserver} from '@react-form-builder/core'
import {Export as ExportIcon, FileDownload as FileDownloadIcon, FileUpload as FileUploadIcon, Import as ImportIcon} from '@rsuite/icons'
import type {HTMLAttributes, Ref} from 'react'
import {useCallback, useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {Dropdown, IconButton} from 'rsuite'
import type {WithAsProps} from 'rsuite/esm/internals/types'
import {uploadBinaryFile} from '../../../../stores/fileUpload'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {FaIcon} from '../../../components/Icons'
import {customizable} from '../../../customization'
import {MenuLanguageSwitch} from '../../../localization'
import {useShowMessage} from '../../../toast/toast'
import {useSaveFormDialog} from '../../dialogs/useSaveFormDialog'
import {exportForms, importForms} from './formUtils'
import {useSaveForm} from './useSaveForm'

const menuStyle = {width: 'fit-content'} as const

const RawExportFormsButton = () => {
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

  const exportIcon = useMemo(() => <ExportIcon/>, [])

  return <Dropdown.Item onSelect={onExport} icon={exportIcon}>
    {t('leftMenu.exportForms')}
  </Dropdown.Item>
}

const ExportFormsButton = namedObserver('ExportFormsButton', RawExportFormsButton)

const RawImportFormsButton = () => {
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
      }
    )
  }, [store, showMessage, t])

  const importIcon = useMemo(() => <ImportIcon/>, [])

  return <Dropdown.Item onSelect={onImport} icon={importIcon}>
    {t('leftMenu.importForms')}
  </Dropdown.Item>
}

const ImportFormsButton = namedObserver('ImportFormsButton', RawImportFormsButton)

const RawWrapper = (props: HTMLAttributes<HTMLDivElement>) => <div {...props}/>
const Wrapper = customizable('MainMenu_Button', RawWrapper)

const barsIcon = <FaIcon icon={faBars}/>

const renderToggle = (props: WithAsProps, ref: Ref<any>) => (
  <Wrapper>
    <IconButton icon={barsIcon} {...props} ref={ref} size={'sm'}
                appearance={'primary'}/>
  </Wrapper>
)

const MenuDropdown = customizable('MainMenu_Dropdown', Dropdown)

const RawMenu = () => {
  const builderStore = useBuilderStore()
  const {t} = useTranslation()
  const onSave = useSaveForm()

  const handleSaveAs = useCallback((value: string) => {
    if (value) onSave(value)
  }, [onSave])

  const onSaveAs = useSaveFormDialog(handleSaveAs)
  const handleDownload = useCallback(() => builderStore.download(), [builderStore])
  const handleUpload = useCallback(() => builderStore.upload(), [builderStore])
  const handleClear = useCallback(() => builderStore.clear(), [builderStore])
  const fileDownloadIcon = useMemo(() => <FileDownloadIcon/>, [])
  const fileUploadIcon = useMemo(() => <FileUploadIcon/>, [])
  const saveIcon = useMemo(() => <FaIcon icon={faSave as unknown as IconDefinition}/>, [])
  const saveAsIcon = useMemo(() => <FaIcon icon={faSave as unknown as IconDefinition}/>, [])
  const trashIcon = useMemo(() => <FaIcon icon={faTrash as unknown as IconDefinition}/>, [])

  return <>
    <MenuDropdown title={t('leftMenu.menu')} size={'sm'} renderToggle={renderToggle} menuStyle={menuStyle}>
      <Dropdown.Item onSelect={handleDownload} icon={fileDownloadIcon}>
        {t('leftMenu.download')}
      </Dropdown.Item>
      <Dropdown.Item onSelect={handleUpload} icon={fileUploadIcon}>
        {t('leftMenu.upload')}
      </Dropdown.Item>
      <MenuLanguageSwitch/>
      {builderStore.formStorageEnabled && <>
        <Dropdown.Item onSelect={onSave} icon={saveIcon}>
          {t('leftMenu.save')}
        </Dropdown.Item>
        <Dropdown.Item onSelect={onSaveAs} icon={saveAsIcon}>
          {t('leftMenu.saveAs')}
        </Dropdown.Item>
        <ExportFormsButton/>
        <ImportFormsButton/>
      </>}
      <Dropdown.Item onSelect={handleClear} data-testid="main-menu-clear"
                     icon={trashIcon}>
        {t('leftMenu.clear')}
      </Dropdown.Item>
    </MenuDropdown>
  </>
}

export const Menu = namedObserver('Menu', RawMenu)
