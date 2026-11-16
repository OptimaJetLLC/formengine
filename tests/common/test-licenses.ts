/* eslint-disable no-secrets/no-secrets -- Vite define placeholders, not secret values */

// @ts-ignore Vite define placeholder injected at build time
const invalidLicenseKey = __FORMENGINE_TEST_LICENSE_invalidLicenseKey__
// @ts-ignore Vite define placeholder injected at build time
export const testLicense = __FORMENGINE_TEST_LICENSE_testLicense__
// @ts-ignore Vite define placeholder injected at build time
const licenseBusiness2024AnyDomain = __FORMENGINE_TEST_LICENSE_licenseBusiness2024AnyDomain__
// @ts-ignore Vite define placeholder injected at build time
const licenseBusiness2024MultipleDomains = __FORMENGINE_TEST_LICENSE_licenseBusiness2024MultipleDomains__
// @ts-ignore Vite define placeholder injected at build time
const licenseBusiness2024NoDomain = __FORMENGINE_TEST_LICENSE_licenseBusiness2024NoDomain__
// @ts-ignore Vite define placeholder injected at build time
const licenseBusiness2030AnyDomain = __FORMENGINE_TEST_LICENSE_licenseBusiness2030AnyDomain__
// @ts-ignore Vite define placeholder injected at build time
const licenseBusiness2030MultipleDomains = __FORMENGINE_TEST_LICENSE_licenseBusiness2030MultipleDomains__
// @ts-ignore Vite define placeholder injected at build time
const licenseBusiness2030NoDomain = __FORMENGINE_TEST_LICENSE_licenseBusiness2030NoDomain__
// @ts-ignore Vite define placeholder injected at build time
const licenseBusinessStrict2024AnyDomain = __FORMENGINE_TEST_LICENSE_licenseBusinessStrict2024AnyDomain__
// @ts-ignore Vite define placeholder injected at build time
const licenseBusinessStrict2024MultipleDomains = __FORMENGINE_TEST_LICENSE_licenseBusinessStrict2024MultipleDomains__
// @ts-ignore Vite define placeholder injected at build time
const licenseBusinessStrict2024NoDomain = __FORMENGINE_TEST_LICENSE_licenseBusinessStrict2024NoDomain__
// @ts-ignore Vite define placeholder injected at build time
const licenseBusinessStrict2030AnyDomain = __FORMENGINE_TEST_LICENSE_licenseBusinessStrict2030AnyDomain__
// @ts-ignore Vite define placeholder injected at build time
const licenseBusinessStrict2030MultipleDomains = __FORMENGINE_TEST_LICENSE_licenseBusinessStrict2030MultipleDomains__
// @ts-ignore Vite define placeholder injected at build time
const licenseBusinessStrict2030NoDomain = __FORMENGINE_TEST_LICENSE_licenseBusinessStrict2030NoDomain__
// @ts-ignore Vite define placeholder injected at build time
const licenseEnterprise2024AnyDomain = __FORMENGINE_TEST_LICENSE_licenseEnterprise2024AnyDomain__
// @ts-ignore Vite define placeholder injected at build time
const licenseEnterprise2024MultipleDomains = __FORMENGINE_TEST_LICENSE_licenseEnterprise2024MultipleDomains__
// @ts-ignore Vite define placeholder injected at build time
const licenseEnterprise2024NoDomain = __FORMENGINE_TEST_LICENSE_licenseEnterprise2024NoDomain__
// @ts-ignore Vite define placeholder injected at build time
const licenseEnterprise2030AnyDomain = __FORMENGINE_TEST_LICENSE_licenseEnterprise2030AnyDomain__
// @ts-ignore Vite define placeholder injected at build time
const licenseEnterprise2030MultipleDomains = __FORMENGINE_TEST_LICENSE_licenseEnterprise2030MultipleDomains__
// @ts-ignore Vite define placeholder injected at build time
const licenseEnterprise2030NoDomain = __FORMENGINE_TEST_LICENSE_licenseEnterprise2030NoDomain__
// @ts-ignore Vite define placeholder injected at build time
const licenseEnterpriseStrict2024AnyDomain = __FORMENGINE_TEST_LICENSE_licenseEnterpriseStrict2024AnyDomain__
// @ts-ignore Vite define placeholder injected at build time
const licenseEnterpriseStrict2024MultipleDomains = __FORMENGINE_TEST_LICENSE_licenseEnterpriseStrict2024MultipleDomains__
// @ts-ignore Vite define placeholder injected at build time
const licenseEnterpriseStrict2024NoDomain = __FORMENGINE_TEST_LICENSE_licenseEnterpriseStrict2024NoDomain__
// @ts-ignore Vite define placeholder injected at build time
const licenseEnterpriseStrict2030AnyDomain = __FORMENGINE_TEST_LICENSE_licenseEnterpriseStrict2030AnyDomain__
// @ts-ignore Vite define placeholder injected at build time
const licenseEnterpriseStrict2030MultipleDomains = __FORMENGINE_TEST_LICENSE_licenseEnterpriseStrict2030MultipleDomains__
// @ts-ignore Vite define placeholder injected at build time
const licenseEnterpriseStrict2030NoDomain = __FORMENGINE_TEST_LICENSE_licenseEnterpriseStrict2030NoDomain__
// @ts-ignore Vite define placeholder injected at build time
const licenseLegacyCompany2030 = __FORMENGINE_TEST_LICENSE_licenseLegacyCompany2030__
// @ts-ignore Vite define placeholder injected at build time
const licenseLegacyCompanyStrict2030 = __FORMENGINE_TEST_LICENSE_licenseLegacyCompanyStrict2030__
// @ts-ignore Vite define placeholder injected at build time
const licenseLegacyTrial2024 = __FORMENGINE_TEST_LICENSE_licenseLegacyTrial2024__
// @ts-ignore Vite define placeholder injected at build time
const licenseLegacyTrialStrict2024 = __FORMENGINE_TEST_LICENSE_licenseLegacyTrialStrict2024__

