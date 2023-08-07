import styled from '@emotion/styled'
import {useComponentData} from '../../utils/contexts/ComponentDataContext'
import {Model} from '../define'
import {useViewerProps} from '../form-viewer/components/ViewerPropsContext'
import {FormField} from '../validation/utils/FormField'
import {generateTemplateTypeName} from './templateUtil'

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

  // todo return templates in FB-297
  // const templateViewerProps = Object.assign({}, viewerProps, {
  //   formName: getTemplateName(model.type)
  // })
  return null
  //
  // return <StoreProvider value={field.form.store}>
  //   <FormViewer {...field.props}/>
  // </StoreProvider>
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
