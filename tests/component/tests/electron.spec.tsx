import '../config/setup'
import {ltrCssLoader, RsLocalizationWrapper, rtlCssLoader} from '@react-form-builder/components-rsuite'
import {BiDi, BuilderView} from '@react-form-builder/core'
import {CustomizationMap, FormBuilder, isElectron} from '@react-form-builder/designer'
import enEN from '@react-form-builder/designer/locales/en-US.json'
import {allComponentsBuilder} from '@react-form-builder/tests-common/lib/all-components'
import {license2030Enterprise, licenseBusiness} from '@react-form-builder/tests-common/license'
import {RenderResult, render, waitFor} from '@testing-library/react'
import {useCallback} from 'react'
import {expect} from 'vitest'
import agreementForm from './forms/agreement-form.json'
import {default as formEmpty} from './forms/empty-form.json'
import {default as formJson} from './forms/license-form.json'

const getForm = (name?: string) => {
  if (name === 'agreement') return JSON.stringify(agreementForm)
  if (name === 'empty') return JSON.stringify(formEmpty)

  return JSON.stringify(formJson)
}

const designerReady = async ({findByTestId}: RenderResult) => {
  return expect(await findByTestId('picker-toggle-input')).toBeInTheDocument()
}

const viewAllComponents = new BuilderView(allComponentsBuilder)
  .withTemplates(['agreement'])
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)

type DesignerProps = {license: string; customization?: CustomizationMap; view?: BuilderView; formName?: string}
const Designer = ({license, customization, view = viewAllComponents, formName}: DesignerProps) => {
  const formGet = useCallback((name?: string) => getForm(name ?? formName), [formName])
  return <FormBuilder view={view} getForm={formGet} licenseKey={license} customization={customization} />
}

const trialMessage = `${enEN.license.mismatchMessage}`
const electronMessage = `${enEN.license.errElectron}`
const electronUserAgent = 'Mozilla/5.0 Electron/20.0.0'

const globalObj = globalThis as any

type GlobalSnapshot = {
  windowProcess?: any
  processVersions?: any
  userAgent?: string
}

const snapshotGlobals = (): GlobalSnapshot => ({
  windowProcess: globalObj.window?.process,
  processVersions: globalObj.process?.versions,
  userAgent: globalObj.navigator?.userAgent,
})

const setWindowProcess = (value: any | undefined) => {
  if (!globalObj.window) return

  if (value === undefined) {
    // @ts-ignore
    delete globalObj.window.process
    return
  }

  // @ts-ignore
  globalObj.window.process = value
}

const setProcessVersions = (value: any) => {
  const proc: NodeJS.Process = globalObj.process ?? ({} as NodeJS.Process)

  if (!globalObj.process) {
    // @ts-ignore
    globalObj.process = proc
  }

  Object.defineProperty(proc, 'versions', {
    value,
    writable: true,
    configurable: true,
    enumerable: true,
  })
}

const setNavigatorUserAgent = (value: string | undefined) => {
  if (!globalObj.navigator) return

  Object.defineProperty(globalObj.navigator, 'userAgent', {
    value,
    writable: true,
    configurable: true,
  })
}

const restoreGlobals = ({windowProcess, processVersions, userAgent}: GlobalSnapshot) => {
  setWindowProcess(windowProcess)
  setProcessVersions(processVersions)
  setNavigatorUserAgent(userAgent)
}

const overrideGlobals = (overrides: Partial<GlobalSnapshot>) => {
  const snapshot = snapshotGlobals()

  if (Object.prototype.hasOwnProperty.call(overrides, 'windowProcess')) {
    setWindowProcess(overrides.windowProcess)
  }
  if (Object.prototype.hasOwnProperty.call(overrides, 'processVersions')) {
    setProcessVersions(overrides.processVersions)
  }
  if (Object.prototype.hasOwnProperty.call(overrides, 'userAgent')) {
    setNavigatorUserAgent(overrides.userAgent)
  }

  return () => restoreGlobals(snapshot)
}

