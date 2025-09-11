import {css} from '@emotion/css'
import styled from '@emotion/styled'
import {Plus} from '@rsuite/icons'
import {useCallback, useMemo} from 'react'
import {Button} from 'rsuite'
import {Rows} from '../components/Containers'
import LabeledProperty from '../components/LabeledProperty'
import {useTranslationPart} from '../localization/hooks'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {CleanButton, CrossButton} from './CleanButton'
import {JsonInput} from './JsonInput'

const InputRows = styled(Rows)`
  overflow-y: auto;
  max-height: 160px;
`

const SDiv = styled.div`
  display: flex;
  margin-left: 4px;
  margin-bottom: 4px;
  margin-top: 4px;
`

const CleanDiv = styled.div`
  display: flex;
  justify-content: end;
`

const crossButtonClass = css`
  color: var(--rs-text-primary);
`

const valueIsObject = (value: string): void => {
  const parsed = JSON.parse(value)
  if (typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('The value must be an object')
  }
}

const buttonStyle = {marginTop: 10} as const

const sDivInlineStyle = {
  marginLeft: 4,
  marginBottom: 4,
  marginTop: 4
} as const

/**
 * The property editor for the array of objects property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const ArrayOfObjectInput = (props: AnnotationEditorProps) => {
  const {value, onChange, onClean, annotation} = props
  const t = useTranslationPart('propertiesEditor')

  const items: unknown[] = useMemo(() => value ?? [], [value])

  const handleOnChange = useCallback((value: any, index: number) => {
    const data = [...items]
    data[index] = value
    onChange(data)
  }, [onChange, items])

  const onAdd = useCallback(() => {
    onChange?.([...items, {}])
  }, [onChange, items])

  const onRemove = useCallback((index: number) => {
    items.splice(index, 1)
    onChange?.([...items])
  }, [onChange, items])

  const changeHandlers = useMemo(() => items.map((_, idx) => (value: any) => handleOnChange(value, idx)), [items, handleOnChange])
  const cleanHandlers = useMemo(() => items.map((_, idx) => () => handleOnChange({}, idx)), [items, handleOnChange])
  const removeHandlers = useMemo(() => items.map((_, idx) => () => onRemove(idx)), [items, onRemove])

  const inputs = items.map((item, index) => {
    const editorTitle = `${props.componentData.key}.${annotation.name}[${index}]`
    return <SDiv key={editorTitle} style={sDivInlineStyle}>
      <JsonInput editorKey={editorTitle} editorTitle={editorTitle} value={item}
                 onChange={changeHandlers[index]}
                 onClean={cleanHandlers[index]}
                 onValidate={valueIsObject}/>
      <CrossButton onClick={removeHandlers[index]} hint={t('removeRow')} className={crossButtonClass}/>
    </SDiv>
  })

  return <>
    <LabeledProperty {...props}>
      <CleanDiv>
        <CleanButton onClick={onClean} className={crossButtonClass}/>
      </CleanDiv>
    </LabeledProperty>
    <InputRows gap={0}>
      {inputs}
    </InputRows>
    <Button appearance="default" size="sm" onClick={onAdd} style={buttonStyle} block>
      <Plus/>
    </Button>
  </>
}
