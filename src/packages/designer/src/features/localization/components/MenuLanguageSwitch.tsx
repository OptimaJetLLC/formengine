import {faGlobe} from '@fortawesome/free-solid-svg-icons'
import type {Language} from '@react-form-builder/core'
import cx from 'clsx'
import {useCallback, useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {Dropdown} from 'rsuite'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {FaIcon} from '../../components/Icons'
import {customizable} from '../../customization/customizable'
import {customizableObserver} from '../../customization/customizableObserver'
import {AiIcon} from './AiIcon'
import {renderLanguageItem} from './LocalizationPicker'
import styles from './MenuLanguageSwitch.module.css'

interface LanguageItemProps {
  language: Language
  className?: string
}

const LanguageItem = ({language, className}: LanguageItemProps) => {
  const isEnglish = language.fullCode === 'en-US'

  return (
    <div className={cx(styles.row, className)}>
      {renderLanguageItem(language)}
      {!isEnglish && <AiIcon/>}
    </div>
  )
}

const customizableLanguageCode = (language: Language) => {
  return language.fullCode.replace('-', '_')
}

const RawMenuLanguageSwitch = ({className}: { className?: string }) => {
  const {t} = useTranslation()
  const builderStore = useBuilderStore()
  const currentLanguageCode = builderStore.formBuilderLanguage.fullCode

  const handleLanguageSelect = useCallback((language: any) => {
    return () => {
      builderStore.changeLanguage(language).then(() => {
        builderStore.props.onBuilderLanguageChange?.(language)
      })
    }
  }, [builderStore])

  const globeIcon = useMemo(() => <FaIcon icon={faGlobe}/>, [])

  const children = useMemo(() => builderStore.availableLanguages
      .map(language => {
        const code = customizableLanguageCode(language)
        const LangItemComponent = customizable(
          `MainMenu_Item_LanguageItem_${code}`,
          function item(itemProps: LanguageItemProps) {
            return <LanguageItem className={itemProps.className} language={language}/>
          }
        )

        return <Dropdown.Item key={language.fullCode}
                              eventKey={language.fullCode}
                              active={currentLanguageCode === language.fullCode}
                              onSelect={handleLanguageSelect(language)}>
          <LangItemComponent/>
        </Dropdown.Item>
      })
    , [builderStore.availableLanguages, currentLanguageCode, handleLanguageSelect])

  return <Dropdown.Menu title={t('leftMenu.translation')} icon={globeIcon} className={className}>
    {children}
  </Dropdown.Menu>
}

export const MenuLanguageSwitch = customizableObserver('MainMenu_Item_LanguageSwitch', RawMenuLanguageSwitch)
