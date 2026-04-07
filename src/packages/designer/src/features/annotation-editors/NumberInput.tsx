import {Close} from '@rsuite/icons'
import cx from 'clsx'
import {useCallback, useMemo} from 'react'
import {InputNumber} from 'rsuite'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import styles from './NumberInput.module.css'

/**
 * The property editor for the numeric property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const NumberInput = (props: AnnotationEditorProps) => {
  const {value, onChange, onClean, annotation, componentData} = props
  const handleChange = useCallback((value: any) => {
    if (typeof value === 'string') {
      value = Number(value)
      value = isNaN(value) ? 0 : value
    }
    onChange(value)
  }, [onChange])
  const {calculateEditorProps, ...editorProps} = annotation.editorProps ?? {}
  const inputNumberProps = {
    ...editorProps,
    ...calculateEditorProps?.(componentData),
    value: typeof value === 'number' ? value : null,
  }
  const closeButton = useMemo(
    () => <Close onClick={onClean} className={styles.closeButton}/>,
    [onClean],
  )

  return (
    <LabeledProperty {...props}>
      <InputNumber
        {...inputNumberProps}
        className={cx(styles.input, inputNumberProps.className)}
        onChange={handleChange}
        size={'xs'}
        postfix={closeButton}
      />
    </LabeledProperty>
  )
}
