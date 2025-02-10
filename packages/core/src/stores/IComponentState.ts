/**
 * Calculates all the properties of the form view component.
 */
export interface IComponentState {
  /**
   * @returns combined in order of priority component properties.
   */
  get get(): Record<string, any>

  /**
   * Calculates and returns wrapper className property.
   * @returns the Record that contains the className property for the wrapper of component.
   */
  get wrapperClassName(): string

  /**
   * @returns combined component properties in order of priority, excluding child components, the className property
   * does not contain styles additionally defined for the component.
   */
  get propsWithoutChildren(): Record<string, any>

  /**
   * @returns combined in order of priority component properties without children props.
   */
  get ownProps(): Record<string, any>
}

/**
 * The default component state, which does nothing.
 */
export const defaultComponentState: IComponentState = {
  /**
   * @inheritDoc
   */
  get get() {
    return {}
  },
  /**
   * @inheritDoc
   */
  get wrapperClassName() {
    return ''
  },
  /**
   * @inheritDoc
   */
  get propsWithoutChildren() {
    return {}
  },
  /**
   * @inheritDoc
   */
  get ownProps() {
    return {}
  }
}
