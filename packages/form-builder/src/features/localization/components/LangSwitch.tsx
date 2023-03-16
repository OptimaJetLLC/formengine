import {observer} from 'mobx-react'
import {useTranslation} from 'react-i18next'
import {Dropdown} from 'rsuite'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {languages} from '../consts'

export const LangSwitch = observer(() => {
  const {t} = useTranslation()
  const store = useBuilderStore()

  const children: any[] = []
  languages.forEach((lang, index) => {
    children.push(<Dropdown.Item key={index} onSelect={() => store.language = lang} eventKey={lang.code}>
      {lang.name}
    </Dropdown.Item>)
  })

  return <Dropdown.Menu title={t('leftMenu.translation')}>
    {children}
  </Dropdown.Menu>
})
