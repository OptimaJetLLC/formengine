import {builderViewWithCss} from '@react-form-builder/components-rsuite'
import {FormBuilder} from '@react-form-builder/designer'
import {generatedLicenseKey} from '@react-form-builder/tests-common/lib/designer/utils/license'
import {fireEvent, render} from '@testing-library/react'
import {afterEach, beforeEach, describe, expect, it} from 'vitest'
import form from './forms/designer-form.json'

const PRESET_COMPONENTS_KEY = 'presetComponents'

const PRESET_NAME = 'FE1912'

const presetLocalStoragePayload = {
  [PRESET_NAME]: {
    name: PRESET_NAME,
    category: 'Presets',
    components: [
      {key: 'rsCheckbox1', type: 'RsCheckbox', props: {}},
      {key: 'rsRadioGroup1', type: 'RsRadioGroup', props: {}},
    ],
  },
}

const getForm = () => JSON.stringify(form)

describe('FE-1912 preset from local storage', () => {
  beforeEach(() => {
    localStorage.setItem(PRESET_COMPONENTS_KEY, JSON.stringify(presetLocalStoragePayload))
  })

  afterEach(() => {
    localStorage.removeItem(PRESET_COMPONENTS_KEY)
  })

  it('renders the preset on the palette with its type, not InternalError', async () => {
    const {findByTestId, queryByTestId} = render(
      <FormBuilder getForm={getForm} licenseKey={generatedLicenseKey} view={builderViewWithCss} />
    )

    fireEvent.click(await findByTestId('Components_Tab'))

    expect(await findByTestId(`${PRESET_NAME}-palette-component`)).toBeInTheDocument()
    expect(queryByTestId('InternalError-palette-component')).not.toBeInTheDocument()
  })
})
