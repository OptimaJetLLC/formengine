import {NamedActionDefinition, namedObserver, useStore} from '@react-form-builder/core'
import {useTranslation} from 'react-i18next'
import {Button, ButtonGroup} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {CloneButton, EditButton, RemoveButton} from '../../../components/Buttons'
import {List, ListItem, Rows} from '../../../components/Containers'

const RawActionList = () => {
  const builderStore = useBuilderStore()
  const viewerStore = useStore()
  const {t} = useTranslation()

  const items = Object.entries(viewerStore.form.actions).map(([name, action]) => {
    const namedAction: NamedActionDefinition = {name, actionDefinition: action}
    return <ListItem key={name}>
      <span>{name}</span>
      <ButtonGroup>
        <EditButton onClick={() => builderStore.editCodeAction(namedAction)}/>
        <CloneButton onClick={() => viewerStore.form.cloneAction(namedAction)}/>
        <RemoveButton onClick={() => viewerStore.form.removeAction(name)}/>
      </ButtonGroup>
    </ListItem>
  })

  return <Rows>
    <Button block onClick={() => builderStore.addCodeAction()}>{t('actions.addCodeAction')}</Button>
    <List>
      {items}
    </List>
  </Rows>
}

export const ActionList = namedObserver('ActionList', RawActionList)
