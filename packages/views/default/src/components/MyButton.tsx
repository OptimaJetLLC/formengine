import {boolean, define, event, string} from '@react-form-builder/core'

const MyButton = (props: JSX.IntrinsicElements['button']) => {
  return <button {...props}/>
}
export const myButton = define(MyButton, 'MyButton')
  .name('MyButton')
  .props({
    children: string.required.named('Content').hinted('Caption').default('Ant Button'),
    disabled: boolean.hinted('Disabled state of button').default(false),
    onClick: event
  })