export const licenseLegacyNotExpired = [licenseLegacyCompany2030, licenseLegacyCompanyStrict2030]

export const licenseExpired = [
  licenseBusiness2024AnyDomain,
  licenseEnterprise2024NoDomain,
  licenseLegacyTrial2024,
  licenseEnterprise2024AnyDomain,
  licenseEnterpriseStrict2024AnyDomain,
  licenseBusiness2024MultipleDomains,
  licenseBusiness2024NoDomain,
  licenseBusiness2024AnyDomain,
  licenseEnterprise2024MultipleDomains,
]

export const licenseExpiredStrict = [
  licenseEnterpriseStrict2024MultipleDomains,
  licenseEnterpriseStrict2024NoDomain,
  licenseLegacyTrialStrict2024,
  licenseBusinessStrict2024MultipleDomains,
  licenseBusinessStrict2030AnyDomain,
  licenseBusinessStrict2024AnyDomain,
]

export const licenseNoDomain = [
  licenseLegacyCompany2030,
  licenseLegacyCompanyStrict2030,
  licenseBusiness2030NoDomain,
  licenseBusinessStrict2030NoDomain,
  licenseEnterprise2030NoDomain,
  licenseBusinessStrict2024NoDomain,
]

export const licenseInvalid = [invalidLicenseKey]

export const license2030Enterprise = [
  licenseEnterprise2030AnyDomain,
  licenseEnterprise2030MultipleDomains,
  licenseEnterprise2030NoDomain,
  licenseEnterpriseStrict2030MultipleDomains,
  licenseEnterpriseStrict2030AnyDomain,
]

export const licenseBusiness = [licenseBusiness2030AnyDomain, licenseBusinessStrict2030AnyDomain]
