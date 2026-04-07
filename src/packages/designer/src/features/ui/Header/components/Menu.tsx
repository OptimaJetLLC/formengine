import type {IconDefinition} from '@fortawesome/fontawesome-common-types'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {faSitemap} from '@fortawesome/free-solid-svg-icons'
import * as faSave from '@fortawesome/free-solid-svg-icons/faSave.js'
import * as faTrash from '@fortawesome/free-solid-svg-icons/faTrash.js'
import {namedObserver} from '@react-form-builder/core'
import {
  Export as ExportIcon,
  FileDownload as FileDownloadIcon,
  FileUpload as FileUploadIcon,
  Import as ImportIcon,
  Plus as PlusIcon
} from '@rsuite/icons'
import type {HTMLAttributes, Ref} from 'react'
import {useCallback, useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {Dropdown, IconButton} from 'rsuite'
import type {WithAsProps} from 'rsuite/esm/internals/types'
import {uploadBinaryFile} from '../../../../stores/fileUpload'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {useCreateForm} from '../../../../utils/useCreateForm'
import {FaIcon} from '../../../components/Icons'
import {customizable} from '../../../customization'
import {MenuLanguageSwitch} from '../../../localization'
import {useTranslationPart} from '../../../localization/hooks'
import {useShowMessage} from '../../../toast/toast'
import {useSaveFormDialog} from '../../dialogs/useSaveFormDialog'
import {exportForms, importForms} from './formUtils'
import {useSaveForm} from './useSaveForm'
import styles from './Menu.module.css'

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
const plusIcon = <PlusIcon/>
const sitemapIcon = <FaIcon icon={faSitemap}/>

const renderToggle = (props: WithAsProps, ref: Ref<any>) => (
  <Wrapper>
    <IconButton icon={barsIcon} {...props} ref={ref} size={'sm'}
                appearance={'primary'}/>
  </Wrapper>
)

const MenuDropdown = customizable('MainMenu_Dropdown', Dropdown)

const RawMenuItems = () => {
  const builderStore = useBuilderStore()
  const t = useTranslationPart('leftMenu')
  const onSave = useSaveForm()

  const handleSaveAs = useCallback((value: string) => {
    if (value) onSave(value)
  }, [onSave])

  const handleGenerateSchema = useCallback(() => {
    builderStore.downloadJsonFormSchema()
  }, [builderStore])

  const onSaveAs = useSaveFormDialog(handleSaveAs)
  const handleDownload = useCallback(() => builderStore.download(), [builderStore])
  const handleUpload = useCallback(() => builderStore.upload(), [builderStore])
  const handleClear = useCallback(() => builderStore.clear(), [builderStore])
  const fileDownloadIcon = useMemo(() => <FileDownloadIcon/>, [])
  const fileUploadIcon = useMemo(() => <FileUploadIcon/>, [])
  const saveIcon = useMemo(() => <FaIcon icon={faSave as unknown as IconDefinition}/>, [])
  const saveAsIcon = useMemo(() => <FaIcon icon={faSave as unknown as IconDefinition}/>, [])
  const trashIcon = useMemo(() => <FaIcon icon={faTrash as unknown as IconDefinition}/>, [])

  const showPromptDialog = useCreateForm()

  return <>
    {builderStore.formStorageEnabled && (
      <Dropdown.Item onSelect={showPromptDialog} icon={plusIcon}
                     data-testid="menu-add-new-form-button">
        {t('addNewForm')}
      </Dropdown.Item>
    )}
    <Dropdown.Item onSelect={handleDownload} icon={fileDownloadIcon}>
      {t('download')}
    </Dropdown.Item>
    <Dropdown.Item onSelect={handleUpload} icon={fileUploadIcon}>
      {t('upload')}
    </Dropdown.Item>
    <MenuLanguageSwitch/>
    {builderStore.formStorageEnabled && <>
      <Dropdown.Item onSelect={onSave} icon={saveIcon}>
        {t('save')}
      </Dropdown.Item>
      <Dropdown.Item onSelect={onSaveAs} icon={saveAsIcon}>
        {t('saveAs')}
      </Dropdown.Item>
      <ExportFormsButton/>
      <ImportFormsButton/>
    </>}
    <Dropdown.Item onSelect={handleClear} data-testid="main-menu-clear"
                   icon={trashIcon}>
      {t('clear')}
    </Dropdown.Item>
      {builderStore.props.generateJsonFormSchema &&
        <Dropdown.Item onSelect={handleGenerateSchema} icon={sitemapIcon}>
          {t('exportJsonFormSchema')}
        </Dropdown.Item>
      }
  </>
}

const MenuItems = customizable('MainMenu_Items', RawMenuItems)

/**
 * Main menu component for the form builder header.
 * @returns the React element.
 */
export const Menu = () => {
  const t = useTranslationPart('leftMenu')
  return (
    <MenuDropdown title={t('menu')} size={'sm'} renderToggle={renderToggle} className={styles.menu}>
      <MenuItems/>
    </MenuDropdown>
  )
}
