import * as fastQrComponent from '@react-form-builder/components-fast-qr'
import * as googleMapComponent from '@react-form-builder/components-google-map'
import * as richTextComponent from '@react-form-builder/components-rich-text'
import * as rSuiteComponents from '@react-form-builder/components-rsuite'
import {formEngineRsuiteCssLoader, ltrCssLoader, RsLocalizationWrapper, rtlCssLoader} from '@react-form-builder/components-rsuite'
import * as signatureComponent from '@react-form-builder/components-signature'
import type {BuilderComponent} from '@react-form-builder/core'
import {BiDi, BuilderView} from '@react-form-builder/core'
import type {FormBuilderProps} from '@react-form-builder/designer'
import {FormBuilder} from '@react-form-builder/designer'
import {createElement} from 'react'
// eslint-disable-next-line import/extensions
import {createRoot} from 'react-dom/client'

const components = [
  ...rSuiteComponents.rSuiteComponents,
  richTextComponent.richTextComponent,
  signatureComponent.signatureComponent,
  fastQrComponent.fastQrComponent,
  googleMapComponent.googleMapComponent
].map(definer => definer.build())

/**
 * Displays the FormBuilder component on the specified HTML element.
 * @param container the HTML element.
 * @param props the component properties.
 * @returns React Root.
 */
export function renderFormBuilderTo(container: HTMLElement, props: Partial<FormBuilderProps>) {
  const root = createRoot(container)

  const view = props.view ?? new BuilderView(components)
    .withViewerWrapper(RsLocalizationWrapper)
    .withCssLoader(BiDi.LTR, ltrCssLoader)
    .withCssLoader(BiDi.RTL, rtlCssLoader)
    .withCssLoader('common', formEngineRsuiteCssLoader)

  const formBuilderProps: FormBuilderProps = {
    ...props,
    view
  }

  root.render(createElement(FormBuilder, formBuilderProps, null))
  return root
}

/**
 * Creates metadata for form builder components.
 * @param components the array of metadata of form builder components.
 * @returns the {@link BuilderView} instance.
 */
export function createBuilderView(components: BuilderComponent[]) {
  return new BuilderView(components)
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

export {rSuiteComponents, richTextComponent, signatureComponent, fastQrComponent, googleMapComponent}
export {ActionDefinition, buildForm, Language} from '@react-form-builder/core'
