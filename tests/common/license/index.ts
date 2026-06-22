import {licenseBusiness2024AnyDomain} from './business-2024-any-domain'
import {licenseBusiness2024MultipleDomains} from './business-2024-multiple-domains'
import {licenseBusiness2024NoDomain} from './business-2024-no-domain'
import {licenseBusiness2030AnyDomain} from './business-2030-any-domain'
import {licenseBusiness2030NoDomain} from './business-2030-no-domain'
import {licenseBusinessStrict2024AnyDomain} from './business-strict-2024-any-domain'
import {licenseBusinessStrict2024MultipleDomains} from './business-strict-2024-multiple-domains'
import {licenseBusinessStrict2024NoDomain} from './business-strict-2024-no-domain'
import {licenseBusinessStrict2030AnyDomain} from './business-strict-2030-any-domain'
import {licenseBusinessStrict2030NoDomain} from './business-strict-2030-no-domain'
import {licenseEnterprise2024AnyDomain} from './enterprise-2024-any-domain'
import {licenseEnterprise2024MultipleDomains} from './enterprise-2024-multiple-domains'
import {licenseEnterprise2024NoDomain} from './enterprise-2024-no-domain'
import {licenseEnterprise2030AnyDomain} from './enterprise-2030-any-domain'
import {licenseEnterprise2030MultipleDomains} from './enterprise-2030-multiple-domains'
import {licenseEnterprise2030NoDomain} from './enterprise-2030-no-domain'
import {licenseEnterpriseStrict2024AnyDomain} from './enterprise-strict-2024-any-domain'
import {licenseEnterpriseStrict2024MultipleDomains} from './enterprise-strict-2024-multiple-domains'
import {licenseEnterpriseStrict2024NoDomain} from './enterprise-strict-2024-no-domain'
import {licenseEnterpriseStrict2030AnyDomain} from './enterprise-strict-2030-any-domain'
import {licenseEnterpriseStrict2030MultipleDomains} from './enterprise-strict-2030-multiple-domains'
import {invalidLicenseKey} from './invalid'
import {licenseLegacyCompany2030} from './legacy/company-2030'
import {licenseLegacyCompanyStrict2030} from './legacy/company-strict-2030'
import {licenseLegacyTrial2024} from './legacy/trial-2024'
import {licenseLegacyTrialStrict2024} from './legacy/trial-strict-2024'

export const licenseLegacyNotExpired = [licenseLegacyCompany2030, licenseLegacyCompanyStrict2030]

export const licenseExpired = [licenseBusiness2024AnyDomain, licenseEnterprise2024NoDomain, licenseLegacyTrial2024, licenseEnterprise2024AnyDomain, licenseEnterpriseStrict2024AnyDomain, licenseBusiness2024MultipleDomains, licenseBusiness2024NoDomain, licenseBusiness2024AnyDomain, licenseEnterprise2024MultipleDomains]

export const licenseExpiredStrict = [licenseEnterpriseStrict2024MultipleDomains, licenseEnterpriseStrict2024NoDomain, licenseLegacyTrialStrict2024, licenseBusinessStrict2024MultipleDomains, licenseBusinessStrict2030AnyDomain, licenseBusinessStrict2024AnyDomain]

export const licenseNoDomain = [licenseLegacyCompany2030, licenseLegacyCompanyStrict2030, licenseBusiness2030NoDomain, licenseBusinessStrict2030NoDomain, licenseEnterprise2030NoDomain, licenseBusinessStrict2024NoDomain]

export const licenseInvalid = [invalidLicenseKey]

export const license2030Enterprise = [licenseEnterprise2030AnyDomain, licenseEnterprise2030MultipleDomains, licenseEnterprise2030NoDomain, licenseEnterpriseStrict2030MultipleDomains, licenseEnterpriseStrict2030AnyDomain]

export const licenseBusiness = [licenseBusiness2030AnyDomain, licenseBusinessStrict2030AnyDomain]
