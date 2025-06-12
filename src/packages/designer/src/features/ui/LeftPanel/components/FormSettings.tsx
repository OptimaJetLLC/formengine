import type {ComponentProps, HTMLAttributes} from 'react'
import {TooltipPlacementProvider} from '../../../../utils/TooltipPlacementContext'
import {Rows} from '../../../components/Containers'
import {customizableObserver} from '../../../customization'
import {useTranslationPart} from '../../../localization/hooks'
import {ActionList} from './ActionList'
import {ErrorSettings} from './ErrorSettings'
import {FormLanguageSettings} from './FormLanguageSettings'
import {FormValidator} from './FormValidator'
import {TooltipSettings} from './TooltipSettings'

interface BlockProps extends ComponentProps<any> {
  label: string
}

const blockStyle = {marginBottom: 4}

const Block = ({label, children}: BlockProps) =>
  <div>
    <h6 style={blockStyle}>{label}</h6>
    {children}
  </div>

const rowsStyle = {paddingInline: 4}

const RawFormSettings = (props: HTMLAttributes<HTMLDivElement>) => {
  const t = useTranslationPart('leftPanel.formSettings')
  return <TooltipPlacementProvider value={'autoVerticalStart'}>
    <Rows style={rowsStyle} gap={10} {...props}>
      <Block label={t('actions')}>
        <ActionList/>
      </Block>
      <Block label={t('formValidator')}>
        <FormValidator/>
      </Block>
      <Block label={t('error')}>
        <ErrorSettings/>
      </Block>
      <Block label={t('tooltip')}>
        <TooltipSettings/>
      </Block>
      <Block label={t('language')}>
        <FormLanguageSettings/>
      </Block>
    </Rows>
  </TooltipPlacementProvider>
}

export const FormSettings = customizableObserver('Settings_Tab_Content', RawFormSettings)
