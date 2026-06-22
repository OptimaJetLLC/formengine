import type {ActionData} from '@react-form-builder/core'
import {ComponentStore, forwardRef, namedObserver} from '@react-form-builder/core'
import {Plus as PlusIcon} from '@rsuite/icons'
import {useCallback, useMemo, useRef} from 'react'
import {Dropdown, IconButton, Popover, Whisper} from 'rsuite'
import type {OverlayTriggerHandle} from 'rsuite/esm/internals/Picker'
import {useTranslationPart} from '../../../../localization/hooks'
import type {AnnotationEditorProps} from '../../../AnnotationEditorProps'
import {CodeActionsList} from './components/CodeActionsList'
import {CommonActionsList} from './components/CommonActionsList'
import {CustomActionList} from './components/CustomActionList'
import type {ActionsMenuProps} from './types'

const MenuPopover = forwardRef(({onSelect, annotation, componentData, ...props}: ActionsMenuProps, ref: any) => (
  <Popover ref={ref} {...props} full>
    <Dropdown.Menu>
      <CommonActionsList onSelect={onSelect} annotation={annotation} componentData={componentData}/>
      <CodeActionsList onSelect={onSelect} annotation={annotation} componentData={componentData}/>
      <CustomActionList onSelect={onSelect} annotation={annotation} componentData={componentData}/>
    </Dropdown.Menu>
  </Popover>
))

const addButtonIcon = <PlusIcon/>

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

  const speaker = useMemo(() => {
    return <MenuPopover onSelect={handleSelect} annotation={annotation} componentData={componentData}/>
  }, [handleSelect, annotation, componentData])

  return <Whisper placement="leftStart" ref={ref} trigger="click" speaker={speaker}>
    <IconButton icon={addButtonIcon} size="sm" data-testid={`${eventName}-add-button`}>{t('addAction')}</IconButton>
  </Whisper>
}

export const AddActionButton = namedObserver('AddActionButton', RawAddActionButton)
