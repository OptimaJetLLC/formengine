import {ComponentStore} from 'fb-core'

//TODO can stringify and parse to form
export function getSampleForm() {
  let formScreen = new ComponentStore('screen 1', 'Screen')
  formScreen.children = []

  const formHeader = new ComponentStore('header 1', 'Header')
  formHeader.props.content = 'Application Form'
  formHeader.props.subheader = 'Make it easier'
  formScreen.children.push(formHeader)

  const title = new ComponentStore('title', 'Input')
  title.props.label = 'Title'
  formScreen.children.push(title)

  const anotherContainer = new ComponentStore('input container', 'Container')
  anotherContainer.children = []
  formScreen.children.push(anotherContainer)

  const nameContainer = new ComponentStore('name container', 'Container')
  nameContainer.children = []
  anotherContainer.children.push(nameContainer)


  const firstName = new ComponentStore('first name', 'Input')
  firstName.props.label = 'First Name'
  nameContainer.children.push(firstName)

  const lastName = new ComponentStore('last name', 'Input')
  lastName.props.label = 'Last Name'
  nameContainer.children.push(lastName)

  const type = new ComponentStore('type', 'Dropdown')
  type.props.block = true
  formScreen.children.push(type)

  const comment = new ComponentStore('comment', 'TextArea')
  formScreen.children.push(comment)

  const buttonContainer = new ComponentStore('button container', 'Container')
  buttonContainer.children = []
  formScreen.children.push(buttonContainer)

  const saveButton = new ComponentStore('save', 'Button')
  saveButton.props.children = 'Save'
  saveButton.props.appearance = 'primary'
  buttonContainer.children.push(saveButton)

  const cancelButton = new ComponentStore('cancel', 'Button')
  cancelButton.props.children = 'Cancel'
  buttonContainer.children.push(cancelButton)

  formScreen.children.push(new ComponentStore('RadioGroup', 'RadioGroup'))


  return formScreen
}
