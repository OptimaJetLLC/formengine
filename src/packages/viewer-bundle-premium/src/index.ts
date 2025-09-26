import * as fastQrComponent from '@react-form-builder/components-fast-qr'
import * as googleMapComponent from '@react-form-builder/components-google-map'
import * as richTextComponent from '@react-form-builder/components-rich-text'
import * as rSuiteComponents from '@react-form-builder/components-rsuite'
import {formEngineRsuiteCssLoader, ltrCssLoader, RsLocalizationWrapper, rtlCssLoader} from '@react-form-builder/components-rsuite'
import * as rSuiteTableComponents from '@react-form-builder/components-rsuite-table'
import * as signatureComponent from '@react-form-builder/components-signature'
import type {FormViewerProps} from '@react-form-builder/core'
import {BiDi, createView, FormViewer} from '@react-form-builder/core'
import {createElement} from 'react'
// eslint-disable-next-line import/extensions
import {createRoot} from 'react-dom/client'

const models = [
  ...rSuiteComponents.models,
  richTextComponent.richTextModel,
  signatureComponent.signatureModel,
  fastQrComponent.fastQrModel,
  googleMapComponent.googleMapModel,
  ...rSuiteTableComponents.tableModels,
]

/**
 * Displays the FormViewer component on the specified HTML element.
 * @param container the HTML element.
 * @param props the component properties.
 * @returns React Root.
 */
export function renderFormViewerTo(container: HTMLElement, props: Partial<FormViewerProps>) {
  const root = createRoot(container)

  const view = props.view ?? createView(models)
    .withViewerWrapper(RsLocalizationWrapper)
    .withCssLoader(BiDi.LTR, ltrCssLoader)
    .withCssLoader(BiDi.RTL, rtlCssLoader)
    .withCssLoader('common', formEngineRsuiteCssLoader)

  const formViewerProps: FormViewerProps = {
    ...props,
    view
  }

  root.render(createElement(FormViewer, formViewerProps, null))
  return root
}

/**
 * Displays the FormViewer component on the specified HTML element.
 * @param elementId the HTML element identifier.
 * @param props the component properties.
 * @returns React Root.
 */
export function renderFormViewer(elementId: string, props: Partial<FormViewerProps>) {
  const container = document.getElementById(elementId)
  if (!container) throw new Error(`Cannot find element with id '${elementId}'`)
  return renderFormViewerTo(container, props)
}

export {rSuiteComponents, richTextComponent, signatureComponent, fastQrComponent, googleMapComponent, rSuiteTableComponents}
export {ActionDefinition, buildForm, Language, createView} from '@react-form-builder/core'
