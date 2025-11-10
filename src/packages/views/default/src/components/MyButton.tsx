import {define, disabled, event, string} from '@react-form-builder/core'
import {JSX} from 'react'

const MyButton = (props: JSX.IntrinsicElements['button']) => {
  return <button {...props}/>
}
export const myButton = define(MyButton, 'MyButton')
  .name('MyButton')
  .props({
    children: string.required.named('Content').hinted('Caption').default('HTML Button').dataBound,
    disabled: disabled.hinted('Disabled state of button').default(false),
    onClick: event
  })
