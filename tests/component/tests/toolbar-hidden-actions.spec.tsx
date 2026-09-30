import type {CustomizationMap} from '@react-form-builder/designer'
import {fireEvent, waitFor, within} from '@testing-library/react'
import {renderBuilder} from '../util/renderBuilder'

const form = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'nestedButton',
        type: 'RsButton',
        props: {
          children: {
            value: 'Nested',
          },
        },
      },
    ],
  },
}

const actionZones = [
  'Component_Toolbar_AddButton',
  'Component_Toolbar_NearbyTreeButton',
  'Component_Toolbar_CloneButton',
  'Component_Toolbar_PresetComponentButton',
  'Component_Toolbar_RemoveButton',
  'Component_Toolbar_RevealInTreeButton',
] as const

type ActionZone = (typeof actionZones)[number]

const hideZones = (...visible: ActionZone[]): CustomizationMap => {
  const hidden = actionZones.filter(zone => !visible.includes(zone))
  return Object.fromEntries(hidden.map(zone => [zone, {hidden: true}]))
}

const selectNestedButton = async (findByTestId: (id: string) => Promise<HTMLElement>) => {
  fireEvent.click(await findByTestId('nestedButton-editable-wrapper'))
}

describe('Toolbar action strip', () => {
  it('removes the selected component when all actions are available', async () => {
    const {findByTestId, queryByTestId} = await renderBuilder(form)
    await selectNestedButton(findByTestId)

    fireEvent.click(await findByTestId('toolbar-actions-button'))
    fireEvent.click(await findByTestId('toolbar-remove-button'))

    await waitFor(() => expect(queryByTestId('nestedButton-editable-wrapper')).not.toBeInTheDocument())
  })

  it('clones the selected component when only add and clone remain', async () => {
    const {findByTestId} = await renderBuilder(form, {
      customization: hideZones('Component_Toolbar_AddButton', 'Component_Toolbar_CloneButton'),
    })
    await selectNestedButton(findByTestId)

    fireEvent.click(await findByTestId('toolbar-actions-button'))
    fireEvent.click(await findByTestId('tree-clone-button'))

    await waitFor(async () => expect(await findByTestId('rsButton1-editable-wrapper')).toBeInTheDocument())
  })

  it('adds a sibling when only add remains', async () => {
    const {findByRole, findByTestId, findByText} = await renderBuilder(form, {
      customization: hideZones('Component_Toolbar_AddButton'),
    })
    await selectNestedButton(findByTestId)

    fireEvent.click(await findByTestId('toolbar-actions-button'))
    fireEvent.click(document.querySelector('[data-fe-toolbar] .add-button')!)
    fireEvent.click(await findByRole('button', {name: 'After'}))

    const dialog = await findByRole('dialog')
    fireEvent.click(await within(dialog).findByText('Label'))

    await waitFor(async () => expect(await findByTestId('rsLabel1-editable-wrapper')).toBeInTheDocument())
    expect(await findByText('Nested')).toBeInTheDocument()
  })

  it('leaves the form unchanged when every toolbar action is hidden', async () => {
    const {findByTestId, queryByRole, queryByTestId} = await renderBuilder(form, {
      customization: hideZones(),
    })
    await selectNestedButton(findByTestId)

    expect(queryByRole('button', {name: 'Open actions'})).toBeNull()
    expect(queryByRole('button', {name: 'Remove component'})).toBeNull()
    expect(queryByRole('button', {name: 'Clone component'})).toBeNull()
    expect(queryByTestId('nestedButton-editable-wrapper')).toBeInTheDocument()
  })
})
