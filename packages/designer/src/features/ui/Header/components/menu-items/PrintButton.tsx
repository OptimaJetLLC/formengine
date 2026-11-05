import {faPrint} from '@fortawesome/free-solid-svg-icons'
import {useCallback} from 'react'
import {Dropdown} from 'rsuite'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {FaIcon} from '../../../../components/Icons'
import {customizable} from '../../../../customization/customizable'
import {useTranslationPart} from '../../../../localization/hooks'
import {printForm} from '../printForm'
import type {CustomizableMenuItemProps} from './CustomizableMenuItemProps'

const printIcon = <FaIcon icon={faPrint} />

const printShortcut = typeof navigator !== 'undefined' && navigator.userAgent.includes('Mac') ? '⌘P' : 'Ctrl+P'

const RawPrintButton = ({className}: CustomizableMenuItemProps) => {
  const store = useBuilderStore()
  const t = useTranslationPart('leftMenu')
  const onSelect = useCallback(() => printForm(store), [store])

  return (
    <Dropdown.Item onSelect={onSelect} icon={printIcon} className={className} shortcut={printShortcut} data-testid="main-menu-print">
      {t('print')}
    </Dropdown.Item>
  )
}

export const PrintButton = customizable('MainMenu_Item_Print', RawPrintButton)
