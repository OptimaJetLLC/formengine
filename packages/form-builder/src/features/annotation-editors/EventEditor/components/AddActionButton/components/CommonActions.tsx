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
export const CommonActions = ({onSelect}: ActionsMenuProps) => {
  const store = useStore()
  const t = useTranslationPart('actions')
  return (
    <Dropdown.Menu title={t('common')}>
      {
        store.actions.map(action =>
          <Dropdown.Item
            key={action.name}
            onClick={() => onSelect({name: action.name, type: 'common'})}
            children={action.name}
          />)
      }
    </Dropdown.Menu>
  )
}
