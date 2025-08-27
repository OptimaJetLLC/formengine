import {assemblyDate} from './assemblyDate'
import {licenseSeparator, publicKeyPem, separator} from './consts'
import {verifyDomain} from './domain'
import type {LicenseData} from './license'
import {LicenseError} from './license'
import {decodeB64, importPublicKey} from './utils'

const log = (...args: any[]) => {
  // eslint-disable-next-line no-console
  console.info('license check failed, error : ', args.join('\n'))
}

async function verify(data: string, signature: ArrayBuffer, publicKeyString: string) {
  if (!window.crypto.subtle) {
    log('window.crypto.subtle is not available')
    return false
  }

  let publicKey = null
  let encoded = null

  try {
    publicKey = await importPublicKey(publicKeyString)
    encoded = new TextEncoder().encode(data)
  } catch (e) {
    log(e)
    return
  }

  return await window.crypto.subtle.verify(
    {
      name: 'ECDSA',
      hash: {name: 'SHA-384'}
    },
    publicKey,
    signature,
    encoded
  )
}

/**
 * Checks if license parameters match the current environment.
 * @param data the license data to verify against.
 * @returns whether the license parameters match the current environment.
 */
export function verifyLicenseParams(data: LicenseData): [LicenseError, Record<string, any>?] | null {
  const {licenseEndDate, restrictions} = data
  const {domains, StrictCheck} = restrictions
  const dateParts = licenseEndDate.split('.')
  const isoDate = `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`
  const licenseEndDt = new Date(isoDate)

  if (domains?.length && !verifyDomain(domains)) {
    log(LicenseError.DOMAIN, domains)
    return [LicenseError.DOMAIN, {Domain: Array.isArray(domains) ? domains.join(', ') : domains}]
  }

  const currentDate = new Date()
  const dateSatisfyStrict = licenseEndDt > currentDate

  if (StrictCheck) {
    if (!dateSatisfyStrict) {
      log(LicenseError.END_DATE_STRICT, licenseEndDt)
    }
    return dateSatisfyStrict ? null : [LicenseError.END_DATE_STRICT, {licenseEndDate}]
  }

  if (assemblyDate > licenseEndDt) {
    log(LicenseError.END_DATE, licenseEndDt, assemblyDate)
    return [LicenseError.END_DATE, {licenseEndDate}]
  }

  return null
}

/**
 * Extracts the license key.
 * @param licenseKey the license key.
 * @returns the license key or an error.
 */
export async function extractLicenseKey(licenseKey: string): Promise<LicenseData | LicenseError> {
  try {
    let separatorIndex = licenseKey.indexOf(licenseSeparator)
    if (separatorIndex === -1) {
      return LicenseError.BROKEN_KEY_LICENSE_SEPARATOR
    }

    const licensePrefix = licenseKey.slice(0, separatorIndex)
    const license = licenseKey.slice(separatorIndex + licenseSeparator.length)

    separatorIndex = license.indexOf(separator)
    if (separatorIndex === -1) {
      return LicenseError.BROKEN_KEY_SEPARATOR
    }

    const extractedData = window.atob(license.slice(0, separatorIndex))
    const extractedSign = decodeB64(license.slice(separatorIndex + separator.length))
    const verified = await verify(extractedData, extractedSign, publicKeyPem)

    if (!verified) {
      return LicenseError.NOT_VERIFIED
    }

    const parsedData = JSON.parse(extractedData) as LicenseData

    // v1 - legacy license, StrictCheck only
    parsedData.version = (
      Object.keys(parsedData.restrictions).length === 1
      && typeof parsedData.restrictions.StrictCheck !== 'undefined'
    ) ? 'v1' : 'v2'

    const {licenseEndDate, companyName} = parsedData
    const dateParts = licenseEndDate.split('.')

    if (licensePrefix !== companyName) {
      log(LicenseError.PREFIX_MISMATCH)
      return LicenseError.PREFIX_MISMATCH
    }

    if (dateParts.length !== 3) {
      log(LicenseError.INVALID, licenseEndDate)
      return LicenseError.INVALID
    }

    return parsedData
  } catch (e) {
    return LicenseError.INVALID
  }
}
