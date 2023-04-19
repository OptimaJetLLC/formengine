import {boolean, define, event, string} from 'form-builder/view'

const MyButton = (props: JSX.IntrinsicElements['button']) => {
  return <button {...props}/>
}
export const myButton = define(MyButton)
  .name('MyButton')
  .type('MyButton')
  .props({
    children: string.required.named('Content').hinted('Caption').default('Ant Button'),
    disabled: boolean.hinted('Disabled state of button'),
    onClick: event
  })
