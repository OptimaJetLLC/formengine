import {observer} from 'mobx-react'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {Dropdown} from 'rsuite'
import {useStore} from '../../../utils/contexts/StoreContext'
import {languages} from '../consts'

export const LangSwitch = observer(() => {
  const {t} = useTranslation()
  const store = useStore()

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
