import {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {Button} from 'rsuite'
import {EditableFunction} from '../../stores/EditableFunction'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {RemoveButton} from '../components/Buttons'
import {Columns} from '../components/Containers'
import LabeledProperty from '../components/LabeledProperty'
import {useTranslatedComponentProperty} from '../components/useTranslatedComponentProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import styles from './FunctionEditorInput.module.css'

const fnPrologue = `/** @type {IFormData} */
var form;
`

/**
 * The property editor for the function property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const FunctionEditorInput = (props: AnnotationEditorProps) => {
  const {value, setComputeCode, onClean, onChange, annotation, componentData} = props
  const builderStore = useBuilderStore()
  const {t} = useTranslation()

  const {label} = useTranslatedComponentProperty(annotation, componentData.model.type)
  const title = `${t('bottomPanel.editProperty')}: ${componentData.key}.${label}`
  const beginContextLine = annotation.editorProps?.beginContextLine ?? ''
  const endContextLine = annotation.editorProps?.endContextLine ?? '}'

  const onClose = useCallback(() => {
    builderStore.currentEditable = undefined
  }, [builderStore])

  const getFunctionSource = useCallback((source: string) => {
    return `return (${beginContextLine}${source}${endContextLine})`
  }, [beginContextLine, endContextLine])

  const saveCode = useCallback((source: string) => {
    const src = getFunctionSource(source)
    // we keep the full function code and the code without the non-editable parts separate.
    setComputeCode(src, 'function')
    onChange(source)
  }, [getFunctionSource, onChange, setComputeCode])

  const onCompile = useCallback((source: string) => {
    try {
      const src = getFunctionSource(source)
      const compiled = new Function('form', src)
      const result = compiled()
      return {error: false, result}
    } catch (e) {
      return {error: true, exceptions: [e as Error]}
    }
  }, [getFunctionSource])

  const handleEdit = useCallback(() => {
    const editableFunction = new EditableFunction(
      title,
      saveCode,
      onClose,
      onCompile,
      value,
      `${fnPrologue}\n${beginContextLine}`,
      endContextLine,
    )
    builderStore.editFunction(editableFunction)
  }, [beginContextLine, builderStore, endContextLine, saveCode, onClose, onCompile, title, value])

  return (
    <LabeledProperty {...props}>
      <Columns>
        <Button
          onClick={handleEdit}
          size="xs"
          appearance="ghost"
          block
          className={styles.button}
        >
          {t('annotation.code.hint')}
        </Button>
        {!!value && <RemoveButton onClick={onClean} hintPlacement="auto"/>}
      </Columns>
    </LabeledProperty>
  )
}
