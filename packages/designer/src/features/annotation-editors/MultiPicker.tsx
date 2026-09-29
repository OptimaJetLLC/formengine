import type {PropertyAnnotation} from '@react-form-builder/core'
import {startCase} from '@react-form-builder/core'
import {useMemo} from 'react'
import {TagPicker} from 'rsuite'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import styles from './MultiPicker.module.css'

const prepareData = ({data}: PropertyAnnotation, values: string[]) => {
  const preparedData = data.map(di => {
    return {
      value: di.value,
      label: di.label,
    }
  })

  values?.forEach(v => {
    if (!preparedData.find(d => d.value === v)) {
      preparedData.push({value: v, label: startCase(v)})
    }
  })

  return preparedData
}

/**
 * The property editor for property of type "multiple select", displays values as select.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const MultiPicker = (props: AnnotationEditorProps) => {
  const {value, onChange, annotation, onClean} = props
  const data = useMemo(() => prepareData(annotation as PropertyAnnotation, value), [annotation, value])
  const defaultValue = useMemo(() => value ?? [], [value])

  return (
    <LabeledProperty {...props}>
      <TagPicker
        className={styles.picker}
        value={defaultValue}
        data={data}
        onChange={onChange}
        onClean={onClean}
        cleanable
        creatable
        size={'xs'}
        placement={'auto'}
        {...props.annotation.editorProps}
      />
    </LabeledProperty>
  )
}
