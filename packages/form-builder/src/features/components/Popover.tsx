import {Modifier, Placement, VirtualElement} from '@popperjs/core'
import {ReactNode, useState} from 'react'
import {usePopper} from 'react-popper'

/**
 * The properties of the React {@link Popover} component.
 */
interface PopoverProps {
  show: boolean
  parent: Element | VirtualElement | null,
  children: ReactNode
  placement?: Placement
  className?: string
  modifiers?: Partial<Modifier<unknown, object>>[]
}

/**
 * The React component that displays child components on top of another component.
 * @param props the React component properties.
 * @param props.parent the parent component on top of which the child components will be displayed.
 * @param props.show flag, if false, this component will be hidden.
 * @param props.children the child components to be displayed on top.
 * @param props.placement the display position.
 * @param props.modifiers the object containing custom settings for the Popper.js modifiers.
 * @param props.className the CSS class name for the component.
 * @returns the React element.
 */
export const Popover = ({parent, show, children, placement, modifiers, className}: PopoverProps) => {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)
  const {styles, attributes} = usePopper(parent, popperElement, {
    placement: placement,
    modifiers: modifiers,
  })


  if (!show) return null

  return <div
    className={className}
    ref={setPopperElement}
    style={styles.popper}
    {...attributes.popper}
  >
    {children}
  </div>
}
