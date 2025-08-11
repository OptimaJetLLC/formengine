import {
  formEngineRsuiteCssLoader,
  ltrCssLoader,
  rsErrorMessage,
  RsLocalizationWrapper,
  rsTooltip,
  rtlCssLoader
} from '@react-form-builder/components-rsuite'
import {BiDi, BuilderView, createView, FormViewer, LanguageFullCode} from '@react-form-builder/core'
import {CustomizationMap, FormBuilder} from '@react-form-builder/designer'
import deDE from '@react-form-builder/designer/public/locales/de-DE.json'
import enEN from '@react-form-builder/designer/public/locales/en-US.json'
import {verifyDomain} from '@react-form-builder/designer/src/features/license/domain'
import {allComponentsBuilder, allComponentsViewer} from '@react-form-builder/tests-common/lib/all-components'
import {
  license2030Enterprise,
  licenseBusiness,
  licenseExpired,
  licenseExpiredStrict,
  licenseInvalid,
  licenseLegacyNotExpired,
  licenseNoDomain
} from '@react-form-builder/tests-common/license'
import {render, RenderResult} from '@testing-library/react'
import {useCallback} from 'react'
import {expect} from 'vitest'
import {clickItemInMainMenu} from '../util/controls'
import agreementForm from './forms/agreement-form.json'
import {default as formEmpty} from './forms/empty-form.json'
import {default as formJson} from './forms/license-form.json'

const getForm = (name?: string) => {
  if (name === 'agreement') return JSON.stringify(agreementForm)
  if (name === 'empty') return JSON.stringify(formEmpty)

  return JSON.stringify(formJson)
}

type TestComponent = 'Designer' | 'Viewer'

const designerReady = async ({findByTestId}: RenderResult) => {
  return expect(await findByTestId('picker-toggle-input')).toBeInTheDocument()
}

const viewerReady = async ({findByTestId}: RenderResult) => {
  return expect(await findByTestId('mainScreen')).toBeInTheDocument()
}

const ready = async (app: RenderResult, component: TestComponent) => {
  return component === 'Designer' ? designerReady(app) : viewerReady(app)
}

const viewerView = createView(allComponentsViewer)
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)
  .withCssLoader('common', formEngineRsuiteCssLoader)

const Viewer = ({language, formName}: { language?: string, formName?: string }) => {
  const lng: LanguageFullCode | undefined = language ? `${language.toLowerCase()}-${language.toUpperCase()}` : undefined

  return <FormViewer view={viewerView} getForm={getForm} language={lng} formName={formName}/>
}
Viewer.displayName = 'Viewer'

const viewAllComponents = new BuilderView(allComponentsBuilder)
  .withErrorMeta(rsErrorMessage.build())
  .withTooltipMeta(rsTooltip.build())
  .withTemplates(['agreement'])
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)
  .withCssLoader('common', formEngineRsuiteCssLoader)

const viewNoComponents = new BuilderView([])
  .withErrorMeta(rsErrorMessage.build())
  .withTooltipMeta(rsTooltip.build())
  .withTemplates(['agreement'])
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)
  .withCssLoader('common', formEngineRsuiteCssLoader)

export const simpleCustomization: CustomizationMap = {
  MainMenu_Dropdown: {
    style: `
      background-color: lightblue !important;

      #menuitem-\\:r5\\: {
        display: none;
      }
    `
  }
}

type DesignerProps = { license: string, customization?: CustomizationMap, view?: BuilderView, formName?: string }
const Designer = ({license, customization, view = viewAllComponents, formName}: DesignerProps) => {
  const formGet = useCallback((name?: string) => getForm(name ?? formName), [formName])
  return <FormBuilder view={view} getForm={formGet} licenseKey={license} customization={customization}/>
}
Designer.displayName = 'Designer'

const trialMessage = `${enEN.license.mismatchMessage}`
const trialMessageDE = `${deDE.license.mismatchMessage}`
const noKeyMessage = `${enEN.license.errNoKey}`
// const invalidMessage = `${enEN.license.errLicenseInvalid}`
// const qrCodeMessage = `${enEN.license.ftComponentQrCode}`
const repeaterMessage = `${enEN.license.ftComponentRepeater}`
const signatureMessage = `${enEN.license.ftComponentSignature}`
// const tableMessage = `${enEN.license.ftComponentTable}`
const templatesMessage = `${enEN.license.ftComponentTemplates}`
const customizationMessage = `${enEN.license.ftDesignerCustomization}`
const presetMessage = `${enEN.license.ftComponentPreset}`
const localeMessage = `${enEN.license.ftLocaleCount.substring(0, 40)}`
const localeMessage1 = `${enEN.license.ftLocaleCount.replaceAll('{{ftLocaleCount}}', '1')}`
const domainMessage = `${enEN.license.errDomain.substring(0, 40)}`

const components = [Viewer, Designer]

const allComponentMessagesPresent = async ({findByText}: RenderResult, mode: TestComponent) => {
  expect(await findByText(trialMessage)).toBeInTheDocument()
  // expect(await findByText(qrCodeMessage)).toBeInTheDocument()
  expect(await findByText(repeaterMessage)).toBeInTheDocument()
  expect(await findByText(signatureMessage)).toBeInTheDocument()
  // expect(await findByText(tableMessage)).toBeInTheDocument()
  expect(await findByText(templatesMessage)).toBeInTheDocument()

  if (mode === 'Designer') {
    expect(await findByText(customizationMessage)).toBeInTheDocument()
    expect(await findByText(presetMessage)).toBeInTheDocument()
  }
}

