import {ActionData, CustomActionDefinition} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {useCallback} from 'react'
import {Dropdown} from 'rsuite'
import type {AnnotationEditorProps} from '../../../../AnnotationEditorProps'
import {CommonActions} from './components/CommonActions'
import {CustomActions} from './components/CustomActions'

interface SelectActionProps extends AnnotationEditorProps {
  onClose: () => void
  onOpen: (action?: CustomActionDefinition) => void
}

export const SelectAction = observer(({onClose, onOpen, annotation, componentData}: SelectActionProps) => {
  const {store} = componentData
  const eventName = annotation.key

  const handleSelect = useCallback((action: ActionData) => {
    onClose()
    store.events ??= {}
    store.events[eventName] ??= []
    store.events[eventName].push(action)
  }, [])

  return <Dropdown.Menu>
    <CommonActions onSelect={handleSelect}/>
    <CustomActions onOpen={onOpen} onSelect={handleSelect}/>
  </Dropdown.Menu>
})
