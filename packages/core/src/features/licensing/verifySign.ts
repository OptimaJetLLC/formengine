import {assemblyDate} from './assemblyDate'
import {licenseSeparator, publicKeyPem, separator} from './consts'
import {decodeB64, importPublicKey} from './utils'

async function verifySign(data: string, signature: ArrayBuffer, publicKeyString: string) {
  if (!window.crypto.subtle) return
  const publicKey = await importPublicKey(publicKeyString)
  const encoded = new TextEncoder().encode(data)
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

function verifyLicenseParams(licensePrefix: string, data: string) {
  const {licenseEndDate, restrictions, companyName} = JSON.parse(data) ?? {}

  if (licensePrefix !== companyName) return false

  const dateParts = licenseEndDate.split('.')
  if (dateParts.length !== 3) return false

  const isoDt = `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`
  const licenseEndDt = new Date(isoDt)

  const currentDate = new Date()
  if (restrictions.StrictCheck === true && licenseEndDt < currentDate) return false

  return licenseEndDt > assemblyDate
}

/**
 * Checks the license key
 * @param licenseKey the license key.
 * @returns true if the license is a valid, false otherwise.
 */
export async function verifyLicenseKey(licenseKey?: string) {
  if (!licenseKey) return

  try {
    let separatorIndex = licenseKey.indexOf(licenseSeparator)
    if (separatorIndex === -1) return false

    const licensePrefix = licenseKey.slice(0, separatorIndex)
    const license = licenseKey.slice(separatorIndex + licenseSeparator.length)

    separatorIndex = license.indexOf(separator)
    if (separatorIndex === -1) return false

    const extractedData = window.atob(license.slice(0, separatorIndex))
    const extractedSign = decodeB64(license.slice(separatorIndex + separator.length))

    const verified = await verifySign(extractedData, extractedSign, publicKeyPem)
    if (!verified) return false

    return verifyLicenseParams(licensePrefix, extractedData)
  } catch (e) {
    return false
  }
}
