import {css} from '@emotion/css'
import {namedObserver} from '@react-form-builder/core'
import type {ResizableProps} from 're-resizable'
import {Resizable} from 're-resizable'
import {CustomValidationCode, EditableAction, EditableProperty, JsonCode} from '../../../stores/BuilderStore'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {CodeActionEditor} from '../../annotation-editors/EventEditor/components/CodeActionEditor/CodeActionEditor'
import {ComputedPropertyEditor} from './ComputedPropertyEditor'
import {CustomValidationCodeEditor} from './CustomValidationCodeEditor'
import {JsonCodeEditor} from './JsonCodeEditor'

const RawBottomPanel = () => {
  const store = useBuilderStore()
  const {currentEditable, bottomPanelHeight} = store

  let editor = null
  if (currentEditable instanceof EditableAction) {
    editor = <CodeActionEditor {...currentEditable}/>
  }

  if (currentEditable instanceof EditableProperty) {
    editor = <ComputedPropertyEditor property={currentEditable}/>
  }

  if (currentEditable instanceof CustomValidationCode) {
    editor = <CustomValidationCodeEditor {...currentEditable}/>
  }

  if (currentEditable instanceof JsonCode) {
    editor = <JsonCodeEditor {...currentEditable}/>
  }

  if (!editor) return null

  const resizableProps: ResizableProps = {
    className: resizableStyles,
    enable: {top: true},
    onResizeStop: (e, direction, ref, delta) => store.bottomPanelHeight += delta.height,
    defaultSize: {width: 'initial', height: bottomPanelHeight},
    minHeight: 250,
    maxHeight: '92vh'
  }

  return <Resizable {...resizableProps}>{editor}</Resizable>
}

export const BottomPanel = namedObserver('BottomPanel', RawBottomPanel)

const resizableStyles = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 980px;
  padding: 10px;
  gap: 10px;
  box-shadow: 0 -5px 20px 0 rgb(0 0 0 / 15%);
`
