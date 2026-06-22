import {ComponentStore, namedObserver, useStore} from '@react-form-builder/core'
import {Plus as PlusIcon} from '@rsuite/icons'
import {useCallback} from 'react'
import {Divider, Dropdown} from 'rsuite'
import {useBuilderStore} from '../../../../../../utils/BuilderStoreContext'
import {useTranslationPart} from '../../../../../localization/hooks'
import type {ActionsMenuProps} from '../types'
import styles from './CodeActionsList.module.css'

const addButtonIcon = <PlusIcon/>

/**
 * React form builder component that displays the list of code actions.
 * @param props the React component properties.
 * @returns the React element.
 */
const RawCodeActionsList = (props: ActionsMenuProps) => {
  const {onSelect, annotation, componentData} = props
  const store = useStore()
  const builderStore = useBuilderStore()
  const selectedStore = componentData.store
  const eventName = annotation.key
  const actionNames = store.form.actionNames
  const t = useTranslationPart('actions')

  const addAction = useCallback(() => {
    onSelect()
    if (!selectedStore) return
    builderStore.addCodeAction(namedAction => {
      ComponentStore.addEventHandler(selectedStore, eventName, {name: namedAction.name, type: 'code'})
    })
  }, [onSelect, selectedStore, builderStore, eventName])

  const handleSelect = useCallback((name: string) => () => onSelect({name, type: 'code'}), [onSelect])

  const renderAction = useCallback((name: string) => (
    <Dropdown.Item key={name} onClick={handleSelect(name)} className={styles.item}>
      <span className={styles.name}>{name}</span>
    </Dropdown.Item>
  ), [handleSelect])

  return <Dropdown.Menu title={t('code')} eventKey="code" data-testid={'dropdown-menu-code-actions'}>
    {actionNames?.map(renderAction)}

    {!!actionNames?.length && <Dropdown.Item disabled>
      <Divider className={styles.divider}/>
    </Dropdown.Item>}

    <Dropdown.Item icon={addButtonIcon} onClick={addAction} data-testid={'dropdown-item-add-code-action'}>
      {t('addCodeAction')}
    </Dropdown.Item>
  </Dropdown.Menu>
}

export const CodeActionsList = namedObserver('CodeActionsList', RawCodeActionsList)
