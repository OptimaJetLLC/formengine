import styled from '@emotion/styled'
import {useMemo} from 'react'
import {Store} from '../../stores/Store'
import {ComponentData, useComponentData} from '../../utils/contexts/ComponentDataContext'
import {StoreProvider} from '../../utils/contexts/StoreContext'
import {createNonNullableContext} from '../../utils/createNonNullableContext'
import {Model} from '../define'
import {FormViewer, FormViewerProps} from '../form-viewer'
import {useViewerProps} from '../form-viewer/components/ViewerPropsContext'
import {generateTemplateTypeName, getTemplateName} from '../ui/templateUtil'
import {TemplateField} from '../validation/utils/TemplateField'

const TemplateLoadError = styled.span`
  font-size: xx-large;
  color: red;
`

// todo action mapping

interface TemplateContext {
  data: ComponentData
  viewerProps: Readonly<FormViewerProps>
  templateProps: Record<string, any>
}

export const [useTemplate, TemplateProvider] = createNonNullableContext<TemplateContext>('TemplateContext')

const Template = (templateProps: Record<string, any>) => {
  const viewerProps = useViewerProps()
  const data = useComponentData()
  const templateViewerProps = useMemo(() => {
    return Object.assign({}, viewerProps, {
      formName: getTemplateName(data.store.type),
      computeChildren: undefined,
      externalFormValidators: undefined
    })
  }, [viewerProps])

  if (!viewerProps.getForm) return <TemplateLoadError>Please define <code>getForm</code> property!</TemplateLoadError>
  if (!(data.field instanceof TemplateField)) return null
  // todo remove cast
  const viewerStore = data.field.viewerStore as Store

  return (
    <TemplateProvider value={{templateProps, viewerProps, data}}>
      <StoreProvider value={viewerStore}>
        <FormViewer {...templateViewerProps}/>
      </StoreProvider>
    </TemplateProvider>
  )
}

/**
 * Creates the template component metadata for the form viewer.
 * @param name the template name.
 * @returns the template component metadata for the form viewer.
 */
export function createTemplateModel(name: string) {
  const typeName = generateTemplateTypeName(name)
  const defaultProps = {name, storeDataInParentForm: true}
  return new Model(Template, name, undefined, typeName, 'object', defaultProps, undefined, typeName)
}
