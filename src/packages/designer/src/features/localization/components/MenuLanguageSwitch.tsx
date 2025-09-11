import styled from '@emotion/styled'
import {faGlobe} from '@fortawesome/free-solid-svg-icons'
import {namedObserver} from '@react-form-builder/core'
import {useCallback, useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {Dropdown} from 'rsuite'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {FaIcon} from '../../components/Icons'
import {AiIcon} from './AiIcon'
import {renderLanguageItem} from './LocalizationPicker'

const SDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
`

const RawMenuLanguageSwitch = () => {
  const {t} = useTranslation()
  const builderStore = useBuilderStore()
  const currentLanguageCode = builderStore.formBuilderLanguage.fullCode

  const handleLanguageSelect = useCallback((language: any) => {
    return () => builderStore.changeLanguage(language)
  }, [builderStore])

  const globeIcon = useMemo(() => <FaIcon icon={faGlobe}/>, [])

  const children = useMemo(() => builderStore.availableLanguages
    .map(language => {
      const isEnglish = language.fullCode === 'en-US'
      return <Dropdown.Item key={language.fullCode} eventKey={language.fullCode}
                            active={currentLanguageCode === language.fullCode}
                            onSelect={handleLanguageSelect(language)}>
        <SDiv>
          {renderLanguageItem(language)}
          {!isEnglish && <AiIcon/>}
        </SDiv>
      </Dropdown.Item>
    }), [builderStore.availableLanguages, currentLanguageCode, handleLanguageSelect])

  return <Dropdown.Menu title={t('leftMenu.translation')} icon={globeIcon}>
    {children}
  </Dropdown.Menu>
}

export const MenuLanguageSwitch = namedObserver('MenuLanguageSwitch', RawMenuLanguageSwitch)
