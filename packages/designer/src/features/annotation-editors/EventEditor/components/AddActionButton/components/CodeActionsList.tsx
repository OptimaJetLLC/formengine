import {ComponentStore, namedObserver, useStore} from '@react-form-builder/core'
import {Plus as PlusIcon} from '@rsuite/icons'
import {Divider, Dropdown} from 'rsuite'
import {useBuilderStore} from '../../../../../../utils/BuilderStoreContext'
import {useTranslationPart} from '../../../../../localization/hooks'
import {ActionsMenuProps} from '../types'

/**
 * React form builder component that displays the list of code actions.
 * @param props the React component properties.
 * @param props.onSelect the callback function called when an action is selected.
 * @returns the React element.
 */
export const CodeActionsList = namedObserver('CodeActionsList', ({onSelect, annotation}: ActionsMenuProps) => {
  const store = useStore()
  const builderStore = useBuilderStore()
  const selectedStore = builderStore.oneSelected?.store
  const eventName = annotation.key
  const actionNames = store.form.actionNames
  const t = useTranslationPart('actions')
  const addAction = () => {
    onSelect()
    if (!selectedStore) return
    builderStore.addCustomAction(namedAction => {
      ComponentStore.addEventHandler(selectedStore, eventName, {name: namedAction.name, type: 'custom'})
    })
  }

  const renderAction = (name: string) => (
    <Dropdown.Item key={name} onClick={() => onSelect({name, type: 'custom'})}
                   style={{position: 'relative', display: 'flex', justifyContent: 'space-between'}}>
      <span style={{whiteSpace: 'break-spaces'}}>{name}</span>
    </Dropdown.Item>
  )

  return <Dropdown.Menu title={t('custom')}>
    {actionNames?.map(renderAction)}

    {!!actionNames?.length && <Dropdown.Item disabled>
      <Divider style={{marginTop: 0, marginBottom: 0}}/>
    </Dropdown.Item>}

    <Dropdown.Item children={t('addCustomAction')} icon={<PlusIcon/>} onClick={addAction}/>
  </Dropdown.Menu>
})
