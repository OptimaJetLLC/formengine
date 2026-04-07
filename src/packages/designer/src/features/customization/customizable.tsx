import cx from 'clsx'
import type {ComponentType} from 'react'
import {useEffect, useMemo} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {CustomizedStyleSheet} from './CustomizedStyleSheet'
import type {CustomizableKey} from './types'

/**
 * Creates the customizable React component. **Internal use only.**
 * @param key the key of the customizable component. It is also set to the displayName and add to the className.
 * @param component the React component.
 * @template T the component property type.
 * @returns the customizable React component.
 */
export const customizable = <T = any>(key: CustomizableKey, component: ComponentType<T>) => {
  component.displayName = key
  const CustomizableComponent = component
  const customizationStaticClassName = `FE_${key}`

  return function Customizable(props: any) {
    const builderStore = useBuilderStore()
    const settings = builderStore.props.customization?.[key]

    const styleSheet = useMemo(() => new CustomizedStyleSheet(settings?.style), [settings?.style])

    useEffect(() => {
      styleSheet.insertStyleSheet()
      return () => {
        styleSheet.removeStyleSheet()
      }
    }, [styleSheet])

    if (!settings) return <CustomizableComponent {...props} className={cx(customizationStaticClassName, props.className)}/>
    if (settings.hidden) return null

    const {customRenderer} = settings
    const className = cx(customizationStaticClassName, props?.className, settings.className, styleSheet.className, key)
    const result = <CustomizableComponent {...props} className={className}/>

    return customRenderer ? customRenderer(result, component, props) : result
  }
}
