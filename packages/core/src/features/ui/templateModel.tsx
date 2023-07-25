import styled from '@emotion/styled'
import {useComponentData} from '../../utils/contexts/ComponentDataContext'
import {StoreProvider} from '../../utils/contexts/StoreContext'
import {Model} from '../define'
import {FormViewer} from '../form-viewer'
import {useViewerProps} from '../form-viewer/components/ViewerPropsContext'
import {FormField} from '../validation/utils/FormField'

const TemplateLoadError = styled.span`
  font-size: xx-large;
  color: red;
`

// todo builder mode (selecting slots and templates)
// todo action mapping

const Template = () => {
  const viewerProps = useViewerProps()
  const {field} = useComponentData()

  if (!viewerProps.getForm) return <TemplateLoadError>Please define <code>getForm</code> property!</TemplateLoadError>
  if (!(field instanceof FormField)) return null

  return <StoreProvider value={field.form.store}>
    <FormViewer {...field.props}/>
  </StoreProvider>
}

/**
 * Creates the template component metadata for the form viewer.
 * @param name the template name.
 * @returns the template component metadata for the form viewer.
 */
export function createTemplateModel(name: string) {
  const typeName = generateTemplateTypeName(name)
  const defaultProps = {name, storeDataInParentForm: true}
  return new Model(Template, name, undefined, typeName, defaultProps, undefined, typeName)
}

export const templateTypeNamePrefix = 'Template:'

/**
 * Generates the template type name from the specified template name.
 * @param name the template name.
 * @returns the template type name.
 */
export function generateTemplateTypeName(name: string) {
  return templateTypeNamePrefix + name
}

/**
 * Extracts the template name from the specified component type name.
 * @param typeName the component type name.
 * @returns the template name.
 */
export function getTemplateName(typeName: string) {
  if (typeName.startsWith(templateTypeNamePrefix)) return typeName.slice(templateTypeNamePrefix.length)
  throw new Error(`Cannot determine template name from '${typeName}'`)
}
