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

// todo builder mode (выделение слотов и шаблонов)
// todo маппинг экшенов

const Template = () => {
  const viewerProps = useViewerProps()
  const {field} = useComponentData()

  if (!viewerProps.getForm) return <TemplateLoadError>Please define <code>getForm</code> property!</TemplateLoadError>
  if (!(field instanceof FormField)) return null

  const formField = field as FormField
  return <StoreProvider value={formField.form.store}>
    <FormViewer {...formField.props}/>
  </StoreProvider>
}

export function createTemplateModel(name: string) {
  const typeName = generateTemplateTypeName(name)
  const defaultProps = {name, storeDataInParentForm: true}
  return new Model(Template, name, undefined, typeName, defaultProps, undefined, typeName)
}

export const templateTypeNamePrefix = 'Template:'

export function generateTemplateTypeName(name: string) {
  return templateTypeNamePrefix + name
}

export function getTemplateName(typeName: string) {
  if (typeName.startsWith(templateTypeNamePrefix)) return typeName.slice(templateTypeNamePrefix.length)
  throw `Cannot determine template name from '${typeName}'`
}
