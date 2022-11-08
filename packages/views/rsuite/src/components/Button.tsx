import {boolean, define, event, oneOf, string} from 'fb-core'
import {Button} from 'rsuite'

export const button = define(Button)
  .props({
    children: string.required.named("Content").default('Button'),
    appearance: oneOf('default', 'primary', 'link', 'subtle', 'ghost').default('default'),
    onClick: event,
    block: boolean.default(true),
    size: oneOf('xs', 'sm', 'md', 'lg').labeled('Extra small', 'Small', 'Medium', 'Large').default('md')
    //onMouseOver: event,
    //onMouseLeave: event,
  })

