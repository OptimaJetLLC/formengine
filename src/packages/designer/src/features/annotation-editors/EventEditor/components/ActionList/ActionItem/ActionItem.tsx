import type {ActionData, NamedActionDefinition} from '@react-form-builder/core'
import {namedObserver, useStore} from '@react-form-builder/core'
import {useCallback} from 'react'
import {ButtonGroup} from 'rsuite'
import {useBuilderStore} from '../../../../../../utils/BuilderStoreContext'
import {EditButton, RemoveButton} from '../../../../../components/Buttons'
import {Columns} from '../../../../../components/Containers'
import {ArgumentList} from './components/ArgumentList/ArgumentList'
import {ActionDataProvider} from './contexts/ActionDataContext'

import styles from './ActionItem.module.css'

interface ActionItemProps {
  action: ActionData
  onRemove: () => void
  eventName: string
}

const RawActionItem = ({action, onRemove, eventName}: ActionItemProps) => {
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
      <Columns className={styles.columns}>
        <b className={styles.name}>
          {`${name || 'Action'}`}
        </b>
        <ButtonGroup size={'xs'}>
          {isCodeAction && <EditButton onClick={edit} data-testid={`edit-action-${eventName}-${action.type}-${action.name}`}/>}
          <RemoveButton onClick={onRemove} data-testid={`remove-action-${eventName}-${action.type}-${action.name}`}/>
        </ButtonGroup>
      </Columns>
      <ArgumentList/>
    </ActionDataProvider>
  )
}

export const ActionItem = namedObserver('ActionItem', RawActionItem)
