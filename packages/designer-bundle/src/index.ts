import * as fastQrComponent from '@react-form-builder/components-fast-qr'
import {fastQrComponentsDescriptions} from '@react-form-builder/components-fast-qr'
import * as googleMapComponent from '@react-form-builder/components-google-map'
import {googleMapComponentsDescriptions} from '@react-form-builder/components-google-map'
import * as printComponent from '@react-form-builder/components-print'
import {printComponentsDescriptions} from '@react-form-builder/components-print'
import * as richTextComponent from '@react-form-builder/components-rich-text'
import {richTextEditorComponentsDescriptions} from '@react-form-builder/components-rich-text'
import * as rSuiteComponents from '@react-form-builder/components-rsuite'
import {ltrCssLoader, rSuiteComponentsDescriptions, RsViewWrapper, rtlCssLoader} from '@react-form-builder/components-rsuite'
import * as rSuiteTableComponents from '@react-form-builder/components-rsuite-table'
import {rSuiteTableComponentsDescriptions} from '@react-form-builder/components-rsuite-table'
import * as signatureComponent from '@react-form-builder/components-signature'
import {signatureComponentsDescriptions} from '@react-form-builder/components-signature'
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
  googleMapComponent.googleMapComponent,
  ...printComponent.printComponents,
  ...rSuiteTableComponents.rSuiteTableComponents,
].map(definer => definer.build())

const defaultView = new BuilderView(components)
  .withViewerWrapper(RsViewWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)
  .withComponentLibraryDescription(fastQrComponentsDescriptions)
  .withComponentLibraryDescription(googleMapComponentsDescriptions)
  .withComponentLibraryDescription(richTextEditorComponentsDescriptions)
  .withComponentLibraryDescription(signatureComponentsDescriptions)
  .withComponentLibraryDescription(printComponentsDescriptions)
  .withComponentLibraryDescription(rSuiteTableComponentsDescriptions)
  .withComponentLibraryDescription(rSuiteComponentsDescriptions)

const noCssView = new BuilderView(components)
  .withViewerWrapper(RsViewWrapper)
  .withComponentLibraryDescription(fastQrComponentsDescriptions)
  .withComponentLibraryDescription(googleMapComponentsDescriptions)
  .withComponentLibraryDescription(richTextEditorComponentsDescriptions)
  .withComponentLibraryDescription(signatureComponentsDescriptions)
  .withComponentLibraryDescription(printComponentsDescriptions)
  .withComponentLibraryDescription(rSuiteTableComponentsDescriptions)
  .withComponentLibraryDescription(rSuiteComponentsDescriptions)

/**
 * Displays the FormBuilder component on the specified HTML element.
 * @param container the HTML element.
 * @param props the component properties.
 * @returns React Root.
 */
export function renderFormBuilderTo(container: HTMLElement, props: Partial<FormBuilderProps>) {
  const root = createRoot(container)

  const view = props.view ?? defaultView

  const formBuilderProps: FormBuilderProps = {
    ...props,
    view,
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

export {rSuiteComponents, richTextComponent, signatureComponent, fastQrComponent, googleMapComponent, printComponent, rSuiteTableComponents}
export {ActionDefinition, buildForm, Language} from '@react-form-builder/core'
export {noCssView, defaultView}
