import {namedObserver, useStore} from '@react-form-builder/core'
import {useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {useLicense} from './LicenseContext'
import styles from './TrialMessage.module.css'

const RawTrialMessage = () => {
  const {missing} = useLicense()
  const {t} = useTranslation()
  const {displayedLanguage} = useStore()
  const messages = useMemo(() => {
    return Object.entries(missing)
      .map(([k, v]) => t(`license.${k}`, v as any) as string)
      .sort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, missing, displayedLanguage])
  const hide = messages.length === 0

  if (hide) {
    return null
  }

  return (
    <div className={styles.container}>
      <div>{t('license.mismatchMessage')}</div>
      <ul className={styles.list}>
        {messages.map(lm => (
          <li key={lm}>{lm}</li>
        ))}
      </ul>
      <div className={styles.link}>
        <a target="_blank" href={'https://formengine.io/pricing'} rel="noreferrer">
          https://formengine.io/pricing
        </a>
      </div>
    </div>
  )
}

/**
 * @internal
 * @ignore
 */
export const TrialMessage = namedObserver('TrialMessage', RawTrialMessage)
