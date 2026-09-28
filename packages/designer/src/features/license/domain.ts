const matchHostnameWildcard = (wildcard: string, domain: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const escapedWildcard = wildcard.replace(/([.+?^${}()|\[\]\\])/g, '\\$1')
  const regexPattern = escapedWildcard.replace(/\*/g, '.*')
  const regex = new RegExp(`^${regexPattern}$`)

  return regex.test(domain)
}

/**
 * Checks if the current location satisfies the list of allowed locations.
 * @param domains the list of allowed domain wildcards.
 * @param hostname to check against.
 * @returns boolean check result.
 * @ignore
 */
export const verifyDomain = (domains: string[], hostname = globalThis.location.hostname): boolean => {
  if (domains.some(domain => domain === '*')) return true
  return domains.some(d => matchHostnameWildcard(d, hostname))
}
