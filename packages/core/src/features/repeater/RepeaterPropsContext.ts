import {createNonNullableContext} from '../../utils/createNonNullableContext'
import type {RepeaterProps} from './RepeaterProps'

const defaultRepeaterProps: RepeaterProps = {value: [], children: null}

/**
 * Provides Repeater item properties to cloned rows.
 */
export const [
  /**
   * **Internal use only.**
   */
  useRepeaterProps,
  /**
   * **Internal use only.**
   */
  RepeaterPropsProvider,
] = createNonNullableContext<RepeaterProps>('RepeaterPropsContext', defaultRepeaterProps)
