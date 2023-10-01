import {faGlobe} from '@fortawesome/free-solid-svg-icons'
import {namedObserver} from '@react-form-builder/core'
import {useTranslation} from 'react-i18next'
import {Dropdown} from 'rsuite'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {FaIcon} from '../../components/Icons'

export const MenuLanguageSwitch = namedObserver('MenuLanguageSwitch', () => {
  const {t} = useTranslation()
  const builderStore = useBuilderStore()

  const children = builderStore.availableLanguages
    .map(language => {
      return <Dropdown.Item key={language.fullCode} eventKey={language.fullCode}
                            onSelect={() => builderStore.changeLanguage(language)}>
        {language.name}
      </Dropdown.Item>
    })

  return <Dropdown.Menu title={t('leftMenu.translation')} icon={<FaIcon icon={faGlobe}/>}>
    {children}
  </Dropdown.Menu>
})
