import styled from '@emotion/styled'
import {ActionData, emptyComponentStore} from '@react-form-builder/core'
import {entries} from 'lodash-es'
import {Dropdown} from 'rsuite'
import {useGroups} from '../../../../hooks/useGroups'

/**
 * React form builder component that displays the list of linked actions.
 * @param props the React component properties.
 * @param props.onSelect the callback function called when an action is selected.
 * @returns the React element.
 */
export const LinkedActions = ({onSelect}: { onSelect: (action: ActionData) => void }) => {
  const groups = useGroups()

  return (
    <Dropdown.Menu title="Link">
      {
        entries(groups).map(([groupName, nodes]) =>
          <SDiv key={groupName}>
            <h6>{groupName + 's'}</h6>
            {
              nodes.map((node) => (
                <Dropdown.Menu key={node.key} title={node.key}>
                  {
                    node.model.getActions(emptyComponentStore)?.map((action) => {
                      const actionData: ActionData = {target: node.store.key, name: action.name, type: 'linked'}
                      return (
                        <Dropdown.Item
                          key={action.name}
                          onClick={() => onSelect(actionData)}
                          children={action.name}
                        />
                      )
                    })
                  }
                </Dropdown.Menu>
              ))
            }
          </SDiv>)
      }
    </Dropdown.Menu>
  )
}

const SDiv = styled.div`
  padding: 0 15px;
  margin-top: 5px;
`
