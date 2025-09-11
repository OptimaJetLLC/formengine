import {ComponentStore, namedObserver, useStore} from '@react-form-builder/core'
import {Plus as PlusIcon} from '@rsuite/icons'
import {useCallback} from 'react'
import {Divider, Dropdown} from 'rsuite'
import {useBuilderStore} from '../../../../../../utils/BuilderStoreContext'
import {useTranslationPart} from '../../../../../localization/hooks'
import type {ActionsMenuProps} from '../types'

const itemStyle = {position: 'relative', display: 'flex', justifyContent: 'space-between'} as const
const spanStyle = {whiteSpace: 'break-spaces'} as const
const dividerStyle = {marginTop: 0, marginBottom: 0} as const

const addButtonIcon = <PlusIcon/>

/**
 * React form builder component that displays the list of code actions.
 * @param props the React component properties.
 * @param props.onSelect the callback function called when an action is selected.
 * @param props.annotation the metadata for a React component property.
 * @returns the React element.
 */
const RawCodeActionsList = ({onSelect, annotation}: ActionsMenuProps) => {
  const store = useStore()
  const builderStore = useBuilderStore()
  const selectedStore = builderStore.oneSelected?.store
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
    <Dropdown.Item key={name} onClick={handleSelect(name)} style={itemStyle}>
      <span style={spanStyle}>{name}</span>
    </Dropdown.Item>
  ), [handleSelect])

  return <Dropdown.Menu title={t('code')} eventKey="code">
    {actionNames?.map(renderAction)}

    {!!actionNames?.length && <Dropdown.Item disabled>
      <Divider style={dividerStyle}/>
    </Dropdown.Item>}

    <Dropdown.Item icon={addButtonIcon} onClick={addAction}>
      {t('addCodeAction')}
    </Dropdown.Item>
  </Dropdown.Menu>
}

export const CodeActionsList = namedObserver('CodeActionsList', RawCodeActionsList)
