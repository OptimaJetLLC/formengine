import {faPrint} from '@fortawesome/free-solid-svg-icons'
import {useCallback, useMemo} from 'react'
import {Dropdown} from 'rsuite'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {FaIcon} from '../../../../components/Icons'
import {customizable} from '../../../../customization/customizable'
import {formatHotkeyShortcut} from '../../../../hotkeys/formatHotkeyShortcut'
import {useHotkeysProp} from '../../../../hotkeys/HotkeysPropContext'
import {resolveHotkeyBindings} from '../../../../hotkeys/resolveHotkeyBindings'
import {useTranslationPart} from '../../../../localization/hooks'
import {printForm} from '../../../../print/printForm'
import type {CustomizableMenuItemProps} from './CustomizableMenuItemProps'

const printIcon = <FaIcon icon={faPrint} />

const RawPrintButton = ({className}: CustomizableMenuItemProps) => {
  const store = useBuilderStore()
  const t = useTranslationPart('leftMenu')
  const hotkeys = useHotkeysProp()
  const onSelect = useCallback(() => printForm(store), [store])

  const printShortcut = useMemo(() => {
    const printBinding = resolveHotkeyBindings(hotkeys).find(([, action]) => action === 'print')?.[0]
    return printBinding ? formatHotkeyShortcut(printBinding) : undefined
  }, [hotkeys])

  return (
    <Dropdown.Item onSelect={onSelect} icon={printIcon} className={className} shortcut={printShortcut} data-testid="main-menu-print">
      {t('print')}
    </Dropdown.Item>
  )
}

export const PrintButton = customizable('MainMenu_Item_Print', RawPrintButton)
