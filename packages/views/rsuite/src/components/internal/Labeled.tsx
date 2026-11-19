import {namedObserver, useAriaAttributes, useComponentData} from '@react-form-builder/core'
import cx from 'clsx'
import type {ComponentProps, ReactElement} from 'react'
import {cloneElement, forwardRef} from 'react'
import styles from './Labeled.module.css'

interface LabeledProps extends Omit<ComponentProps<'div'>, 'children'> {
  label?: string
  /**
   * If true, ARIA attributes will be passed automatically to children.
   */
  passAriaToChildren: boolean
  /**
   * If true, field id and ARIA attributes are applied to the group host.
   * Use for composite controls where children must keep their own accessible names (WCAG 2.5.3).
   */
  passAriaToGroup?: boolean
  children: ReactElement<any>
}

/**
 * The React component that adds a label to a child component.
 * @param props the React component properties.
 * @param props.label the component label.
 * @param props.children the children component.
 * @param props.passAriaToChildren if true, ARIA attributes will be passed automatically to children.
 * @param props.passAriaToGroup if true, field id and ARIA attributes are applied to the group host.
 * @param props.className the CSS class name.
 * @returns the React element.
 */
const RawLabeled = forwardRef<HTMLDivElement, LabeledProps>(function RawLabeled(
  {label, children, passAriaToChildren, passAriaToGroup = false, className, ...props},
  ref
) {
  const {id} = useComponentData()
  const aria = useAriaAttributes({labeled: !!label})

  return (
    <div ref={ref} {...props} {...(passAriaToGroup ? {id, ...aria} : undefined)} role="group" className={cx(styles.container, className)}>
      {label && (
        <label id={aria['aria-labelledby']} htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      {/* eslint-disable-next-line @eslint-react/no-clone-element -- Preserve optional form ID and label ARIA injection into the supplied control. */}
      {passAriaToChildren ? cloneElement(children, {id, ...aria}) : children}
    </div>
  )
})

export const Labeled = namedObserver('Labeled', RawLabeled)
