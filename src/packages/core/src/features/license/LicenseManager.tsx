import type {ComponentType, PropsWithChildren} from 'react'
import {useCallback, useContext, useEffect, useMemo} from 'react'
import {namedObserver} from '../../utils'
import {useStore} from '../../utils/contexts/StoreContext'
import {createNonNullableContext} from '../../utils/createNonNullableContext'
import useSafeState from '../../utils/useSafeState'
import {useViewerProps} from '../form-viewer/components/ViewerPropsContext'
import type {LicenseData, LicenseFeatureDescription, LicenseFeatureName, Restrictions} from './license'
import {LicenseError} from './license'
import {extractLicenseKey, verifyLicenseParams} from './verify'

type LicenseErrorDescription = {
  name: LicenseError
}

type Violations = Partial<Record<LicenseFeatureName | LicenseError, LicenseFeatureDescription | LicenseErrorDescription>>

type LicenseContext = {
  /**
   * Indicates whether the license key is valid (excluding feature checks).
   */
  valid: boolean,
  /**
   * Array of violation messages.
   */
  missing: Violations,
  /**
   * Function to check license restriction.
   */
  checkLicense: (features: Array<LicenseFeatureDescription>, ...args: any) => void,
  /**
   * Indicates this is a nested form.
   */
  isNested: boolean
}

export const [
  /**
   * @internal
   * @ignore
   */
  useLicense,
  /**
   * @internal
   * @ignore
   */
  LicenseProvider,
  /**
   * @internal
   * @ignore
   */
  LicenseContext
] = createNonNullableContext<LicenseContext>('LicenseContext')

// used if not licenseKey passed, should check only features
const emptyLicense: LicenseData = {
  restrictions: {
    StrictCheck: false,
    ftLocaleCount: 1
  },
  licenseEndDate: '04.26.2130',
  companyName: ''
}

const RawLicenseManager: ComponentType<PropsWithChildren> = ({children}) => {
  const {licenseKey} = useViewerProps()
  const {parentStore} = useStore()
  const [missing, setMissing] = useSafeState<Violations>({})
  const [ready, setReady] = useSafeState<boolean>(false)
  const [valid, setValid] = useSafeState<boolean>(true)
  const [data, setData] = useSafeState<LicenseData | null>(null)
  const existingContext = useContext(LicenseContext)
  const isNested = !!parentStore

  const checkLicense = useCallback((features: Array<LicenseFeatureDescription>) => {
    if (!features || features.length === 0 || !data) return

    setMissing((prev) => {
      const {restrictions} = data
      // legacy license, StrictCheck only
      if (Object.keys(restrictions).length < 2) return prev

      const notAllowed = features.filter(f => {
        return typeof f?.check === 'undefined' && !restrictions[f.name as keyof Restrictions]
      })
      const needCheck = features.filter(f => {
        return typeof restrictions[f.name as keyof Restrictions] !== 'undefined' && typeof f?.check === 'function'
      })

      notAllowed.forEach(f => {
        prev[f.name] = {
          ...f,
          [f.name]: restrictions[f.name as keyof Restrictions]
        }
      })

      needCheck.forEach(f => {
        if (!f?.check?.(f, restrictions[f.name as keyof Restrictions])) {
          prev[f.name] = {
            ...f,
            [f.name]: restrictions[f.name as keyof Restrictions]
          }
        }
      })

      return {...prev}
    })
  }, [data, setMissing])

  const context = useMemo(() => (existingContext ?? {
    valid,
    isNested,
    missing,
    checkLicense
  }), [checkLicense, isNested, existingContext, missing, valid])

  useEffect(() => {
    if (ready && data) {
      const verificationResult = verifyLicenseParams(data)

      if (verificationResult !== null) {
        const [code, args] = verificationResult
        setMissing((prev) => ({
          ...prev,
          [code]: {
            name: code,
            ...args
          }
        }))
      }
    }
  }, [data, ready, setMissing, setValid])

  useEffect(() => {
    if (!licenseKey) {
      setMissing((prev) => ({
        ...prev,
        [LicenseError.NO_KEY]: {
          name: LicenseError.NO_KEY
        }
      }))
      setData(emptyLicense)

      return
    }

    extractLicenseKey(licenseKey).then((data) => {
      if (typeof data !== 'string') {
        setData(data)
        setValid(true)
      } else {
        setData(emptyLicense)
        setMissing((prev) => ({
          ...prev,
          [LicenseError.INVALID]: {
            name: LicenseError.INVALID
          }
        }))

        setValid(false)
        // eslint-disable-next-line no-console
        console.info(data)
      }

      setReady(true)
    })
  }, [licenseKey, setData, setMissing, setReady, setValid])

  return <LicenseProvider value={context}>{children}</LicenseProvider>
}

/**
 * @internal
 * @ignore
 */
export const LicenseManager = namedObserver('LicenseManager', RawLicenseManager)
