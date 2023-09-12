import styled from '@emotion/styled'
import {Language, useStore} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {SelectPicker} from 'rsuite'
import type {ItemDataType} from 'rsuite/cjs/@types/common.js'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'

export const LocalizationLanguagePicker = observer(() => {
  const builderStore = useBuilderStore()
  const viewerStore = useStore()

  const langData: Record<string, Language> = {}
  builderStore.availableLanguages.forEach(language => {
    langData[language.fullCode] = language
  })

  const onLanguageSelected = (fullCode: string) => {
    const language = langData[fullCode]
    viewerStore.selectedLanguage = language
    builderStore.localizationLanguage = language
  }

  const data = Object.entries(langData).map(([key, language]) => {
    return ({value: key, label: language.name} as ItemDataType<string>)
  })
  const value = builderStore.localizationLanguage.fullCode

  return <SPicker value={value} data={data} onSelect={onLanguageSelected} cleanable={false} placement={'auto'} size={'sm'}
                  searchable={false}/>
})

const SPicker = styled(SelectPicker<string>)`
  .rs-picker-toggle-value {
    color: var(--rs-btn-default-text) !important;
  }
`
