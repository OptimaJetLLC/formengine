import {builderViewWithCss} from '@react-form-builder/components-rsuite'
import {
  type CustomizableKey,
  CustomizableZone,
  CustomizationMap,
  FormBuilder,
  FormBuilderProps,
  Options,
  useFormBuilder
} from '@react-form-builder/designer'
import {generatedLicenseKey} from '@react-form-builder/tests-common/lib/designer/utils/license'
import {fireEvent, render} from '@testing-library/react'
import {klona} from 'klona/full'
import {useCallback} from 'react'
import {Button} from 'rsuite'
import {describe, expect} from 'vitest'
import form from './forms/designer-customization.json'

const getFormFn = () => JSON.stringify(form)

const App = ({customization}: Partial<FormBuilderProps>) => {
  return <FormBuilder
    customization={customization}
    licenseKey={generatedLicenseKey}
    getForm={getFormFn}
    view={builderViewWithCss}
  />
}

// TODO FE-1134
const disabledZones = new Set([
  'LocalizationSelect',
  'JsonViewButton',
  'ToggleThemeButton',

  'PropertyInput',
  'PropertyLabel',
  'PropertyCodeButton',
  'LabeledProperty',

  'RightPanel_Content',

  'Forms_Tab',

  'Main_Tab_Content',
  'Actions_Tab_Content',
  'Style_Tab_Content',
  'Tree_Tab_Content',
  'Components_Tab_Content',
  'Settings_Tab_Content',
  'Rules_Tab_Content',
  'Forms_Tab_Content'
])

const targetStyle = {
  backgroundColor: 'red !important'
}
const zoneCustomClass = 'TEST_CUSTOM_CLASS'
const zoneRenderedClass = 'TEST_RENDER_CUSTOM_CLASS'
const zoneRenderContent = 'TEST_CUSTOM_CONTENT'
const customRenderer = () => {
  return (<div className={zoneRenderedClass} data-testid="custom-renderer">
    {zoneRenderContent}
  </div>)
}

const isolate = false
const only = isolate ? new Set(['Tree_Tab']) : undefined

function createZoneStaticCustomization(): Array<[CustomizableKey, CustomizationMap]> {
  return Array.from(CustomizableZone)
    .filter(z => !disabledZones.has(z))
    .filter(z => typeof only === 'undefined' ? true : only.has(z))
    .map(zone => ([zone, {
      [zone]: {
        className: zoneCustomClass,
        style: targetStyle,
        customRenderer: undefined,
        hidden: undefined
      } as Options
    }]))
}

describe.each(createZoneStaticCustomization())(`should apply all possible customization settings for every zone`, function (zone, customization) {
  const zoneClassName = `.FE_${zone}:not(.FE_Palette_Component):not(.FE_Palette_ComponentGroup)`

  it(`should have target zone ${zone} in the document`, async () => {
    const {container, findByTestId} = render(<App customization={customization}/>)

    // ensure that the component is rendered
    expect(await findByTestId('reactVersion')).toBeInTheDocument()

    expect(container.querySelector(zoneClassName)).toBeInTheDocument()
  })

  it(`should apply respect hidden customization for ${zone}`, async () => {
    const config = klona(customization)
    config[zone]!.hidden = true

    const {container, findByTestId} = render(<div data-testid="test-app"><App customization={config}/></div>)

    // ensure that the component is rendered
    expect(await findByTestId('test-app')).toBeInTheDocument()

    expect(container.querySelector(zoneClassName)).not.toBeInTheDocument()
  })

  it(`should apply class customization for ${zone}`, async () => {
    const {container, findByTestId} = render(<App customization={customization}/>)

    // ensure that the component is rendered
    expect(await findByTestId('reactVersion')).toBeInTheDocument()

    expect(container.querySelector(zoneClassName)).toHaveClass(zoneCustomClass)
  })

  it(`should apply custom renderer customization for ${zone} with className`, async () => {
    const config = klona(customization)
    config[zone]!.customRenderer = customRenderer
    const {container, findByTestId} = render(<App customization={config}/>)

    // ensure that the component is rendered
    expect(await findByTestId('custom-renderer')).toBeInTheDocument()

    expect(container.querySelector(`div.${zoneRenderedClass}`)).toBeInTheDocument()
  })

  it(`should apply custom renderer customization for ${zone} with replaced content`, async () => {
    const config = klona(customization)
    config[zone]!.customRenderer = customRenderer
    const {container, findByTestId} = render(<App customization={config}/>)

    // ensure that the component is rendered
    expect(await findByTestId('custom-renderer')).toBeInTheDocument()

    expect(container.querySelector(`div.${zoneRenderedClass}`)).toHaveTextContent(zoneRenderContent)
  })

  it(`should apply style customization for ${zone}`, async () => {
    const {container, findByTestId} = render(<App customization={customization}/>)

    // ensure that the component is rendered
    expect(await findByTestId('reactVersion')).toBeInTheDocument()

    expect(container.querySelector(zoneClassName)).toHaveStyle(targetStyle)
  })
})

const toggleTestId = 'test-toggle-button'
const toggleLabels = {
  builder: 'EditMode',
  viewer: 'PreviewMode'
}

const CustomToggleModeButton = () => {
  const builder = useFormBuilder()
  const label = toggleLabels[builder.builderMode]
  const toggleMode = useCallback(() => (
    builder.builderMode = builder.builderMode === 'builder'
      ? 'viewer'
      : 'builder'
  ), [builder])

  return <Button onClick={toggleMode} data-testid={toggleTestId}>{label}</Button>
}

export const customization: CustomizationMap = {
  ToggleModeButton: {
    customRenderer: () => <CustomToggleModeButton/>
  }
}

describe(`Custom renderer`, function () {
  it('should observe the FormBuilder changes', async () => {
    const {findByTestId} = render(<App customization={customization}/>)
    const toggleButton = await findByTestId(toggleTestId)
    expect(toggleButton).toHaveTextContent(toggleLabels['builder'])

    fireEvent.click(toggleButton)
    expect(toggleButton).toHaveTextContent(toggleLabels['viewer'])
  })
})
