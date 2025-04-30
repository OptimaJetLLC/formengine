import {
  formEngineRsuiteCssLoader,
  ltrCssLoader,
  rsErrorMessage,
  RsLocalizationWrapper,
  rsTooltip,
  rSuiteComponents,
  rtlCssLoader
} from '@react-form-builder/components-rsuite'
import {BiDi, BuilderView} from '@react-form-builder/core'
import type {FormBuilderProps} from '@react-form-builder/designer'
import {FormBuilder} from '@react-form-builder/designer'
import {createElement} from 'react'
// eslint-disable-next-line import/extensions
import {createRoot} from 'react-dom/client'

/**
 * Displays the FormBuilder component on the specified HTML element.
 * @param container the HTML element.
 * @param props the component properties.
 * @returns React Root.
 */
export function renderFormBuilderTo(container: HTMLElement, props: Partial<FormBuilderProps>) {
  const root = createRoot(container)

  const components = rSuiteComponents.map(definer => definer.build())
  const view = new BuilderView(components)
    .withErrorMeta(rsErrorMessage.build())
    .withTooltipMeta(rsTooltip.build())
    .withViewerWrapper(RsLocalizationWrapper)
    .withCssLoader(BiDi.LTR, ltrCssLoader)
    .withCssLoader(BiDi.RTL, rtlCssLoader)
    .withCssLoader('common', formEngineRsuiteCssLoader)

  const formBuilderProps: FormBuilderProps = {
    view: view,
    ...props
  }

  root.render(createElement(FormBuilder, formBuilderProps, null))
  return root
}

/**
 * Displays the FormBuilder component on the specified HTML element.
 * @param elementId the HTML element identifier.
 * @param props the component properties.
 * @returns React Root.
 */
export function renderFormBuilder(elementId: string, props: Partial<FormBuilderProps>) {
  const container = document.getElementById(elementId)
  if (!container) throw new Error(`Cannot find element with id '${elementId}'`)
  return renderFormBuilderTo(container, props)
}

export {ActionDefinition, Language} from '@react-form-builder/core'
