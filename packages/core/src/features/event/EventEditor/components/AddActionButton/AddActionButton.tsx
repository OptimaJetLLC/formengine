import {css} from '@emotion/css'
import PlusIcon from '@rsuite/icons/Plus'
import {assign} from 'lodash'
import {observer} from 'mobx-react'
import {useReducer, useRef, useState} from 'react'
import {IconButton} from 'rsuite'
import {useComponentData} from '../../../../../utils/contexts/ComponenDataContext'
import {useAnnotation} from '../../../../../utils/contexts/EditorContext'
import {useStore} from '../../../../../utils/contexts/StoreContext'
import {useTranslationPart} from '../../../../localization/hooks'
import {Popover} from '../../../../ui/Popover'
import {CustomActionDefinition} from '../../../types'
import {CustomActionEditor} from '../CustomActionEditor'
import {SelectAction} from './SelectAction'

export const AddActionButton = observer(() => {
  const store = useStore()
  const data = useComponentData()
  const eventName = useAnnotation().annotation.key
  const buttonRef = useRef<HTMLElement | null>(null)
  const [actionMenuOpen, toggleActionMenu] = useReducer(state => !state, false)
  const [editorData, setEditorData] = useState<CustomActionDefinition | undefined>()
  const t = useTranslationPart('actions')

  const handleSave = (value: CustomActionDefinition) => {
    store.screen.props.actions ??= {value: []}
    if (store.screen.props.actions.value.includes(editorData)) {
      assign(editorData, value)
      setEditorData(undefined)
      return
    }
    store.screen.props.actions.value.push(value)

    data.componentStore.events ??= {}
    data.componentStore.events[eventName] ??= []
    data.componentStore.events[eventName].push({name: value.name, type: 'custom'})
    setEditorData(undefined)
  }

  return (
    <>
      <IconButton ref={buttonRef} children={t('addAction')} onClick={toggleActionMenu} block icon={<PlusIcon/>} appearance="default"
                  size="sm"/>
      <Popover show={actionMenuOpen} parent={buttonRef.current} placement={'left-start'} className={css`z-index: 20`}>
        <SelectAction onClose={toggleActionMenu} onOpen={setEditorData}/>
      </Popover>

      {editorData &&
        <CustomActionEditor
          onEnter={toggleActionMenu}
          onCancel={() => setEditorData(undefined)}
          data={editorData}
          onSave={handleSave}
        />}
    </>
  )
})
