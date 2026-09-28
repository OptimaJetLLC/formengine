import {ltrCssLoader, RsViewWrapper, rSuiteComponents, rtlCssLoader} from '@react-form-builder/components-rsuite'
import {ActionDefinition, BiDi, ComponentLocalizer, createView, FormViewerLite} from '@react-form-builder/core'
import formObj from './user.form.json'

const form = JSON.stringify(formObj)

const componentsMetadata = rSuiteComponents.map(definer => definer.build().model)

const view = createView(componentsMetadata)
  .withViewerWrapper(RsViewWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)

const formName = 'Example'

function getFormFn(name?: string) {
  if (name === formName) return form
  throw new Error(`Form '${name}' is not found.`)
}

const actions = {
  logEventArgs: (e: unknown) => console.log(e),
  assertArgs: ActionDefinition.functionalAction((e, args) => console.log(e, args), {
    p1: 'string',
    p2: 'boolean',
    p3: 'number',
  }),
}

const onFormDataChange = ({data, errors}: any) => {
  console.log('onFormDataChange', {data, errors})
}

const localizeFn: ComponentLocalizer = (componentStore, language) => {
  return componentStore.key === 'submit' && language.code === 'en' ? {children: `Submit`} : {}
}

export const ViewerLite = ({
  withLocalizer,
  getForm,
  formName: formNameProps,
}: {
  withLocalizer?: boolean
  getForm?: (name?: string) => string
  formName?: string
}) => (
  <FormViewerLite
    view={view}
    getForm={getForm ?? getFormFn}
    formName={formNameProps ?? formName}
    localize={withLocalizer ? localizeFn : undefined}
    initialData={{}}
    onFormDataChange={onFormDataChange}
    actions={actions}
  />
)
