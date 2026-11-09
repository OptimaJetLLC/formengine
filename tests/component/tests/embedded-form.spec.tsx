import {builderViewWithCss} from '@react-form-builder/components-rsuite'
import {buildForm} from '@react-form-builder/core'
import {fireEvent} from '@testing-library/react'
import {renderBuilder} from '../util/renderBuilder'
import {renderForm} from '../util/renderRsuiteForm'

const message = 'The name of the form and options are not specified, set at least one value to display the form'

describe('EmbeddedForm tests', () => {
  it('A message should be displayed if formName or options are not defined', async () => {
    const form = buildForm().component('embeddedForm', 'EmbeddedForm').json()

    const {findByText} = await renderBuilder(form)

    expect(await findByText(message)).toBeInTheDocument()
  })

  it('A message should not be displayed if formName or options are not defined', async () => {
    const form = buildForm().component('embeddedForm', 'EmbeddedForm').json()

    const {queryByText} = renderForm(form)

    const message = 'The name of the form and options are not specified, set at least one value to display the form'
    expect(queryByText(message)).not.toBeInTheDocument()
  })

  it('The nested form should be displayed if the formName property is specified', async () => {
    const embeddedForm = buildForm().component('header', 'RsHeader').prop('content', 'My embedded header').json()

    const form = buildForm().component('embeddedForm', 'EmbeddedForm').prop('formName', 'my-embedded-form').json()

    const getForm = (name?: string) => {
      if (!name) return form
      if (name === 'my-embedded-form') return embeddedForm
      throw new Error(`Unexpected form name \`${name}\``)
    }

    const {findByText} = renderForm(form, {getForm})

    expect(await findByText('My embedded header')).toBeInTheDocument()
  })

  it('The nested form should be displayed if the options property is specified', async () => {
    const embeddedForm = buildForm().component('header', 'RsHeader').prop('content', 'My test header').json()

    const form = buildForm().component('embeddedForm', 'EmbeddedForm').prop('options', {test: true}).json()

    const getForm = (name?: string, options?: any) => {
      if (options?.test === true) return embeddedForm
      if (!name) return form
      throw new Error(`Unexpected form name \`${name}\``)
    }

    const {findByText} = renderForm(form, {getForm})

    expect(await findByText('My test header')).toBeInTheDocument()
  })

  it('The nested form should be displayed after specifying the name of the form in the designer', async () => {
    const embeddedForm = buildForm().component('header', 'RsHeader').prop('content', 'Header inside the form').json()

    const form = buildForm().component('embeddedForm', 'EmbeddedForm').json()

    const getForm = (name?: string) => {
      if (!name) return form
      if (name === 'lonely-form') return embeddedForm
      throw new Error(`Unexpected form name \`${name}\``)
    }

    const view = builderViewWithCss.withTemplates(['lonely-form', 'absent'])

    const {findByText, findAllByText, findByTestId} = await renderBuilder(form, {getForm, view})

    const component = await findByText(message)
    fireEvent.click(component)

    const formNamePicker = await findByTestId('formName-property-input')

    fireEvent.click(formNamePicker)

    const items = await findAllByText('lonely-form')
    const item = items.find(item => item.tagName.toLowerCase() === 'span')
    if (!item) {
      throw new Error("Can't find the dropdown item 'lonely-form'")
    }
    fireEvent.click(item)

    expect(await findByText('Header inside the form')).toBeInTheDocument()
  })
})
