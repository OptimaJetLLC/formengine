import {namedObserver, useStore} from '@react-form-builder/core'
import type {CSSProperties} from 'react'
import {useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {useLicense} from './LicenseContext'

const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
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

const linkStyles: CSSProperties = {
  textAlign: 'end'
}

const RawTrialMessage = () => {
  const {missing} = useLicense()
  const {t} = useTranslation()
  const {displayedLanguage} = useStore()
  const messages = useMemo(() => {
    return Object.entries(missing).map(([k, v]) => t(`license.${k}`, v as any)).sort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, missing, displayedLanguage])
  const hide = messages.length === 0

  if (hide) {
    return null
  }

  return <div style={containerStyle}>
    <div>
      {t('license.mismatchMessage')}
    </div>
    <ul style={listStyle}>
      {messages.map((lm) => <li key={lm}>{lm}</li>)}
    </ul>
    <div style={linkStyles}>
      <a target="_blank" href={'https://formengine.io/pricing'} rel="noreferrer">https://formengine.io/pricing</a>
    </div>
  </div>
}

/**
 * @internal
 * @ignore
 */
export const TrialMessage = namedObserver('TrialMessage', RawTrialMessage)
