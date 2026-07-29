import {
  RsLocalizationWrapper,
  RsThemeWrapper,
  RsViewWrapper
} from '@react-form-builder/components-rsuite'
import {
  BiDi,
  BuilderThemeProvider,
  Language,
  createView,
  define,
  FormViewer
} from '@react-form-builder/core'
import {cleanup, render, waitFor} from '@testing-library/react'
import {useContext} from 'react'
import {CustomContext} from 'rsuite/CustomProvider'
import {afterEach, describe, expect, it} from 'vitest'

const enUS = new Language('en', 'US', 'English', 'American English', BiDi.LTR)
const deDE = new Language('de', 'DE', 'German', 'German (Germany)', BiDi.LTR)
const arEG = new Language('ar', 'EG', 'Arabic', 'Arabic (Egypt)', BiDi.RTL)

const RsuiteContextProbe = () => {
  const {locale, theme, rtl} = useContext(CustomContext)
  const today = locale?.Calendar?.today ?? locale?.DateTimeFormats?.today ?? ''

  return (
    <div data-testid="rsuite-custom-context-probe">
      <span data-testid="rsuite-locale-today">{today}</span>
      <span data-testid="rsuite-theme">{theme ?? ''}</span>
      <span data-testid="rsuite-rtl">{String(Boolean(rtl))}</span>
    </div>
  )
}

const clearBodyThemeClasses = () => {
  document.body.classList.remove('rs-theme-dark', 'rs-theme-light', 'rs-theme-high-contrast')
}

