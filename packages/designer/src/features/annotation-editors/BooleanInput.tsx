import cx from 'clsx'
import {useCallback} from 'react'
import {Checkbox} from 'rsuite'
import type {CheckboxProps, ValueType} from 'rsuite/esm/Checkbox/Checkbox'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import styles from './BooleanInput.module.css'
import {CleanButton} from './CleanButton'

/**
 * Styled checkbox component.
 * @param props {@link CheckboxProps}
 * @returns the React component.
 */
export const SCheckbox = (props: CheckboxProps) => <Checkbox {...props} className={cx(styles.checkbox, props.className)} />

interface BooleanCheckboxProps extends AnnotationEditorProps {
  id?: string
}

const BooleanCheckbox = (props: BooleanCheckboxProps) => {
  const {id, value, onChange, onClean} = props
  const handleChange: CheckboxProps['onChange'] = useCallback(
    (_: ValueType | undefined, checked: boolean) => {
      onChange(checked)
    },
    [onChange]
  )

  return (
    <div className={styles.row}>
      <SCheckbox id={id} checked={!!value} onChange={handleChange} />
      <CleanButton onClick={onClean} />
    </div>
  )
}

/**
 * The property editor for the boolean property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const BooleanInput = (props: AnnotationEditorProps) => (
  <LabeledProperty {...props}>
    <BooleanCheckbox {...props} />
  </LabeledProperty>
)
