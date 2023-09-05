import {ActionDefinition, useStore} from '@react-form-builder/core'
import {Trash} from '@rsuite/icons'
import PlusIcon from '@rsuite/icons/Plus.js'
import {observer} from 'mobx-react'
import {Divider, Dropdown, IconButton} from 'rsuite'
import {EditableAction} from '../../../../../../stores/BuilderStore'
import {useBuilderStore} from '../../../../../../utils/BuilderStoreContext'
import {useTranslationPart} from '../../../../../localization/hooks'
import {ActionsMenuProps} from '../types'

/**
 * React form builder component that displays the list of custom actions.
 * @param props the React component properties.
 * @param props.onSelect the callback function called when an action is selected.
 * @returns the React element.
 */
export const CustomActions = observer(({onSelect, annotation}: ActionsMenuProps) => {
  const store = useStore()
  const builderStore = useBuilderStore()
  const eventName = annotation.key
  const actions = store.form.actionsList
  const t = useTranslationPart('actions')
  const addAction = () => {
    onSelect()
    builderStore.currentEditable = new EditableAction(eventName)
  }
  const remove = (index: number, e: any) => {
    e.stopPropagation()
    actions?.splice(index, 1)
  }

  const renderAction = ({name}: ActionDefinition, i: number) => (
    <Dropdown.Item key={name} onClick={() => onSelect({name, type: 'custom'})}
                   style={{position: 'relative', display: 'flex', justifyContent: 'space-between'}}>
      <span style={{whiteSpace: 'break-spaces'}}>{name}</span>
      <IconButton onClick={e => remove(i, e)} icon={<Trash/>} size={'xs'}
                  appearance={'subtle'} style={{minWidth: 24}}/>
    </Dropdown.Item>
  )

  return <Dropdown.Menu title={t('custom')}>
    {actions?.map(renderAction)}

    {!!actions?.length && <Dropdown.Item disabled>
      <Divider style={{marginTop: 0, marginBottom: 0}}/>
    </Dropdown.Item>}

    <Dropdown.Item children={t('addCustomAction')} icon={<PlusIcon/>} onClick={addAction}/>
  </Dropdown.Menu>
})