describe(`License test`, function () {
  for (const Component of components) {
    it(`${Component.displayName} should render`, async () => {
      const app = render(<Component license=""/>)

      await ready(app, Component.displayName as TestComponent)
    })
  }

  for (const l of licenseExpired) {
    it(`Designer expired license should produce trial message`, async () => {
      const app = render(<Designer license={l}/>)

      await designerReady(app)

      try {
        expect(await app.findByText(trialMessage)).toBeInTheDocument()
      } catch (err) {
        console.log('License:', l)
        throw err
      }
    })
  }

  for (const l of licenseBusiness) {
    it(`Designer should show locale count`, async () => {
      const app = render(<Designer license={l}/>)

      await designerReady(app)

      try {
        expect(await app.findByText(localeMessage1)).toBeInTheDocument()
      } catch (err) {
        console.log('License:', l)
        throw err
      }
    })
  }

  for (const l of licenseExpiredStrict) {
    it(`Designer expired strict license should produce trial message`, async () => {
      const app = render(<Designer license={l}/>)

      await designerReady(app)

      try {
        expect(await app.findByText(trialMessage)).toBeInTheDocument()
      } catch (err) {
        console.log('License:', l)
        throw err
      }
    })
  }

  for (const l of licenseLegacyNotExpired) {
    it(`Designer not expired legacy license should not produce trial message`, async () => {
      const app = render(<Designer license={l}/>)

      await designerReady(app)

      try {
        expect(app.queryByText(trialMessage)).toBeNull()
      } catch (err) {
        console.log('License:', l)
        throw err
      }
    })
  }

  for (const l of licenseNoDomain) {
    it(`Designer license with no domain should not produce domain violation message`, async () => {
      const app = render(<Designer license={l}/>)

      await designerReady(app)

      try {
        expect(app.queryByText(domainMessage)).toBeNull()
      } catch (err) {
        console.log('License:', l)
        throw err
      }
    })
  }

  for (const l of license2030Enterprise) {
    it(`Designer license with ftLocaleCount=-1 should not produce locale message`, async () => {
      const app = render(<Designer license={l}/>)

      await designerReady(app)

      expect(app.queryByText(localeMessage)).toBeNull()
    })
  }

  it(`Designer invalid license should produce trial message`, async () => {
    const app = render(<Designer license={licenseInvalid[0]} customization={simpleCustomization}/>)

    await designerReady(app)

    expect(await app.findByText(trialMessage)).toBeInTheDocument()
    expect(await app.findByText(customizationMessage)).toBeInTheDocument()
    await allComponentMessagesPresent(app, 'Designer')
  })

  it('Designer should translate license related messages', async () => {
    const app = render(<Designer license={''} customization={simpleCustomization}/>)

    await designerReady(app)
    await clickItemInMainMenu(app.container, 'Translation', 'DE')

    expect(await app.findByText(trialMessageDE)).not.toBeNull()
  })

  it(`Designer should show descriptive message, if no key is provided`, async () => {
    const app = render(<Designer license=""/>)

    await designerReady(app)

    expect(await app.findByText(trialMessage)).not.toBeNull()
    expect(await app.findByText(`${noKeyMessage}`)).not.toBeNull()
  })

  it(`Designer should not show descriptive message, if restricted component not in the palette`, async () => {
    const app = render(<Designer license="" view={viewNoComponents} formName={'empty'}/>)

    await designerReady(app)

    expect(app.queryByText(`${presetMessage}`)).toBeNull()
  })

  it('should check domain list', async () => {
    const domain = [
      'testnet.local',
      'foo.testnet.local',
      'bar.foo.testnet.local',
      '*.testnet.local',
      '*.foo.testnet.local',
    ]
    expect(verifyDomain(domain, 'testnet.local')).toBeTruthy()
    expect(verifyDomain(domain, 'baz.testnet.local')).toBeTruthy()
    expect(verifyDomain(domain, 'baz.testnet1.local')).toBeFalsy()
    expect(verifyDomain(domain, 'localhost')).toBeFalsy()

    const domainExact = [
      'testnet.local',
    ]
    expect(verifyDomain(domainExact, 'testnet.local')).toBeTruthy()
    expect(verifyDomain(domainExact, 'foo.testnet.local')).toBeFalsy()
    expect(verifyDomain(domainExact, 'example.com')).toBeFalsy()

    const domainWildcardOnly = [
      '*.testnet.local'
    ]
    expect(verifyDomain(domainWildcardOnly, 'testnet.local')).toBeFalsy()
    expect(verifyDomain(domainWildcardOnly, 'foo.testnet.local')).toBeTruthy()

    const domainWildcardOnlySubdomain = [
      '*.foo.testnet.local'
    ]
    expect(verifyDomain(domainWildcardOnlySubdomain, 'foo.testnet.local')).toBeFalsy()
    expect(verifyDomain(domainWildcardOnlySubdomain, 'bar.foo.testnet.local')).toBeTruthy()
    expect(verifyDomain(domainWildcardOnlySubdomain, 'testnet.local')).toBeFalsy()

    const domainWildcardAny = [
      '*'
    ]
    expect(verifyDomain(domainWildcardAny, 'example.com')).toBeTruthy()
    expect(verifyDomain(domainWildcardAny, 'bar.foo.testnet.local')).toBeTruthy()
  })
})
