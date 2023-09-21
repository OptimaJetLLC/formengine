import styled from '@emotion/styled'
import {getFluentCompatibleId, LocalizationTestResult, testFluentLocalization, useStore} from '@react-form-builder/core'
import {action} from 'mobx'
import {observer} from 'mobx-react'
import {useEffect, useState} from 'react'
import {Button, ButtonGroup} from 'rsuite'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import type {CalculableCodeEditorProps} from '../calculation/CalculableCodeEditor'
import {CodeEditorErrorMessage} from '../calculation/CodeEditorErrorMessage'
import {CodeEditor} from '../components/CodeEditor'
import {LocalizationLanguagePicker} from '../ui/Header/components/LocalizationLanguagePicker'
import {fluentLanguageId} from './consts'
import {useTranslationPart} from './hooks'

export const LocalizationEditor = observer(({editableProperty, onClose}: CalculableCodeEditorProps) => {
  const [error, setError] = useState<LocalizationTestResult | undefined>()
  const t = useTranslationPart('common')
  const localizationStringId = getFluentCompatibleId(`${editableProperty.componentKey}_${editableProperty.annotation.key}`)
  const viewerStore = useStore()
  const builderStore = useBuilderStore()

  const [value, setValue] = useState('')
  const [initialValue, setInitialValue] = useState('')

  useEffect(() => {
    const initialValue = editableProperty.getComputeCode('localization')
    setInitialValue(initialValue)
    setValue(initialValue)
  }, [editableProperty, builderStore.localizationLanguage])

  const testLocalization = () => {
    const localizationResult = testFluentLocalization({
      localizationStringId: localizationStringId,
      localization: value,
      data: viewerStore.form.componentTree.fluentData,
      language: builderStore.localizationLanguage
    })
    setError(localizationResult)
  }

  const saveLocalization = () => {
    editableProperty.setComputeCode(value, 'localization')
    setInitialValue(value)
  }

  const beginContextLine = `${localizationStringId} =`
  const endContextLine = ''
  return <>
    <CodeEditor key={`${editableProperty.annotation.key}_${builderStore.localizationLanguage.fullCode}`} language={fluentLanguageId}
                initialValue={initialValue}
                beginContextLine={beginContextLine}
                endContextLine={endContextLine} canEditBeginContextLine={true} onChange={setValue}/>
    <SDiv>
      <ButtonGroup size={'sm'}>
        <Button appearance="primary" onClick={testLocalization}>{t('test')}</Button>
        <Button appearance="ghost" onClick={action(() => saveLocalization())}>{t('save')}</Button>
        <Button appearance="ghost" onClick={onClose}>{t('close')}</Button>
      </ButtonGroup>
      <LocalizationLanguagePicker/>
      <CodeEditorErrorMessage result={error}/>
    </SDiv>
  </>
})

const SDiv = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
