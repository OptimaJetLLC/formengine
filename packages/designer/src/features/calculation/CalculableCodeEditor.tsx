import {compileFn} from '@react-form-builder/core'
import {EditableProperty} from '../../stores/BuilderStore'
import {GenericCodeEditor} from './GenericCodeEditor'

/**
 * Properties of the React component {@link CalculableCodeEditor}.
 */
export interface CalculableCodeEditorProps {
  editableProperty: EditableProperty
  onClose: () => void
}

/**
 * The React form builder component that displays a code editor for a calculated property.
 * @param props props the React component properties.
 * @param props.editableProperty the parameters of the calculated component property.
 * @param props.onClose the callback function called when closing the code editor.
 * @returns the React element.
 */
export const CalculableCodeEditor = ({editableProperty, onClose}: CalculableCodeEditorProps) => {
  const saveCode = (sourceCode: string) => {
    editableProperty.setComputeCode(sourceCode, 'function')
  }

  const functionHeader = `/**
 * @param {IFormData} form
 * @return {${editableProperty.annotation.type}}
 */
function Calculation (form) {`

  return <GenericCodeEditor key={editableProperty.annotation.key}
                            beginContextLine={functionHeader}
                            endContextLine="}"
                            source={editableProperty.getComputeCode('function')}
                            onSave={saveCode}
                            onClose={onClose}
                            onCompile={compileFn}
  />
}
