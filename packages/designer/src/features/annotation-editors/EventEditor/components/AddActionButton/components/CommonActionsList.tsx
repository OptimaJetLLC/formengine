import {useStore} from '@react-form-builder/core'
import {Dropdown} from 'rsuite'
import {useTranslationPart} from '../../../../../localization/hooks'
import {ActionsMenuProps} from '../types'

/**
 * React form builder component that displays the list of common actions.
 * @param props the React component properties.
 * @param props.onSelect the callback function called when an action is selected.
 * @returns the React element.
 */
export const CommonActionsList = ({onSelect}: ActionsMenuProps) => {
  const store = useStore()
  const t = useTranslationPart('actions')

  const items = Object.keys(store.commonActions).map(name =>
    <Dropdown.Item key={name} children={name} onClick={() => onSelect({name, type: 'common'})}/>
  )

  return (
    <Dropdown.Menu title={t('common')}>
      {items}
    </Dropdown.Menu>
  )
}
