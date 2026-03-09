import {css, cx} from '@emotion/css'
import type {CSSInterpolation} from '@emotion/serialize'
import {observer} from 'mobx-react'
import type {ComponentType, CSSProperties, ReactElement} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import type {CustomizableKey} from './types'

/**
 * Customization options for the FormBuilder component.
 */
export type Options = {
  /**
   * True if you want to hide the component.
   */
  hidden?: boolean
  /**
   * The component className.
   */
  className?: string
  /**
   * The component style. Supported formats - CSSProperties object, standard CSS as string, nested selectors.
   */
  style?: CSSProperties | string
  /**
   * The component custom renderer.
   * @param defaultElement the default rendering result.
   * @param component the React component.
   * @param props the props that were sent to the component.
   * @returns the customized ReactElement.
   */
  customRenderer?: (defaultElement: ReactElement, component: ComponentType<any>, props: any) => ReactElement | null
}

/**
 * The map of customizations for the FormBuilder components.
 */
export type CustomizationMap = Partial<Record<CustomizableKey, Options>>

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

    if (!settings) return <CustomizableComponent {...props} className={cx(customizationStaticClassName, props.className)}/>
    if (settings.hidden) return null

    const {style, customRenderer} = settings
    const className = cx(customizationStaticClassName, props?.className, settings.className, css`${style as CSSInterpolation}`, key)
    const result = <CustomizableComponent {...props} className={className}/>

    return customRenderer ? customRenderer(result, component, props) : result
  }
}

/**
 * Creates the customizable observer component. **Internal use only.**
 * @param key the key of the customizable component. It is also set to the displayName and add to the className.
 * @param component the React component.
 * @template T the component property type.
 * @returns the customizable observer component.
 */
export const customizableObserver = <T = any>(key: CustomizableKey, component: ComponentType<T>): ComponentType<T> => {
  return customizable(key, observer(component))
}
