import _ from 'lodash'
import {Dropdown} from 'rsuite'
import {useStore} from '../../../../../../utils/contexts/StoreContext'
import {NewActionData} from '../../../../types'
import {useGroups} from '../../../hooks/useGroups'

interface SelectActionProps {
  onSelect: (value: any) => void
}

export const SelectAction = ({onSelect}: SelectActionProps) => {
  const groups = useGroups()
  const {actions} = useStore()

  return (
    <Dropdown.Menu onSelect={onSelect}>
      <Dropdown.Menu title={'Global Actions'}>
        {
          actions.map(action =>
            <Dropdown.Item
              key={action.name}
              eventKey={{action} as NewActionData}
              children={action.name}
            />)
        }
      </Dropdown.Menu>
      <Dropdown.Menu title={'Components'}>
        {
          _.entries(groups).map(([groupName, nodes]) =>
            <div
              key={groupName}
              style={{padding: '0 15px', marginTop: 5}}
            >
              <h6>{groupName + 's'}</h6>
              {
                nodes.map((node) => (
                  <Dropdown.Menu
                    key={node.key}
                    title={node.key}
                    children={
                      node.model.actions?.map((action) =>
                        <Dropdown.Item
                          key={action.name}
                          eventKey={{target: node.data, action} as NewActionData}
                          children={action.name}
                        />
                      )
                    }
                  />
                ))
              }
            </div>)
        }
      </Dropdown.Menu>
    </Dropdown.Menu>
  )
}
