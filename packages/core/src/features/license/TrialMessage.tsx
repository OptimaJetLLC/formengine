import type {CSSProperties} from 'react'
import {useCallback, useEffect, useState} from 'react'
import {namedObserver} from '../../utils'
import {useStore} from '../../utils/contexts/StoreContext'
import {useViewerProps} from '../form-viewer/components/ViewerPropsContext'
import i18n from './i18n'
import {LicenseError} from './license'
import {useLicense} from './LicenseManager'

const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  backgroundColor: '#72c7ffd0',
  borderRadius: '6px',
  padding: '1em',
  gap: '0.75em',
  zIndex: 1000
}

const listStyle: CSSProperties = {
  padding: '0',
  margin: '0 0 0 1.5em',
}

const infoStyles: CSSProperties = {
  listStyle: 'none'
}

const linkStyles: CSSProperties = {
  textAlign: 'end'
}

const RawTrialMessage = () => {
  const {missing} = useLicense()
  const {displayedLanguage, parentStore} = useStore()
  const {componentWrapper} = useViewerProps()
  const [messages, setMessages] = useState<Array<string>>([])
  const show = messages.length > 0
  const insideDesigner = !!componentWrapper
  const isNested = !!parentStore

  const updateMessages = useCallback(() => {
    let items = Object.entries(missing)

    if (!insideDesigner) {
      items = items.filter(([k]) => k !== LicenseError.NO_KEY)
    }

    const messages = items.map(([k, v]) => i18n.t(`license.${k}`, v)).sort()

    setMessages(messages)
  }, [insideDesigner, missing])

  useEffect(() => {
    i18n.init({
      lng: displayedLanguage.code
    })
    updateMessages()
  }, [displayedLanguage, updateMessages])

  if (isNested || !show) {
    return null
  }

  return <div style={containerStyle}>
    <div style={infoStyles}>
      {i18n.t('license.mismatchMessage')}
    </div>
    <ul style={listStyle}>
      {messages.map((lm) => <li key={lm}>{lm}</li>)}
    </ul>
    <div style={linkStyles}>
      <a target="_blank" href={'https://formengine.io/pricing'}>https://formengine.io/pricing</a>
    </div>
  </div>
}

/**
 * @internal
 * @ignore
 */
export const TrialMessage = namedObserver('TrialMessage', RawTrialMessage)
