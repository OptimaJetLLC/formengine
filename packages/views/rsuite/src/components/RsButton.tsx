import {boolean, define, event, oneOf, string} from '@react-form-builder/core'
import {Button} from 'rsuite'
import {readOnly, size} from '../commonProperties'

export const rsButton = define(Button, 'RsButton')
  .name('Button')
  .props({
    active: boolean.hinted('A button can show it is currently the active user selection'),
    appearance: oneOf('default', 'primary', 'link', 'subtle', 'ghost')
      .default('default')
      .hinted('A button can have different appearances'),
    children: string.required.named('Content').default('Button'),
    color: oneOf('red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet')
      .hinted('A button can have different colors'),
    disabled: boolean.hinted('A button can show it is currently unable to be interacted with'),
    readOnly,
    href: string.hinted('Providing a href will render an <a> element'),
    loading: boolean.hinted('A button can show a loading indicator'),
    size,
    onClick: event,
    //onMouseOver: event,
    //onMouseLeave: event,
  })
