import styled from '@emotion/styled'
import type {IFormData} from '@react-form-builder/core'
import {getFluentCompatibleId, getFluentData, namedObserver, testFluentLocalization} from '@react-form-builder/core'
import {action} from 'mobx'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {Button, ButtonGroup} from 'rsuite'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import type {CalculableCodeEditorProps} from '../calculation/CalculableCodeEditor'
import {CodeEditor} from '../components/CodeEditor/CodeEditor'
import {Columns, Rows} from '../components/Containers'
import type {TestingEditorRef} from '../ui/BottomPanel/TestingEditor'
import {TestingEditor} from '../ui/BottomPanel/TestingEditor'
import {LocalizationPicker} from './components/LocalizationPicker'
import {fluentLanguageId} from './consts'
import {useTranslationPart} from './hooks'

const SDiv = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const columnsStyle = {minHeight: 0, flex: 1} as const
const rowsStyle = {minHeight: 0, minWidth: 0, flex: 1.5} as const

const RawLocalizationEditor = ({editableProperty, onClose}: CalculableCodeEditorProps) => {
  const t = useTranslationPart('common')
  const localizationStringId = getFluentCompatibleId(`${editableProperty.componentKey}_${editableProperty.annotation.key}`)
  const builderStore = useBuilderStore()
  const testingEditor = useRef<TestingEditorRef>({})

  const [language, setLanguage] = useState(builderStore.localizationLanguage)
  const initialValue = useMemo(() => {
    return editableProperty.getComputeCode('localization', {langCode: language.fullCode})
  }, [editableProperty, language])
  const [value, setValue] = useState(initialValue)
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue, language, editableProperty])

  const handleSave = useCallback(() => {
    const result = testingEditor.current.test?.()
    if (result?.error || result?.exceptions) return
    action(() => editableProperty.setComputeCode(value, 'localization', {langCode: language.fullCode}))()
  }, [editableProperty, value, language.fullCode])

  const beginContextLine = `${localizationStringId} =`
  const endContextLine = ''

  const testingFunction = useCallback(
    (formData: IFormData) => testFluentLocalization({
      localizationStringId: localizationStringId,
      localization: value,
      data: getFluentData(formData.data),
      language
    }),
    [localizationStringId, value, language]
  )

  return <Columns style={columnsStyle}>
    <Rows gap={10} style={rowsStyle}>
      <CodeEditor key={`${editableProperty.annotation.key}_${language.fullCode}`} language={fluentLanguageId}
                  initialValue={initialValue}
                  beginContextLine={beginContextLine}
                  endContextLine={endContextLine} canEditBeginContextLine={true} onChange={setValue}/>
      <SDiv>
        <ButtonGroup size={'sm'}>
          <Button appearance="primary" onClick={handleSave}>{t('save')}</Button>
          <Button appearance="ghost" onClick={onClose}>{t('close')}</Button>
        </ButtonGroup>
        <LocalizationPicker value={language.fullCode} onSelect={setLanguage}/>
      </SDiv>
    </Rows>
    <TestingEditor testingFunction={testingFunction} ref={testingEditor}/>
  </Columns>
}

export const LocalizationEditor = namedObserver('LocalizationEditor', RawLocalizationEditor)
