import styled from '@emotion/styled'
import type {BaseCompilationResult, CompilationResult} from '@react-form-builder/core'
import {action} from 'mobx'
import {useEffect, useMemo, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Button, ButtonGroup} from 'rsuite'
import {CodeEditor} from '../components/CodeEditor'
import {Rows} from '../components/Containers'
import {CodeEditorErrorMessage} from './CodeEditorErrorMessage'

/**
 * Properties of the React component {@link GenericCodeEditor}.
 */
export interface GenericCodeEditorProps {
  beginContextLine?: string
  endContextLine?: string
  source?: string
  onSave: (value: string) => void
  onClose: () => void
  onCompile: (value: string) => BaseCompilationResult
}

/**
 * Generic code editor.
 * @param props the React component properties
 * @returns the React element.
 */
export const GenericCodeEditor = (props: GenericCodeEditorProps) => {
  const {t} = useTranslation()
  const codePlaceHolder = t('codeEditor.codePlaceholder')

  const propsSourceCode = useMemo(() => props.source ?? codePlaceHolder, [props.source])
  const [sourceCode, setSourceCode] = useState(propsSourceCode)
  const [compilationError, setCompilationError] = useState<CompilationResult | undefined>()
  const [initialValue, setInitialValue] = useState(propsSourceCode)

  const compileCode = () => {
    const result = props.onCompile(sourceCode)
    setCompilationError(result)
    return result
  }

  const saveCode = () => {
    const compilationResult = compileCode()
    if (compilationResult.error) return
    setCompilationError(undefined)
    props.onSave(sourceCode)
    setInitialValue(sourceCode)
  }

  useEffect(() => {
    setInitialValue(propsSourceCode)
    setSourceCode(propsSourceCode)
    setCompilationError(undefined)
  }, [propsSourceCode])

  return <Rows gap={10} style={{minHeight: 0}}>
    <CodeEditor beginContextLine={props.beginContextLine} endContextLine={props.endContextLine}
                initialValue={initialValue} onChange={setSourceCode}/>
    <SDiv>
      <ButtonGroup size={'sm'}>
        <Button appearance="primary" onClick={compileCode}>{t('codeEditor.compile')}</Button>
        <Button appearance="ghost" onClick={action(() => saveCode())}>{t('common.save')}</Button>
        <Button appearance="ghost" onClick={() => props.onClose()}>{t('common.close')}</Button>
      </ButtonGroup>
      <CodeEditorErrorMessage result={compilationError}/>
    </SDiv>
  </Rows>
}

const SDiv = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
