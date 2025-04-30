import type {ActionData} from '@react-form-builder/core'
import {ComponentStore, forwardRef, namedObserver} from '@react-form-builder/core'
import {Plus as PlusIcon} from '@rsuite/icons'
import {useCallback, useRef} from 'react'
import {Dropdown, IconButton, Popover, Whisper} from 'rsuite'
import type {OverlayTriggerHandle} from 'rsuite/esm/internals/Picker'
import {useTranslationPart} from '../../../../localization/hooks'
import type {AnnotationEditorProps} from '../../../AnnotationEditorProps'
import {CodeActionsList} from './components/CodeActionsList'
import {CommonActionsList} from './components/CommonActionsList'
import {CustomActionList} from './components/CustomActionList'
import type {ActionsMenuProps} from './types'

const MenuPopover = forwardRef(({onSelect, annotation, ...props}: ActionsMenuProps, ref: any) => (
  <Popover ref={ref} {...props} full>
    <Dropdown.Menu>
      <CommonActionsList onSelect={onSelect} annotation={annotation}/>
      <CodeActionsList onSelect={onSelect} annotation={annotation}/>
      <CustomActionList onSelect={onSelect} annotation={annotation}/>
    </Dropdown.Menu>
  </Popover>
))

const RawAddActionButton = (props: AnnotationEditorProps) => {
  const t = useTranslationPart('actions')
  const {componentData, annotation} = props
  const store = componentData.store
  const eventName = annotation.key
  const ref = useRef<OverlayTriggerHandle>(null)

  const handleSelect = useCallback((action?: ActionData) => {
    ref.current?.close()
    if (!action) return
    ComponentStore.addEventHandler(store, eventName, action)
  }, [ref, store, eventName])

  return <Whisper placement="leftStart" ref={ref} trigger="click"
                  speaker={<MenuPopover onSelect={handleSelect} annotation={annotation}/>}>
    <IconButton icon={<PlusIcon/>} size="sm">{t('addAction')}</IconButton>
  </Whisper>
}

export const AddActionButton = namedObserver('AddActionButton', RawAddActionButton)
