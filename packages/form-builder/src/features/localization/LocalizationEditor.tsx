import styled from '@emotion/styled'
import {
  getFluentCompatibleId,
  LocalizationTestResult,
  testFluentLocalization,
  useStore
} from '@react-form-builder/core'
import {action} from 'mobx'
import {observer} from 'mobx-react'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Button, ButtonGroup} from 'rsuite'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {CalculableCodeEditorProps, ErrorMessage} from '../calculation/CalculableCodeEditor'
import {CodeEditor} from '../components/CodeEditor'
import {LocalizationLanguagePicker} from '../ui/Header/components/LocalizationLanguagePicker'
import {fluentLanguageId} from './consts'

export const LocalizationEditor = observer(({editableProperty, onClose}: CalculableCodeEditorProps) => {
  const [error, setError] = useState<LocalizationTestResult | undefined>()
  const {t} = useTranslation()
  const localizationStringId = getFluentCompatibleId(`${editableProperty.componentKey}_${editableProperty.annotation.key}`)
  const viewerStore = useStore()
  const builderStore = useBuilderStore()
  const defaultLanguage = builderStore.defaultLanguage

  const getInitialValue = () => {
    let localization = viewerStore.form.localization
      .getLocalization(builderStore.localizationLanguage.fullCode, editableProperty.componentKey, editableProperty.annotation.key)
    if (!localization && !builderStore.isDefaultLanguage) {
      localization = viewerStore.form.localization
        .getLocalization(defaultLanguage.fullCode, editableProperty.componentKey, editableProperty.annotation.key)
    }
    if (!localization) {
      localization = ''
    }
    return localization
  }

  const [value, setValue] = useState('')
  const [initialValue, setInitialValue] = useState('')

  useEffect(() => {
    const initialValue = getInitialValue()
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
    editableProperty.saveProperty({computeType: 'localization'})
    viewerStore.form.localization.setLocalization(builderStore.localizationLanguage.fullCode, editableProperty.componentKey, editableProperty.annotation.key, value)
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
        <Button appearance="primary" onClick={testLocalization}>{t('localizationEditor.test')}</Button>
        <Button appearance="ghost" onClick={action(() => saveLocalization())}>{t('localizationEditor.save')}</Button>
        <Button appearance="ghost" onClick={onClose}>{t('localizationEditor.close')}</Button>
      </ButtonGroup>
      <LocalizationLanguagePicker/>
      <ErrorMessage result={error}/>
    </SDiv>
  </>
})

const SDiv = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
