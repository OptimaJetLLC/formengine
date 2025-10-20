import styled from '@emotion/styled'
import {useCallback} from 'react'
import {Checkbox} from 'rsuite'
import type {CheckboxProps, ValueType} from 'rsuite/esm/Checkbox/Checkbox'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {CleanButton} from './CleanButton'

export const SCheckbox = styled(Checkbox)`
  && {
    height: 23px;
    display: flex;
    align-items: center;
    width: 100%;

    .rs-checkbox-checker {
      padding-inline-start: 0;
      margin-inline-start: -10px;
    }
  }
`

const SDiv = styled.div`
  display: flex;

  .rs-picker-clean.rs-btn-close {
    color: var(--rs-text-secondary);
  }
`

interface BooleanCheckboxProps extends AnnotationEditorProps {
  id?: string
}

const BooleanCheckbox = (props: BooleanCheckboxProps) => {
  const {id, value, onChange, onClean} = props
  const handleChange: CheckboxProps['onChange'] = useCallback((_: ValueType | undefined, checked: boolean) => {
    onChange(checked)
  }, [onChange])

  return <SDiv>
    <SCheckbox id={id} checked={!!value} onChange={handleChange}/>
    <CleanButton onClick={onClean}/>
  </SDiv>
}

/**
 * The property editor for the boolean property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const BooleanInput = (props: AnnotationEditorProps) =>
  <LabeledProperty {...props}>
    <BooleanCheckbox {...props}/>
  </LabeledProperty>
