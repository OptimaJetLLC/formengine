import {ActionData, ComponentStore} from '@react-form-builder/core'
import PlusIcon from '@rsuite/icons/Plus.js'
import {observer} from 'mobx-react'
import {forwardRef, useCallback, useRef} from 'react'
import {Dropdown, IconButton, Popover, Whisper} from 'rsuite'
import type {OverlayTriggerHandle} from 'rsuite/Picker'
import {useTranslationPart} from '../../../../localization/hooks'
import {AnnotationEditorProps} from '../../../AnnotationEditorProps'
import {CommonActions} from './components/CommonActions'
import {CustomActions} from './components/CustomActions'
import {ActionsMenuProps} from './types'

export const AddActionButton = observer((props: AnnotationEditorProps) => {
  const t = useTranslationPart('actions')
  const {componentData, annotation} = props
  const store = componentData.store
  const eventName = annotation.key
  const ref = useRef<OverlayTriggerHandle>(null)

  const handleSelect = useCallback((action?: ActionData) => {
    ref.current?.close()
    if (!action) return
    ComponentStore.addEventHandler(store, eventName, action)
  }, [])

  return <Whisper placement="leftStart" ref={ref} trigger="click"
                  speaker={<MenuPopover onSelect={handleSelect} annotation={annotation}/>}>
    <IconButton icon={<PlusIcon/>} size="sm">{t('addAction')}</IconButton>
  </Whisper>
})

const MenuPopover = forwardRef(({onSelect, annotation, ...props}: ActionsMenuProps, ref: any) => (
  <Popover ref={ref} {...props} full>
    <Dropdown.Menu>
      <CommonActions onSelect={onSelect} annotation={annotation}/>
      <CustomActions onSelect={onSelect} annotation={annotation}/>
    </Dropdown.Menu>
  </Popover>
))
