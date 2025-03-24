/** eslint-disable no-secrets/no-secrets */
import {createView, FormViewer} from '@react-form-builder/core'
import {wait} from '@react-form-builder/tests-common/lib/utils'
import {render} from '@testing-library/react'
import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import {expect} from 'vitest'

const formJson = JSON.stringify({
  'form': {
    'key': 'Screen',
    'type': 'Screen',
    'props': {},
    'children': []
  }
})

const App = ({license}: { license: string }) => {
  return <FormViewer view={createView([])} getForm={() => formJson} licenseKey={license}/>
}

const licenseMessage = /This is a trial version of the product. To purchase a license, go to/

describe.only(`License test`, function () {
  beforeAll(() => {
    i18n.use(initReactI18next).init({resources: {}}).catch(console.error)
  })

  it('invalid license should produce license message', async () => {
    const invalidLicenseKey = 'TRIAL-boo-blah-blah'
    const {findByText} = render(<App license={invalidLicenseKey}/>)

    expect(await findByText(licenseMessage)).not.toBeNull()
  })

  it('expired license should produce license message', async () => {
    const expiredNotStrictLicense = 'adasdsa-eyJsaWNlbnNlRW5kRGF0ZSI6IjEyLjMxLjIwMjMiLCJyZWxlYXNlRXhwaXJ5IjoiMTIuMzEuMjAyMyIs' +
      'ImNvbXBhbnlOYW1lIjoiYWRhc2RzYSIsInJlc3RyaWN0aW9ucyI6eyJTdHJpY3RDaGVjayI6ZmFsc2V9fQ==:TxDDCrHZRLmD1GUKRWCYf2HvOeF/gvNhj' +
      'vBIRPdigmFLx1VcdIIuUjr5mNJIdx5STVDTV9vmISsyQqPtAuEnbaiZSoyE1XEyHFLDqFl+PTSdXKpw8aaisRy/ZLAcjwr/'
    const {findByText} = render(<App license={expiredNotStrictLicense}/>)

    expect(await findByText(licenseMessage)).not.toBeNull()
  })

  it('expired strict license should produce license message', async () => {
    const expiredStrictLicense = 'adasdsa-eyJsaWNlbnNlRW5kRGF0ZSI6IjExLjA4LjIwMjMiLCJyZWxlYXNlRXhwaXJ5IjoiMTEuMDguMjAyMyIsImN' +
      'vbXBhbnlOYW1lIjoiYWRhc2RzYSIsInJlc3RyaWN0aW9ucyI6eyJTdHJpY3RDaGVjayI6dHJ1ZX19:IqENcwbEPj/8B5Qh3LYwMZvSkEhLN3j/LeE/UAZM' +
      'uWI0wMOJ771ncNfOEc8FdDyDr0bONMWFJf1htJV3A1MW/Qj4koENm0aWR91xX6/xKrW7klhPZZ6t72vLfGbx7sYr'
    const {findByText} = render(<App license={expiredStrictLicense}/>)

    expect(await findByText(licenseMessage)).not.toBeNull()
  })

  it('valid license should not produce license message', async () => {
    const validLicenseKey = 'formengine_demo-eyJsaWNlbnNlRW5kRGF0ZSI6IjAzLjA4LjIwMjUiLCJyZWxlYXNlRXhwaXJ5IjoiMDMuMDguMjAyNSIs' +
      'ImNvbXBhbnlOYW1lIjoiZm9ybWVuZ2luZV9kZW1vIiwicmVzdHJpY3Rpb25zIjp7IlN0cmljdENoZWNrIjpmYWxzZX19:noltFwrLcAjviH4VL/zpXK3x0' +
      '/CilkKwD8+/1g9eG4Noz6T9krEriTrrSZnx3l6Ho0O4cbgrT5qcwxN5NrX5BLIlGBzHZveUWLqandaQaozXECT04nEtosc6i9djfT0T'
    const {queryByText} = render(<App license={validLicenseKey}/>)

    await wait(500)
    expect(queryByText(licenseMessage)).toBeNull()
  })
})
