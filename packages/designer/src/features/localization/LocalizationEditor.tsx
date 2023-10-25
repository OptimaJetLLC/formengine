import styled from '@emotion/styled'
import {getFluentCompatibleId, getFluentData, namedObserver, testFluentLocalization} from '@react-form-builder/core'
import {action} from 'mobx'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {Button, ButtonGroup} from 'rsuite'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import type {CalculableCodeEditorProps} from '../calculation/CalculableCodeEditor'
import {CodeEditor} from '../components/CodeEditor'
import {Columns, Rows} from '../components/Containers'
import {TestingEditor, TestingEditorRef} from '../ui/BottomPanel/TestingEditor'
import {LocalizationLanguagePicker} from '../ui/Header/components/LocalizationLanguagePicker'
import {fluentLanguageId} from './consts'
import {useTranslationPart} from './hooks'

export const LocalizationEditor = namedObserver('LocalizationEditor', ({editableProperty, onClose}: CalculableCodeEditorProps) => {
  const t = useTranslationPart('common')
  const localizationStringId = getFluentCompatibleId(`${editableProperty.componentKey}_${editableProperty.annotation.key}`)
  const builderStore = useBuilderStore()
  const testingEditor = useRef<TestingEditorRef>({})

  const initialValue = useMemo(() => {
    return editableProperty.getComputeCode('localization')
  }, [editableProperty, builderStore.localizationLanguage])
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue, builderStore.localizationLanguage, editableProperty])

  const handleSave = () => {
    const result = testingEditor.current.test?.()
    if (result?.error || result?.exceptions) return
    action(() => editableProperty.setComputeCode(value, 'localization'))()
  }

  const beginContextLine = `${localizationStringId} =`
  const endContextLine = ''

  const testingFunction = useCallback(
    formData => testFluentLocalization({
      localizationStringId: localizationStringId,
      localization: value,
      data: getFluentData(formData.data),
      language: builderStore.localizationLanguage
    }),
    [localizationStringId, value, builderStore.localizationLanguage]
  )

  return <Columns style={{minHeight: 0, flex: 1}}>
    <Rows gap={10} style={{minHeight: 0, minWidth: 0, flex: 1.5}}>
      <CodeEditor key={`${editableProperty.annotation.key}_${builderStore.localizationLanguage.fullCode}`} language={fluentLanguageId}
                  initialValue={initialValue}
                  beginContextLine={beginContextLine}
                  endContextLine={endContextLine} canEditBeginContextLine={true} onChange={setValue}/>
      <SDiv>
        <ButtonGroup size={'sm'}>
          <Button appearance="primary" onClick={handleSave}>{t('save')}</Button>
          <Button appearance="ghost" onClick={onClose}>{t('close')}</Button>
        </ButtonGroup>
        <LocalizationLanguagePicker/>
      </SDiv>
    </Rows>
    <TestingEditor testingFunction={testingFunction} ref={testingEditor}/>
  </Columns>
})

const SDiv = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
