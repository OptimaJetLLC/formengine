import {ActionData, useStore} from 'fb-core'
import {Dropdown} from 'rsuite'

export const CommonActions = ({onSelect}: { onSelect: (action: ActionData) => void }) => {
  const store = useStore()
  return (
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
