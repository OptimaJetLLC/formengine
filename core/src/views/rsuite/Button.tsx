import {Button} from 'rsuite'
import {boolean, event, string} from '../../features/annotation'
import {define} from '../../features/annotation/utils/define'

export const button = define(Button)
  .props({
    children: string.isRequired('Button'),
    //appearance: {title: "Appearance", defaultValue: "default"},
    //title: {title: 'Title', defaultValue: "Button"},
    onClick: event,
    block: boolean.with({defaultValue: true}),
    //onMouseOver: event,
    //onMouseLeave: event,
  })