const toElectronRendererProcess = (originalProcess: any): any => ({
  ...(originalProcess ?? {}),
  type: 'renderer',
  env: {
    NODE_ENV: originalProcess?.env?.NODE_ENV ?? 'test',
    ...(originalProcess?.env ?? {}),
  },
})

async function runInElectronRenderer<T>(fn: () => Promise<T> | T): Promise<T> {
  const {windowProcess} = snapshotGlobals()
  const restore = overrideGlobals({
    windowProcess: toElectronRendererProcess(windowProcess),
    userAgent: electronUserAgent,
  })

  try {
    return await fn()
  } finally {
    restore()
  }
}

describe(`License test`, function () {
  for (const l of licenseBusiness) {
    it('Should show message in Electron for business license', async () => {
      try {
        await runInElectronRenderer(async () => {
          const app = render(<Designer license={l} />)

          await designerReady(app)

          expect(await app.findByText(trialMessage)).toBeInTheDocument()
          expect(await app.findByText(electronMessage)).toBeInTheDocument()
        })
      } catch (err) {
        console.log('License:', l)
        throw err
      }
    })
  }

  for (const l of license2030Enterprise) {
    it('Should not show message in Electron for enterprise license', async () => {
      try {
        await runInElectronRenderer(async () => {
          const app = render(<Designer license={l} />)

          await designerReady(app)

          await waitFor(() => {
            expect(app.queryByText(trialMessage)).toBeFalsy()
            expect(app.queryByText(electronMessage)).toBeFalsy()
          })
        })
      } catch (err) {
        console.log('License:', l)
        throw err
      }
    })
  }

  describe('isElectron', () => {
    const baseSnapshot = snapshotGlobals()

    afterEach(() => {
      restoreGlobals(baseSnapshot)
    })

    it('should return false when not running in Electron', () => {
      overrideGlobals({
        windowProcess: undefined,
        processVersions: {},
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      })

      expect(isElectron()).toBeFalsy()
    })

    it('should return true when window.process.type is "renderer"', () => {
      overrideGlobals({
        windowProcess: {type: 'renderer'},
        processVersions: {},
        userAgent: 'Mozilla/5.0',
      })

      expect(isElectron()).toBeTruthy()
    })

    it('should return true when process.versions.electron exists', () => {
      const currentVersions = globalObj.process?.versions || {}

      overrideGlobals({
        windowProcess: undefined,
        processVersions: {
          ...currentVersions,
          electron: '20.0.0',
        },
        userAgent: 'Mozilla/5.0',
      })

      expect(isElectron()).toBeTruthy()
    })

    it('should return true when navigator.userAgent contains "Electron"', () => {
      overrideGlobals({
        windowProcess: undefined,
        processVersions: {},
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Electron/20.0.0 Chrome/108.0.5359.215',
      })

      expect(isElectron()).toBeTruthy()
    })

    it('should return true when multiple Electron indicators are present', () => {
      overrideGlobals({
        windowProcess: {type: 'renderer'},
        processVersions: {
          electron: '20.0.0',
        },
        userAgent: electronUserAgent,
      })

      expect(isElectron()).toBeTruthy()
    })

    it('should return false when window.process is undefined', () => {
      overrideGlobals({
        windowProcess: undefined,
        processVersions: {},
        userAgent: 'Mozilla/5.0',
      })

      expect(isElectron()).toBeFalsy()
    })

    it('should return false when process.versions.electron is missing', () => {
      overrideGlobals({
        windowProcess: undefined,
        processVersions: {},
        userAgent: 'Mozilla/5.0',
      })

      expect(isElectron()).toBeFalsy()
    })

    it('should return false when navigator.userAgent does not contain "Electron"', () => {
      overrideGlobals({
        windowProcess: undefined,
        processVersions: {},
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/108.0.5359.215',
      })

      expect(isElectron()).toBeFalsy()
    })
  })
})
