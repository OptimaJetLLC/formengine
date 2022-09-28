import _ from 'lodash'
import {screen} from '../components/Screen'
import {ComponentStore} from '../stores/ComponentStore'
import {header} from '../views/rsuite/Header'
import {input} from '../views/rsuite/Input'
import {container} from '../views/rsuite/Container'
import {dropdown} from '../views/rsuite/Dropdown'
import {textArea} from '../views/rsuite/TextArea'
import {button} from '../views/rsuite/Button'

//TODO can stringify and parse to form
export function getSampleForm() {
  let formScreen = new ComponentStore('screen 1', screen.type)
  formScreen.children = []
  //store.model.components.push(formScreen)

  let formHeader = new ComponentStore('header 1', header.type)
  _.set(formHeader, 'props.content', 'Application Form')
  _.set(formHeader, 'props.subheader', 'Make it easier')
  formScreen.children.push(formHeader)

  let title = new ComponentStore('title', input.type)
  _.set(title, 'props.label', 'Title')
  //this.models.push(title)
  formScreen.children.push(title)

  let anotherContainer = new ComponentStore('input container', container.type)
  anotherContainer.children = []
  formScreen.children.push(anotherContainer)

  let nameContainer = new ComponentStore('name container', container.type)
  nameContainer.children = []
  anotherContainer.children.push(nameContainer)
  //this.models.push(nameContainer)


  let firstName = new ComponentStore('first name', input.type)
  _.set(firstName, 'props.label', 'First Name')
  nameContainer.children.push(firstName)

  let lastName = new ComponentStore('last name', input.type)
  _.set(lastName, 'props.label', 'Last Name')
  nameContainer.children.push(lastName)

  let type = new ComponentStore('type', dropdown.type)
  _.set(type, 'props.label', 'Type')
  _.set(type, 'props.data', [
    {label: 'Internal', value: 'Internal'},
    {label: 'External', value: 'External'},
    {label: 'Direct', value: 'Direct'}])
  _.set(type, 'props.block', true)
  formScreen.children.push(type)

  let comment = new ComponentStore('comment', textArea.type)
  _.set(comment, 'props.label', 'Comment')
  _.set(comment, 'props.rows', 5)
  formScreen.children.push(comment)

  let buttonContainer = new ComponentStore('button container', container.type)
  buttonContainer.children = []
  formScreen.children.push(buttonContainer)

  let saveButton = new ComponentStore('save', button.type)
  _.set(saveButton, 'props.children', 'Save')
  _.set(saveButton, 'props.appearance', 'primary')
  buttonContainer.children.push(saveButton)
  //this.models.push(saveButton);

  let cancelButton = new ComponentStore('cancel', button.type)
  _.set(cancelButton, 'props.children', 'Cancel')
  buttonContainer.children.push(cancelButton)

  return formScreen
}
