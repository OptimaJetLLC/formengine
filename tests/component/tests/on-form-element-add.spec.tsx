import {builderViewWithCss} from '@react-form-builder/components-rsuite'
import {ComponentStore} from '@react-form-builder/core'
import type {IPresetComponentOptions} from '@react-form-builder/designer'
import {FormBuilder} from '@react-form-builder/designer'
import {generatedLicenseKey} from '@react-form-builder/tests-common/lib/designer/utils/license'
import {fireEvent, render, waitFor, within} from '@testing-library/react'
import {describe, expect, it, vi} from 'vitest'
import emptyForm from './forms/empty-form.json'

const PRESET_NAME = 'TestPresetForCallback'

const presetComponentOptions: IPresetComponentOptions = {
  components: [
    {
      name: PRESET_NAME,
      category: 'Presets',
      components: [ComponentStore.createFromObject({key: 'presetChild1', type: 'RsInput'})],
    },
  ],
}

describe('FormBuilder onFormElementAdd', () => {
  it('includes presetName when a preset is added via the add button and component modal', async () => {
    const onFormElementAdd = vi.fn()
    const getForm = () => JSON.stringify(emptyForm)

    const {findByRole, findByTestId} = render(
      <FormBuilder
        licenseKey={generatedLicenseKey}
        getForm={getForm}
        view={builderViewWithCss}
        presetComponentOptions={presetComponentOptions}
        onFormElementAdd={onFormElementAdd}
      />
    )

    await findByTestId('mainScreen')
    fireEvent.click(await findByTestId('add-button'))
    const presetModal = await findByRole('dialog')
    fireEvent.click(within(presetModal).getByTestId(`${PRESET_NAME}-palette-component`))

    await waitFor(() => {
      expect(onFormElementAdd).toHaveBeenCalled()
    })

    const payload = onFormElementAdd.mock.calls[0][0]
    expect(payload.presetName).toBe(PRESET_NAME)
    expect(payload.source.model.type).toBe('RsInput')
  })

  it('does not set presetName when a regular component is added via the add button and modal', async () => {
    const onFormElementAdd = vi.fn()
    const getForm = () => JSON.stringify(emptyForm)

    const {findByRole, findByTestId} = render(
      <FormBuilder licenseKey={generatedLicenseKey} getForm={getForm} view={builderViewWithCss} onFormElementAdd={onFormElementAdd} />
    )

    await findByTestId('mainScreen')
    fireEvent.click(await findByTestId('add-button'))
    const calendarModal = await findByRole('dialog')
    fireEvent.click(within(calendarModal).getByTestId('RsCalendar-palette-component'))

    await waitFor(() => {
      expect(onFormElementAdd).toHaveBeenCalled()
    })

    const payload = onFormElementAdd.mock.calls[0][0]
    expect(payload.presetName).toBeUndefined()
    expect(payload.source.model.type).toBe('RsCalendar')
  })
})
