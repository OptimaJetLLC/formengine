import {useStore} from '@react-form-builder/core'
import {useCallback, useMemo} from 'react'
import {Dropdown} from 'rsuite'
import {useTranslationPart} from '../../../../../localization/hooks'
import type {ActionsMenuProps} from '../types'

/**
 * React form builder component that displays the list of custom actions.
 * @param props the React component properties.
 * @param props.onSelect the callback function called when an action is selected.
 * @returns the React element.
 */
export const CustomActionList = ({onSelect}: ActionsMenuProps) => {
  const store = useStore()
  const t = useTranslationPart('actions')
  const {actions} = store.formViewerPropsStore

  const handleSelect = useCallback(
    (name: string) => {
      return () => onSelect({name, type: 'custom'})
    },
    [onSelect]
  )

  const items = useMemo(
    () =>
      Object.keys(actions ?? []).map(name => (
        <Dropdown.Item key={name} eventKey={`custom-${name}`} onClick={handleSelect(name)}>
          {name}
        </Dropdown.Item>
      )),
    [actions, handleSelect]
  )

  if (!actions) return null

  return (
    <Dropdown.Menu title={t('custom')} eventKey="custom">
      {items}
    </Dropdown.Menu>
  )
}
