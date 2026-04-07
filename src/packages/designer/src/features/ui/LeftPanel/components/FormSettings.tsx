import cx from 'clsx'
import type {ComponentProps, HTMLAttributes} from 'react'
import {TooltipPlacementProvider} from '../../../../utils/TooltipPlacementContext'
import {Rows} from '../../../components/Containers'
import {customizableObserver} from '../../../customization/customizableObserver'
import {useTranslationPart} from '../../../localization/hooks'
import {ActionList} from './ActionList'
import {ErrorSettings} from './ErrorSettings'
import {FormLanguageSettings} from './FormLanguageSettings'
import styles from './FormSettings.module.css'
import {FormValidator} from './FormValidator'
import {ModalSettings} from './ModalSettings'
import {TooltipSettings} from './TooltipSettings'

interface BlockProps extends ComponentProps<any> {
  label: string
}

const Block = ({label, children}: BlockProps) =>
  <div>
    <h6 className={styles.blockTitle}>{label}</h6>
    {children}
  </div>

const RawFormSettings = (props: HTMLAttributes<HTMLDivElement>) => {
  const t = useTranslationPart('leftPanel.formSettings')
  return <TooltipPlacementProvider value={'autoVerticalStart'}>
    <Rows {...props} className={cx(styles.rows, props.className)}>
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
      <Block label={t('modal')}>
        <ModalSettings/>
      </Block>
      <Block label={t('language')}>
        <FormLanguageSettings/>
      </Block>
    </Rows>
  </TooltipPlacementProvider>
}

export const FormSettings = customizableObserver('Settings_Tab_Content', RawFormSettings)
