import type {CSSProperties} from 'react'
import {useEffect} from 'react'
import useSafeState from '../../utils/useSafeState'
import {useViewerProps} from '../form-viewer/components/ViewerPropsContext'
import {verifyLicenseKey} from './verifySign'

const trialDivStyle: CSSProperties = {
  display: 'flex',
  position: 'relative',
  backgroundColor: '#72c7ff30',
  borderRadius: 6,
  padding: 10,
  gap: 10
}

const labelStyle: CSSProperties = {
  flex: 1
}

/**
 * TrialMessage React component.
 * @returns the React element.
 */
export const TrialMessage = () => {
  const {licenseKey} = useViewerProps()
  const [verified, setVerified] = useSafeState(true)

  useEffect(() => {
    verifyLicenseKey(licenseKey).then(value => {
      setVerified(!!value)
    }).catch(error => {
      console.warn('License verification error:', error)
      setVerified(false)
    })
  }, [licenseKey, setVerified])

  return <div>
    {!verified && <div style={trialDivStyle}>
      <label style={labelStyle}>This is a trial version of the product. To purchase a license, go to <a
        href={'https://formengine.io/pricing'}>https://formengine.io/pricing</a>
      </label>
    </div>}
  </div>
}
