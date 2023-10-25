import {calculatePropertyValue} from '@react-form-builder/core'
import {EditableProperty} from '../../stores/BuilderStore'
import {GenericCodeEditor, GenericCodeEditorProps} from './GenericCodeEditor'

/**
 * Properties of the React component {@link CalculableCodeEditor}.
 */
export interface CalculableCodeEditorProps {
  /**
   * The editable property.
   */
  editableProperty: EditableProperty
  /**
   * The callback function called when the editor is closed.
   */
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

  const onCompile: GenericCodeEditorProps['onCompile'] = (sourceCode, formData) => {
    return calculatePropertyValue({fnSource: sourceCode}, formData)
  }

  return <GenericCodeEditor key={editableProperty.annotation.key}
                            beginContextLine={functionHeader}
                            endContextLine="}"
                            source={editableProperty.getComputeCode('function')}
                            onSave={saveCode}
                            onClose={onClose}
                            onCompile={onCompile}
  />
}
