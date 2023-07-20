import {ActionData, CustomActionDefinition, useComponentData} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {useCallback} from 'react'
import {Dropdown} from 'rsuite'
import {useAnnotation} from '../../../../../../utils/EditorContext'
import {CommonActions} from './components/CommonActions'
import {CustomActions} from './components/CustomActions'
import {LinkedActions} from './components/LinkedActions'

interface SelectActionProps {
  onClose: () => void
  onOpen: (action?: CustomActionDefinition) => void
}

export const SelectAction = observer(({onClose, onOpen}: SelectActionProps) => {
  const {store} = useComponentData()
  const eventName = useAnnotation().annotation.key

  const handleSelect = useCallback((action: ActionData) => {
    onClose()
    store.events ??= {}
    store.events[eventName] ??= []
    store.events[eventName].push(action)
  }, [])

  return <Dropdown.Menu>
    <CommonActions onSelect={handleSelect}/>
    <LinkedActions onSelect={handleSelect}/>
    <CustomActions onOpen={onOpen} onSelect={handleSelect}/>
  </Dropdown.Menu>
})
