import styled from '@emotion/styled'
import {defaultLanguage, getFluentCompatibleId, LocalizationTestResult, testFluentLocalization, useStore} from '@react-form-builder/core'
import {action} from 'mobx'
import {observer} from 'mobx-react'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Button, ButtonGroup, Checkbox} from 'rsuite'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {CodeEditorPanelProps, ErrorMessage} from '../calculation/CodeEditorPanel'
import {CodeEditor} from '../components/CodeEditor'
import {fluentLanguageId} from './consts'

export const LocalizationEditorPanel = observer(({editableProperty, onClose, onSave}: CodeEditorPanelProps) => {
  const [error, setError] = useState<LocalizationTestResult | undefined>()
  const [useFluentLocalization, setUseFluentLocalization] = useState(editableProperty.property?.useFluentLocalization ?? false)
  const {t} = useTranslation()
  const localizationStringId = getFluentCompatibleId(`${editableProperty.componentKey}_${editableProperty.annotation.key}`)
  const viewerStore = useStore()
  const builderStore = useBuilderStore()

  const getInitialValue = () => {
    let localization = viewerStore.localization
      .getLocalization(builderStore.localizationLanguage.fullCode, editableProperty.componentKey, editableProperty.annotation.key)
    if (!localization && !builderStore.isDefaultLanguage) {
      localization = viewerStore.localization
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

  useEffect(() => {
    setUseFluentLocalization(editableProperty.property?.useFluentLocalization || false)
  }, [editableProperty])

  const testLocalization = () => {
    const localizationResult = testFluentLocalization({
      localizationStringId: localizationStringId,
      localization: value,
      data: viewerStore.rootComponentData.fluentData,
      language: builderStore.localizationLanguage
    })
    setError(localizationResult)
  }

  const saveLocalization = () => {
    editableProperty.saveProperty({useFluentLocalization: useFluentLocalization})
    viewerStore.localization.setLocalization(builderStore.localizationLanguage.fullCode, editableProperty.componentKey, editableProperty.annotation.key, value)
    setInitialValue(value)
    onSave()
  }

  const beginContextLine = `${localizationStringId} =`
  const endContextLine = ''
  return <>
    <CodeEditor key={`${editableProperty.annotation.key}_${builderStore.localizationLanguage.fullCode}`} language={fluentLanguageId}
                initialValue={initialValue}
                beginContextLine={beginContextLine}
                endContextLine={endContextLine} canEditBeginContextLine={true} onChange={setValue}/>
    <SDiv>
      <ButtonGroup>
        <Button appearance="primary" onClick={testLocalization}>{t('localizationEditor.test')}</Button>
        <Button appearance="ghost" onClick={action(() => saveLocalization())}>{t('localizationEditor.save')}</Button>
        <Button appearance="ghost" onClick={onClose}>{t('localizationEditor.close')}</Button>
      </ButtonGroup>
      <Checkbox checked={useFluentLocalization} onChange={(_, checked) => setUseFluentLocalization(checked)}>
        {t('localizationEditor.useFluentLocalization')}
      </Checkbox>
    </SDiv>
    <ErrorMessage result={error}/>
  </>
})

const SDiv = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  align-items: center;
`
