import * as formEngineRSuiteComponents from '@react-form-builder/components-rsuite'
import {ltrCssLoader, RsLocalizationWrapper, rtlCssLoader, view} from '@react-form-builder/components-rsuite'
import * as formEngineCore from '@react-form-builder/core'
import {BiDi, FormViewer, FormViewerProps} from '@react-form-builder/core'
import {createElement} from 'react'
// eslint-disable-next-line import/extensions
import {createRoot} from 'react-dom/client'

export {formEngineCore, formEngineRSuiteComponents}

/**
 * Displays the FormViewer component on the specified HTML element.
 * @param elementId the HTML element identifier.
 * @param props the component properties.
 */
export function renderFormViewer(elementId: string, props: Partial<FormViewerProps>) {
  const container = document.getElementById(elementId)
  if (!container) throw new Error(`Cannot find element with id '${elementId}'`)
  const root = createRoot(container)

  const formViewerProps: FormViewerProps = {
    view: view
      .withViewerWrapper(RsLocalizationWrapper)
      .withCssLoader(BiDi.LTR, ltrCssLoader)
      .withCssLoader(BiDi.RTL, rtlCssLoader),
    ...props
  }

  root.render(createElement(FormViewer, formViewerProps, null))
}
