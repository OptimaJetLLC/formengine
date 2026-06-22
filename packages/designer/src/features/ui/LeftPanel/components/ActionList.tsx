import type {ActionDefinition, NamedActionDefinition} from '@react-form-builder/core'
import {namedObserver, useStore} from '@react-form-builder/core'
import {useCallback, useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {Button, ButtonGroup} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {CloneButton, EditButton, RemoveButton} from '../../../components/Buttons'
import {List, ListItem, Rows} from '../../../components/Containers'

interface ActionItemProps {
  name: string
  action: ActionDefinition
}

const RawActionItem = ({name, action}: ActionItemProps) => {
  const builderStore = useBuilderStore()
  const viewerStore = useStore()

  const namedAction: NamedActionDefinition = useMemo(() => ({name, actionDefinition: action}), [name, action])
  const handleEdit = useCallback(() => builderStore.editCodeAction(namedAction), [builderStore, namedAction])
  const handleClone = useCallback(() => viewerStore.form.cloneAction(namedAction), [viewerStore, namedAction])
  const handleRemove = useCallback(() => viewerStore.form.removeAction(name), [viewerStore, name])

  return (
    <ListItem>
      <span>{name}</span>
      <ButtonGroup>
        <EditButton onClick={handleEdit} data-testid={`edit-action-${name}`}/>
        <CloneButton onClick={handleClone}/>
        <RemoveButton onClick={handleRemove} data-testid={`remove-action-${name}`}/>
      </ButtonGroup>
    </ListItem>
  )
}

const ActionItem = namedObserver('ActionItem', RawActionItem)

const RawActionList = () => {
  const builderStore = useBuilderStore()
  const viewerStore = useStore()
  const {t} = useTranslation()

  const handleAddCodeAction = useCallback(() => builderStore.addCodeAction(), [builderStore])

  const items = Object.entries(viewerStore.form.actions)
    .map(([name, action]) => {
      return <ActionItem key={name} name={name} action={action}/>
    })

  return <Rows>
    <Button block onClick={handleAddCodeAction}>{t('actions.addCodeAction')}</Button>
    <List>
      {items}
    </List>
  </Rows>
}

export const ActionList = namedObserver('ActionList', RawActionList)
