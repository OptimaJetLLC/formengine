import {pageBreak, printSettings} from '@react-form-builder/components-print'
import {BuilderModeProvider, cfNonVisual, cfSingleton, createView, FormViewer} from '@react-form-builder/core'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import {generatedLicenseKey} from '@react-form-builder/tests-common/lib/designer/utils/license'
import {fireEvent, render, screen} from '@testing-library/react'
import type {ReactNode} from 'react'
import {afterEach} from 'vitest'

const view = createView([pageBreak.build().model, printSettings.build().model])
const designerView = new BuilderView([pageBreak.build(), printSettings.build()])

const printForm = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'printSettings',
        type: 'PrintSettings',
        props: {
          header: {value: 'Inspection report'},
          footer: {value: 'Page {page} of {pages}'},
          footerAlign: {value: 'end'},
        },
      },
      {
        key: 'pageBreak',
        type: 'PageBreak',
        props: {
          breakBefore: {value: 'page'},
          breakAfter: {value: 'avoid'},
          breakInside: {value: 'avoid'},
        },
      },
    ],
  },
}

const quotedSettingsForm = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'printSettings',
        type: 'PrintSettings',
        props: {
          header: {value: 'Title with "quotes"'},
        },
      },
    ],
  },
}

const renderForm = (form: object, wrapper?: (children: ReactNode) => ReactNode) => {
  const ui = <FormViewer view={view} getForm={() => JSON.stringify(form)} />
  return render(wrapper ? wrapper(ui) : ui)
}

const printCss = () => [...document.head.querySelectorAll('style')].map(style => style.textContent ?? '').join('\n')

describe('PageBreak and PrintSettings', () => {
  afterEach(() => {
    document.head.querySelectorAll('style[data-print-settings]').forEach(node => node.remove())
  })

  it('registers both types on a view that includes the print components', () => {
    expect(view.find('PageBreak')?.type).toBe('PageBreak')
    expect(view.find('PrintSettings')?.type).toBe('PrintSettings')
  })

  it('marks PrintSettings as a singleton, non-visual component without additional properties', async () => {
    const {model, meta} = printSettings.build()
    expect(model.isFeatureEnabled(cfSingleton)).toBe(true)
    expect(model.isFeatureEnabled(cfNonVisual)).toBe(true)
    expect(meta.insertRestriction).toEqual(expect.any(Function))

    const {findByTestId, findByText, queryByText} = render(
      <FormBuilder
        licenseKey={generatedLicenseKey}
        view={designerView}
        getForm={() =>
          JSON.stringify({
            form: {
              key: 'Screen',
              type: 'Screen',
              children: [{key: 'printSettings', type: 'PrintSettings'}],
            },
          })
        }
      />
    )

    fireEvent.click(await findByTestId('PrintSettings-non-visual-chip'))
    expect(await findByText('Header')).toBeInTheDocument()
    expect(queryByText('Additional properties')).not.toBeInTheDocument()
  })

  it('keeps the break node in the viewer without showing the placeholder', async () => {
    renderForm(printForm)

    const pageBreakNode = await screen.findByTestId('page-break')
    expect(pageBreakNode).not.toBeVisible()
    expect(pageBreakNode).toHaveStyle({breakBefore: 'page', breakAfter: 'avoid', breakInside: 'avoid'})
    expect(screen.queryByTestId('page-break-placeholder')).not.toBeInTheDocument()
    expect(screen.queryByTestId('print-settings-placeholder')).not.toBeInTheDocument()
  })

  it('mounts PrintSettings off-layout in the viewer for side effects', async () => {
    renderForm(printForm)

    expect(await screen.findByTestId('non-visual-host')).toBeInTheDocument()
    const settings = await screen.findByTestId('print-settings')
    expect(settings).not.toBeVisible()
    expect(screen.queryByTestId('print-settings-placeholder')).not.toBeInTheDocument()
  })

  it('shows the PageBreak placeholder in builder mode', async () => {
    renderForm(printForm, children => <BuilderModeProvider value="builder">{children}</BuilderModeProvider>)

    expect(await screen.findByTestId('page-break-placeholder')).toBeVisible()
    expect(screen.queryByTestId('print-settings-placeholder')).not.toBeInTheDocument()
  })

  it('defaults header and footer to page number templates', async () => {
    expect(view.find('PrintSettings')?.defaultProps).toMatchObject({
      header: 'Page {page} of {pages}',
      footer: 'Page {page} of {pages}',
    })

    renderForm({
      form: {
        key: 'Screen',
        type: 'Screen',
        children: [{key: 'printSettings', type: 'PrintSettings'}],
      },
    })

    await screen.findByTestId('print-settings')
    expect(printCss()).toContain('counter(page)')
    expect(printCss()).toContain('counter(pages)')
  })

  it('injects @page margin boxes with page counters', async () => {
    renderForm(printForm)

    await screen.findByTestId('page-break')
    expect(printCss()).toContain('@page')
    expect(printCss()).toContain('@top-center')
    expect(printCss()).toContain('"Inspection report"')
    expect(printCss()).toContain('@bottom-right')
    expect(printCss()).toContain('counter(page)')
    expect(printCss()).toContain('counter(pages)')
  })

  it('CSS-escapes quotes in settings templates', async () => {
    renderForm(quotedSettingsForm)

    await screen.findByTestId('print-settings')
    expect(printCss()).toContain('"Title with \\"quotes\\""')
  })
})
