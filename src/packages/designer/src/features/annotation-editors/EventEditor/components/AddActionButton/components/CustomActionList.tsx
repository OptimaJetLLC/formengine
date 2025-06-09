import {useStore} from '@react-form-builder/core'
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

  const actions = store.formViewerPropsStore.actions
  if (!actions) return null

  const items = Object.keys(actions).map(name =>
    <Dropdown.Item key={name} children={name} onClick={() => onSelect({name, type: 'custom'})}/>
  )

  return (
    <Dropdown.Menu title={t('custom')}>
      {items}
    </Dropdown.Menu>
  )
}
