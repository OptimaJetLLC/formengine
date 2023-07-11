import {ActionData, useStore} from '@react-form-builder/core'
import {Dropdown} from 'rsuite'

/**
 * React form builder component that displays the list of common actions.
 * @param props the React component properties.
 * @param props.onSelect the callback function called when an action is selected.
 * @returns the React element.
 */
export const CommonActions = ({onSelect}: { onSelect: (action: ActionData) => void }) => {
  const store = useStore()
  return (
    // todo to translation
    <Dropdown.Menu title="Common">
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
