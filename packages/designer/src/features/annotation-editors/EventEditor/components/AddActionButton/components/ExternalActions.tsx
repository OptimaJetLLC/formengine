import {useStore} from '@react-form-builder/core'
import {Dropdown} from 'rsuite'
import {useTranslationPart} from '../../../../../localization/hooks'
import type {ActionsMenuProps} from '../types'

/**
 * React form builder component that displays the list of external actions.
 * @param props the React component properties.
 * @param props.onSelect the callback function called when an action is selected.
 * @returns the React element.
 */
export const ExternalActions = ({onSelect}: ActionsMenuProps) => {
  const store = useStore()
  const t = useTranslationPart('actions')

  const actions = store.externalActions
  if (!actions) return null

  const items = Object.keys(actions).map(name =>
    <Dropdown.Item key={name} children={name} onClick={() => onSelect({name, type: 'external'})}/>
  )

  return (
    <Dropdown.Menu title={t('external')}>
      {items}
    </Dropdown.Menu>
  )
}
