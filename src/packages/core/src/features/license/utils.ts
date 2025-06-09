/**
 * Decoding the base64 string to array buffer.
 * @param data the base64 string.
 * @returns the array buffer.
 */
export function decodeB64(data: string) {
  const byteStr = window.atob(data)
  const bytes = new Uint8Array(byteStr.length)
  for (let i = 0; i < byteStr.length; i++) {
    bytes[i] = byteStr.charCodeAt(i)
  }
  return bytes
}

/**
 * Imports the public PEM key.
 * @param pem the PEM key.
 * @returns a Promise that fulfills with the imported key as a CryptoKey object.
 */
export function importPublicKey(pem: string) {
  return window.crypto.subtle.importKey(
    'spki',
    decodeB64(pem),
    {
      name: 'ECDSA',
      namedCurve: 'P-384',
    },
    true,
    ['verify'],
  )
}
