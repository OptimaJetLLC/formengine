import {useStore} from '@react-form-builder/core'
import {useCallback, useMemo} from 'react'
import {Dropdown} from 'rsuite'
import {useTranslationPart} from '../../../../../localization/hooks'
import type {ActionsMenuProps} from '../types'

/**
 * React form builder component that displays the list of common actions.
 * @param props the React component properties.
 * @param props.onSelect the callback function called when an action is selected.
 * @returns the React element.
 */
export const CommonActionsList = ({onSelect}: ActionsMenuProps) => {
  const store = useStore()
  const t = useTranslationPart('actions')

  const handleSelect = useCallback((name: string) => () => onSelect({name, type: 'common'}), [onSelect])

  const items = useMemo(
    () =>
      Object.keys(store.commonActions).map(name => (
        <Dropdown.Item key={name} onClick={handleSelect(name)}>
          {name}
        </Dropdown.Item>
      )),
    [handleSelect, store.commonActions]
  )

  return (
    <Dropdown.Menu title={t('common')} eventKey="common">
      {items}
    </Dropdown.Menu>
  )
}
