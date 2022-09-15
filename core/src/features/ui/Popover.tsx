import {Modifier, Placement, VirtualElement} from '@popperjs/core'
import React, {ReactNode, useState} from 'react'
import {usePopper} from 'react-popper'

interface PopoverProps {
  show: boolean
  parent: Element | VirtualElement | null,
  children: ReactNode
  placement?: Placement
  className?: string
  modifiers?: Partial<Modifier<unknown, object>>[]
}

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
