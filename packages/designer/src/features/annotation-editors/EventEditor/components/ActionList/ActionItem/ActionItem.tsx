import {ActionData, NamedActionDefinition, namedObserver, useStore} from '@react-form-builder/core'
import {ButtonGroup} from 'rsuite'
import {useBuilderStore} from '../../../../../../utils/BuilderStoreContext'
import {EditButton, RemoveButton} from '../../../../../components/Buttons'
import {Columns} from '../../../../../components/Containers'
import {ArgumentList} from './components/ArgumentList'
import {ActionDataProvider} from './contexts/ActionDataContext'

interface ActionItemProps {
  data: ActionData
  onRemove: () => void
}

export const ActionItem = namedObserver('ActionItem', ({data, onRemove}: ActionItemProps) => {
  const builderStore = useBuilderStore()
  const viewerStore = useStore()
  const isCodeAction = data.type === 'code'
  const edit = () => {
    const actionDefinition = viewerStore.form.actions[data.name]
    if (!actionDefinition) {
      console.error(`Cannot find custom action: '${data.name}'`)
      return
    }
    const namedAction: NamedActionDefinition = {name: data.name, actionDefinition}
    builderStore.editCodeAction(namedAction)
  }

  return (
    <ActionDataProvider value={data}>
      <Columns style={{justifyContent: 'space-between', padding: 8}}>
        <b style={{color: 'violet', marginLeft: 5}}>
          {`${data.name || 'Action'}`}
        </b>
        <ButtonGroup size={'xs'}>
          {isCodeAction && <EditButton onClick={edit}/>}
          <RemoveButton onClick={onRemove}/>
        </ButtonGroup>
      </Columns>
      <ArgumentList/>
    </ActionDataProvider>
  )
})
