import styled from '@emotion/styled'
import {defaultLanguage, useStore} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {SelectPicker} from 'rsuite'
import {ItemDataType} from 'rsuite/cjs/@types/common.js'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {languages} from '../../../localization/consts'

export const LocalizationLanguagePicker = observer(() => {
  const builderStore = useBuilderStore()
  const viewerStore = useStore()
  const {localizationLanguage} = builderStore
  const {name} = localizationLanguage

  const onLanguageSelected = (languageName: string) => {
    viewerStore.selectedLanguage
      = builderStore.localizationLanguage
      = languages.find(l => l.name === languageName) ?? defaultLanguage
  }

  const getLanguages = () => {
    return languages.map(l => {
      return {value: l.name, label: l.name} as ItemDataType<string>
    })
  }

  return <SPicker value={name} data={getLanguages()} onSelect={onLanguageSelected}></SPicker>
})

const SPicker = styled(SelectPicker<string>)`
  .rs-picker-toggle-value {
    color: var(--rs-btn-default-text) !important;
  }
`
