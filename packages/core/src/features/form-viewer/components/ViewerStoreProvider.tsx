import {assign} from 'lodash-es'
import {useLocalObservable} from 'mobx-react'
import {ReactNode, useContext, useEffect, useMemo} from 'react'
import {Store} from '../../../stores/Store'
import {StoreContext, StoreProvider} from '../../../utils/contexts/StoreContext'
import {DefaultActions} from '../../event'
import {getTemplateName} from '../../ui/templateModel'
import {FormViewerProps} from '../types'
import {ViewerPropsProvider} from './ViewerPropsContext'

/**
 * React component encapsulating MobX storage for the form viewer.
 * @param props the React component properties.
 * @param props.children the children of the React component.
 * @param props.props the properties of the form viewer component.
 * @returns the React element.
 */
export const ViewerStoreProvider = ({children, props}: { children: ReactNode, props: FormViewerProps }) => {
  const observableProps = useLocalObservable(() => props)
  const storeFromContext = useContext(StoreContext)
  const store = useMemo(() => storeFromContext || new Store(observableProps, DefaultActions), [])

  useEffect(() => {
    assign(observableProps, props)
  })

  useEffect(() => {
    props.view.templates().forEach(model => {
      const templateName = getTemplateName(model.type)
      const defaultProps = {templateName}
      const modifiedModel = Object.assign(model, {defaultProps: defaultProps})
      props.view.define(modifiedModel)
    })
  }, [])

  return (
    <ViewerPropsProvider value={observableProps}>
      <StoreProvider value={store}>
        {children}
      </StoreProvider>
    </ViewerPropsProvider>
  )
}
