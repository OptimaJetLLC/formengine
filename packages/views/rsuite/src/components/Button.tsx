import {boolean, define, event, oneOf, string} from 'fb-core'
import {Button} from 'rsuite'
import {size} from '../commonProperties'

export const button = define(Button)
  .props({
    children: string.required.named("Content").default('Button'),
    appearance: oneOf('default', 'primary', 'link', 'subtle', 'ghost').default('default'),
    onClick: event,
    block: boolean.default(true),
    size
    //onMouseOver: event,
    //onMouseLeave: event,
  })

