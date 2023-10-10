import styled from '@emotion/styled'
import {namedObserver} from '@react-form-builder/core'
import {useTranslationPart} from '../../../localization/hooks'
import {ActionList} from './ActionList'
import {ErrorSettings} from './ErrorSettings'
import {FormLanguageSettings} from './FormLanguageSettings'

import {TooltipSettings} from './TooltipSettings'

export const FormSettings = namedObserver('FormSettings', () => {
  const t = useTranslationPart('leftPanel.formSettings')
  return <>
    <Header marginTop={0}>{t('actions')}</Header>
    <ActionList/>
    <Header>{t('error')}</Header>
    <ErrorSettings/>
    <Header>{t('tooltip')}</Header>
    <TooltipSettings/>
    <Header>{t('language')}</Header>
    <FormLanguageSettings/>
  </>
})

const Header = styled.label<{ marginTop?: number }>`
  padding-inline: 4px;
  font-size: 16px;
  font-weight: bold;
  margin-top: ${({marginTop}) => marginTop ?? '24'}px;
`
