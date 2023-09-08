import {faMarker} from '@fortawesome/free-solid-svg-icons/faMarker.js'
import {ActionData, NamedActionDefinition, useStore} from '@react-form-builder/core'
import {Close} from '@rsuite/icons'
import {observer} from 'mobx-react'
import {ButtonGroup, IconButton} from 'rsuite'
import {useBuilderStore} from '../../../../../../utils/BuilderStoreContext'
import {Columns} from '../../../../../components/Containers'
import {FaIcon} from '../../../../../components/Icons'
import {ArgumentList} from './components/ArgumentList'
import {ActionDataProvider} from './contexts/ActionDataContext'

interface ActionItemProps {
  data: ActionData
  onRemove: () => void
}

export const ActionItem = observer(({data, onRemove}: ActionItemProps) => {
  const builderStore = useBuilderStore()
  const viewerStore = useStore()
  const isCustomAction = data.type === 'custom'
  const edit = () => {
    const actionDefinition = viewerStore.form.actions[data.name]
    if (!actionDefinition) {
      console.error(`Cannot find custom action: '${data.name}'`)
      return
    }
    const namedAction: NamedActionDefinition = {name: data.name, actionDefinition}
    builderStore.editCustomAction(namedAction)
  }

  return (
    <ActionDataProvider value={data}>
      <Columns style={{justifyContent: 'space-between', padding: 8}}>
        <b style={{color: 'violet', marginLeft: 5}}>
          {`${data.name || 'Action'}`}
        </b>
        <ButtonGroup size={'xs'}>
          {isCustomAction && <IconButton onClick={edit} icon={<FaIcon icon={faMarker}/>}/>}
          <IconButton onClick={onRemove} icon={<Close/>}/>
        </ButtonGroup>
      </Columns>
      <ArgumentList/>
    </ActionDataProvider>
  )
})
