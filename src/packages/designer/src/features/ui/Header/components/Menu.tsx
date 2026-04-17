import {faBars} from '@fortawesome/free-solid-svg-icons'
import type {HTMLAttributes, Ref} from 'react'
import {Dropdown, IconButton} from 'rsuite'
import type {WithAsProps} from 'rsuite/esm/internals/types'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {FaIcon} from '../../../components/Icons'
import {customizable} from '../../../customization/customizable'
import {MenuLanguageSwitch} from '../../../localization/components/MenuLanguageSwitch'
import {useTranslationPart} from '../../../localization/hooks'
import {AddNewFormButton} from './menu-items/AddNewFormButton'
import {ClearButton} from './menu-items/ClearButton'
import {DownloadButton} from './menu-items/DownloadButton'
import {ExportFormsButton} from './menu-items/ExportFormsButton'
import {ExportJsonFormSchemaButton} from './menu-items/ExportJsonFormSchemaButton'
import {ImportFormsButton} from './menu-items/ImportFormsButton'
import {SaveAsButton} from './menu-items/SaveAsButton'
import {SaveButton} from './menu-items/SaveButton'
import {UploadButton} from './menu-items/UploadButton'
import styles from './Menu.module.css'

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

const RawMenuItems = () => {
  const builderStore = useBuilderStore()

  return <>
    <AddNewFormButton/>
    <DownloadButton/>
    <UploadButton/>
    <MenuLanguageSwitch/>
    {builderStore.formStorageEnabled && <>
      <SaveButton/>
      <SaveAsButton/>
      <ExportFormsButton/>
      <ImportFormsButton/>
    </>}
    <ClearButton/>
    <ExportJsonFormSchemaButton/>
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
