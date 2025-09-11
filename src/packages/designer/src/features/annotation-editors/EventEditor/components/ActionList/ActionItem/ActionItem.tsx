import type {ActionData, NamedActionDefinition} from '@react-form-builder/core'
import {namedObserver, useStore} from '@react-form-builder/core'
import {useCallback} from 'react'
import {ButtonGroup} from 'rsuite'
import {useBuilderStore} from '../../../../../../utils/BuilderStoreContext'
import {EditButton, RemoveButton} from '../../../../../components/Buttons'
import {Columns} from '../../../../../components/Containers'
import {ArgumentList} from './components/ArgumentList'
import {ActionDataProvider} from './contexts/ActionDataContext'

interface ActionItemProps {
  action: ActionData
  onRemove: () => void
}

const columnsStyle = {justifyContent: 'space-between', padding: 8} as const
const nameStyle = {color: 'violet', marginLeft: 5} as const

const RawActionItem = ({action, onRemove}: ActionItemProps) => {
  const builderStore = useBuilderStore()
  const viewerStore = useStore()
  const {name, type} = action
  const isCodeAction = type === 'code'
  const edit = useCallback(() => {
    const actionDefinition = viewerStore.form.actions[name]
    if (!actionDefinition) {
      console.error(`Cannot find custom action: '${name}'`)
      return
    }
    const namedAction: NamedActionDefinition = {name: name, actionDefinition}
    builderStore.editCodeAction(namedAction)
  }, [builderStore, name, viewerStore.form.actions])

  return (
    <ActionDataProvider value={action}>
      <Columns style={columnsStyle}>
        <b style={nameStyle}>
          {`${name || 'Action'}`}
        </b>
        <ButtonGroup size={'xs'}>
          {isCodeAction && <EditButton onClick={edit}/>}
          <RemoveButton onClick={onRemove}/>
        </ButtonGroup>
      </Columns>
      <ArgumentList/>
    </ActionDataProvider>
  )
}

export const ActionItem = namedObserver('ActionItem', RawActionItem)
