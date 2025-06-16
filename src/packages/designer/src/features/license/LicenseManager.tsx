import {namedObserver} from '@react-form-builder/core'
import type {ComponentType, PropsWithChildren} from 'react'
import {useCallback, useEffect, useMemo} from 'react'
import type {LicenseData, LicenseFeatureDescription, Restrictions, Violations} from './license'
import {LicenseError} from './license'
import {LicenseProvider} from './LicenseContext'
import useSafeState from './useSafeState'
import {useTreeChecker} from './useTreeChecker'
import {extractLicenseKey, verifyLicenseParams} from './verify'

// used if not licenseKey passed, should check only features
const emptyLicense: LicenseData = {
  restrictions: {
    StrictCheck: false,
    ftLocaleCount: 1
  },
  version: 'v2',
  licenseEndDate: '04.26.2130',
  companyName: ''
}

const RawLicenseManager: ComponentType<PropsWithChildren<{ licenseKey?: string }>> = ({children, licenseKey = ''}) => {
  const [missing, setMissing] = useSafeState<Violations>({})
  const [ready, setReady] = useSafeState<boolean>(false)
  const [valid, setValid] = useSafeState<boolean>(true)
  const [data, setData] = useSafeState<LicenseData | null>(null)
  const [currentViewerFeatures, viewerFeaturesList] = useTreeChecker()

  const checkLicense = useCallback((features: Array<LicenseFeatureDescription>) => {
    if (!features || features.length === 0 || !data) return

    setMissing((prev) => {
      const {version, restrictions} = data

      if (version === 'v1') return prev

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
      }

      setReady(true)
    })
  }, [licenseKey, setData, setMissing, setReady, setValid])

  useEffect(() => {
    if (!data || data.version === 'v1') return

    setMissing((prev) => {
      const next = {...prev}
      const {restrictions} = data

      for (const [key] of viewerFeaturesList.entries()) {
        delete next[key]
      }

      for (const f of currentViewerFeatures) {
        next[f.name] = {
          ...f,
          [f.name]: restrictions[f.name as keyof Restrictions]
        }
      }

      return next
    })
  }, [setMissing, currentViewerFeatures, viewerFeaturesList, data])


  const context = useMemo(() => ({
    valid,
    missing,
    checkLicense
  }), [checkLicense, missing, valid])

  return <LicenseProvider value={context}>{children}</LicenseProvider>
}

/**
 * @internal
 * @ignore
 */
export const LicenseManager = namedObserver('LicenseManager', RawLicenseManager)
