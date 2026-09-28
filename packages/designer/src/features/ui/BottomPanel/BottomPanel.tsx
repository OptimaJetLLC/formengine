import {namedObserver} from '@react-form-builder/core'
import type {ResizableProps} from 're-resizable'
import {Resizable} from 're-resizable'
import {Fragment, useMemo} from 'react'
import {CustomValidationCode, EditableAction, EditableProperty, JsonCode} from '../../../stores/BuilderStore'
import {EditableFormValidator} from '../../../stores/EditableFormValidator'
import {EditableFunction} from '../../../stores/EditableFunction'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {CodeActionEditor} from '../../annotation-editors/EventEditor/components/CodeActionEditor/CodeActionEditor'
import styles from './BottomPanel.module.css'
import {ComputedPropertyEditor} from './ComputedPropertyEditor'
import {CustomValidationCodeEditor} from './CustomValidationCodeEditor'
import {FormValidatorCodeEditor} from './FormValidatorCodeEditor'
import {FunctionEditor} from './FunctionEditor'
import {JsonCodeEditor} from './JsonCodeEditor'

const getBottomPanelEditorKey = (
  editable: EditableAction | EditableProperty | CustomValidationCode | JsonCode | EditableFormValidator | EditableFunction
): string => {
  switch (true) {
    case editable instanceof EditableAction:
      return `bottomPanel:action:${editable.namedAction.name}`
    case editable instanceof EditableProperty:
      return `bottomPanel:property:${editable.componentKey}:${editable.annotation.name}`
    case editable instanceof CustomValidationCode:
      return `bottomPanel:customValidation:${editable.editorKey}`
    case editable instanceof JsonCode:
      return `bottomPanel:json:${editable.editorKey}`
    case editable instanceof EditableFormValidator:
      return `bottomPanel:formValidator:${editable.editorKey}`
    case editable instanceof EditableFunction:
      return `bottomPanel:function:${editable.header}`
    default: {
      console.warn('unknown editable', editable)
      return 'editable:unknown'
    }
  }
}

const RawBottomPanel = () => {
  const store = useBuilderStore()
  const {currentEditable, bottomPanelHeight} = store

  let editor = null
  if (currentEditable instanceof EditableAction) {
    editor = <CodeActionEditor {...currentEditable} />
  }

  if (currentEditable instanceof EditableProperty) {
    editor = <ComputedPropertyEditor property={currentEditable} />
  }

  if (currentEditable instanceof CustomValidationCode) {
    editor = <CustomValidationCodeEditor {...currentEditable} />
  }

  if (currentEditable instanceof JsonCode) {
    editor = <JsonCodeEditor {...currentEditable} />
  }

  if (currentEditable instanceof EditableFormValidator) {
    editor = <FormValidatorCodeEditor {...currentEditable} />
  }

  if (currentEditable instanceof EditableFunction) {
    editor = <FunctionEditor {...currentEditable} />
  }

  const resizableProps: ResizableProps = useMemo(
    () => ({
      className: styles.resizable,
      enable: {top: true},
      // eslint-disable-next-line react-hooks/immutability
      onResizeStop: (e, direction, ref, delta) => (store.bottomPanelHeight += delta.height),
      defaultSize: {width: 'initial', height: bottomPanelHeight},
      minHeight: 250,
      maxHeight: '92vh',
    }),
    [bottomPanelHeight, store]
  )

  if (!editor || !currentEditable) return null

  return (
    <Resizable {...resizableProps}>
      <Fragment key={getBottomPanelEditorKey(currentEditable)}>{editor}</Fragment>
    </Resizable>
  )
}

export const BottomPanel = namedObserver('BottomPanel', RawBottomPanel)
