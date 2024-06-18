import styled from '@emotion/styled'
import type {HTMLAttributes} from 'react'
import {customizableObserver} from '../../../customization'
import {useTranslationPart} from '../../../localization/hooks'
import {ActionList} from './ActionList'
import {ErrorSettings} from './ErrorSettings'
import {FormLanguageSettings} from './FormLanguageSettings'

import {TooltipSettings} from './TooltipSettings'

const RawFormSettings = (props: HTMLAttributes<HTMLDivElement>) => {
  const t = useTranslationPart('leftPanel.formSettings')
  return <div {...props}>
    <Header marginTop={0}>{t('actions')}</Header>
    <ActionList/>
    <Header>{t('error')}</Header>
    <ErrorSettings/>
    <Header>{t('tooltip')}</Header>
    <TooltipSettings/>
    <Header>{t('language')}</Header>
    <FormLanguageSettings/>
  </div>
}

export const FormSettings = customizableObserver('Settings_Tab_Content', RawFormSettings)

const Header = styled.label<{ marginTop?: number }>`
  padding-inline: 4px;
  font-size: 16px;
  font-weight: bold;
  margin-top: ${({marginTop}) => marginTop ?? '24'}px;
`