describe('RSuite viewer wrappers', () => {
  afterEach(() => {
    cleanup()
    clearBodyThemeClasses()
  })

  describe('RsLocalizationWrapper', () => {
    it('applies RSuite locale for the language', async () => {
      const {findByTestId} = render(
        <RsLocalizationWrapper language={enUS}>
          <RsuiteContextProbe/>
        </RsLocalizationWrapper>
      )

      expect(await findByTestId('rsuite-locale-today')).toHaveTextContent('Today')
      expect(await findByTestId('rsuite-rtl')).toHaveTextContent('false')
    })

    it('updates RSuite locale when the language changes', async () => {
      const {findByTestId, rerender} = render(
        <RsLocalizationWrapper language={enUS}>
          <RsuiteContextProbe/>
        </RsLocalizationWrapper>
      )

      expect(await findByTestId('rsuite-locale-today')).toHaveTextContent('Today')

      rerender(
        <RsLocalizationWrapper language={deDE}>
          <RsuiteContextProbe/>
        </RsLocalizationWrapper>
      )

      expect(await findByTestId('rsuite-locale-today')).toHaveTextContent('Heute')
    })

    it('enables RTL for RTL languages', async () => {
      const {findByTestId} = render(
        <RsLocalizationWrapper language={arEG}>
          <RsuiteContextProbe/>
        </RsLocalizationWrapper>
      )

      expect(await findByTestId('rsuite-rtl')).toHaveTextContent('true')
    })
  })

  describe('RsThemeWrapper', () => {
    it('applies light theme to CustomProvider and body', async () => {
      const {findByTestId, container} = render(
        <BuilderThemeProvider value="light">
          <RsThemeWrapper language={enUS}>
            <RsuiteContextProbe/>
          </RsThemeWrapper>
        </BuilderThemeProvider>
      )

      expect(await findByTestId('rsuite-theme')).toHaveTextContent('light')
      expect(container.querySelector('.rsuite')).toBeTruthy()
      await waitFor(() => {
        expect(document.body).toHaveClass('rs-theme-light')
      })
    })

    it('switches theme when BuilderThemeProvider value changes', async () => {
      const {findByTestId, rerender} = render(
        <BuilderThemeProvider value="light">
          <RsThemeWrapper language={enUS}>
            <RsuiteContextProbe/>
          </RsThemeWrapper>
        </BuilderThemeProvider>
      )

      expect(await findByTestId('rsuite-theme')).toHaveTextContent('light')
      await waitFor(() => {
        expect(document.body).toHaveClass('rs-theme-light')
      })

      rerender(
        <BuilderThemeProvider value="dark">
          <RsThemeWrapper language={enUS}>
            <RsuiteContextProbe/>
          </RsThemeWrapper>
        </BuilderThemeProvider>
      )

      expect(await findByTestId('rsuite-theme')).toHaveTextContent('dark')
      await waitFor(() => {
        expect(document.body).toHaveClass('rs-theme-dark')
        expect(document.body).not.toHaveClass('rs-theme-light')
      })
    })
  })

  describe('RsViewWrapper', () => {
    it('applies both locale and theme', async () => {
      const {findByTestId, container} = render(
        <BuilderThemeProvider value="dark">
          <RsViewWrapper language={deDE}>
            <RsuiteContextProbe/>
          </RsViewWrapper>
        </BuilderThemeProvider>
      )

      expect(await findByTestId('rsuite-locale-today')).toHaveTextContent('Heute')
      expect(await findByTestId('rsuite-theme')).toHaveTextContent('dark')
      expect(await findByTestId('rsuite-rtl')).toHaveTextContent('false')
      expect(container.querySelector('.rsuite')).toBeTruthy()
      await waitFor(() => {
        expect(document.body).toHaveClass('rs-theme-dark')
      })
    })

    it('updates both language and theme on the fly', async () => {
      const {findByTestId, rerender} = render(
        <BuilderThemeProvider value="light">
          <RsViewWrapper language={enUS}>
            <RsuiteContextProbe/>
          </RsViewWrapper>
        </BuilderThemeProvider>
      )

      expect(await findByTestId('rsuite-locale-today')).toHaveTextContent('Today')
      expect(await findByTestId('rsuite-theme')).toHaveTextContent('light')

      rerender(
        <BuilderThemeProvider value="dark">
          <RsViewWrapper language={deDE}>
            <RsuiteContextProbe/>
          </RsViewWrapper>
        </BuilderThemeProvider>
      )

      expect(await findByTestId('rsuite-locale-today')).toHaveTextContent('Heute')
      expect(await findByTestId('rsuite-theme')).toHaveTextContent('dark')
      await waitFor(() => {
        expect(document.body).toHaveClass('rs-theme-dark')
      })
    })

    it('keeps theme when only language changes', async () => {
      const {findByTestId, rerender} = render(
        <BuilderThemeProvider value="dark">
          <RsViewWrapper language={enUS}>
            <RsuiteContextProbe/>
          </RsViewWrapper>
        </BuilderThemeProvider>
      )

      expect(await findByTestId('rsuite-theme')).toHaveTextContent('dark')

      rerender(
        <BuilderThemeProvider value="dark">
          <RsViewWrapper language={arEG}>
            <RsuiteContextProbe/>
          </RsViewWrapper>
        </BuilderThemeProvider>
      )

      expect(await findByTestId('rsuite-rtl')).toHaveTextContent('true')
      expect(await findByTestId('rsuite-theme')).toHaveTextContent('dark')
      await waitFor(() => {
        expect(document.body).toHaveClass('rs-theme-dark')
      })
    })
  })

  describe('RsViewWrapper with FormViewer', () => {
    const probeComponent = define(RsuiteContextProbe, 'RsuiteContextProbe')
    const view = createView([probeComponent.build().model]).withViewerWrapper(RsViewWrapper)
    const getForm = () => JSON.stringify({
      form: {
        key: 'Screen',
        type: 'Screen',
        children: [{key: 'probe', type: 'RsuiteContextProbe'}]
      },
      languages: [
        {code: 'en', dialect: 'US', name: 'English', description: 'American English', bidi: 'ltr'},
        {code: 'de', dialect: 'DE', name: 'German', description: 'German', bidi: 'ltr'}
      ],
      defaultLanguage: 'en-US'
    })

    it('applies locale and theme through FormViewer', async () => {
      const {findByTestId, container, rerender} = render(
        <BuilderThemeProvider value="light">
          <FormViewer view={view} getForm={getForm} language="en-US"/>
        </BuilderThemeProvider>
      )

      expect(await findByTestId('rsuite-locale-today')).toHaveTextContent('Today')
      expect(await findByTestId('rsuite-theme')).toHaveTextContent('light')
      expect(container.querySelector('.rsuite')).toBeTruthy()

      rerender(
        <BuilderThemeProvider value="dark">
          <FormViewer view={view} getForm={getForm} language="de-DE"/>
        </BuilderThemeProvider>
      )

      await waitFor(async () => {
        expect(await findByTestId('rsuite-locale-today')).toHaveTextContent('Heute')
        expect(await findByTestId('rsuite-theme')).toHaveTextContent('dark')
        expect(document.body).toHaveClass('rs-theme-dark')
      })
    })
  })
})
