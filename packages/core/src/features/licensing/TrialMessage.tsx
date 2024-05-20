import styled from '@emotion/styled'
import {useEffect} from 'react'
import useSafeState from '../../utils/useSafeState'
import {useViewerProps} from '../form-viewer/components/ViewerPropsContext'
import {verifyLicenseKey} from './verifySign'

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
    })
  }, [licenseKey, setVerified])

  return <div>
    {!verified && <SDiv>
      <SLabel>This is a trial version of the product. To purchase a license, go to <a
        href={'https://formengine.io/pricing'}>https://formengine.io/pricing</a>
      </SLabel>
    </SDiv>}
  </div>
}

const SDiv = styled.div`
  display: flex;
  position: relative;
  background-color: #72c7ff30;
  border-radius: 6px;
  padding: 10px;
  gap: 10px;
`

const SLabel = styled.label`
  flex: 1;
`
