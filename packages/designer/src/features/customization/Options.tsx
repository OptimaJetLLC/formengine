import type {ComponentType, CSSProperties, ReactElement} from 'react'

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
