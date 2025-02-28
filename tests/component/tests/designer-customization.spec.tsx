import {type CustomizableKey, CustomizableZone, CustomizationMap, Options} from '@react-form-builder/designer'
import {render} from '@testing-library/react'
import i18n from 'i18next'
import {klona} from 'klona/full'
import {initReactI18next} from 'react-i18next'
import {describe, expect} from 'vitest'
import App from '../../common/lib/designer/App'

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
const customRenderer = (defaultElement: any, component: any, props: any) => (<div className={zoneRenderedClass}>
  {zoneRenderContent}
</div>)

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

  beforeAll(() => {
    i18n.use(initReactI18next).init({resources: {}}).catch(console.error)
  })

  it(`should have target zone ${zone} in the document`, async () => {
    const {container} = render(<App customization={customization}/>)

    expect(container.querySelector(zoneClassName)).toBeInTheDocument()
  })

  it(`should apply respect hidden customization for ${zone}`, async () => {
    const config = klona(customization)
    config[zone]!.hidden = true

    const {container} = render(<App customization={config}/>)

    expect(container.querySelector(zoneClassName)).not.toBeInTheDocument()
  })

  it(`should apply class customization for ${zone}`, async () => {
    const {container} = render(<App customization={customization}/>)

    expect(container.querySelector(zoneClassName)).toHaveClass(zoneCustomClass)
  })

  it(`should apply custom renderer customization for ${zone} with className`, async () => {
    const config = klona(customization)
    config[zone]!.customRenderer = customRenderer
    const {container} = render(<App customization={config}/>)

    expect(container.querySelector(`div.${zoneRenderedClass}`)).toBeInTheDocument()
  })

  it(`should apply custom renderer customization for ${zone} with replaced content`, async () => {
    const config = klona(customization)
    config[zone]!.customRenderer = customRenderer
    const {container} = render(<App customization={config}/>)

    expect(container.querySelector(`div.${zoneRenderedClass}`)).toHaveTextContent(zoneRenderContent)
  })

  it(`should apply style customization for ${zone}`, async () => {
    const {container} = render(<App customization={customization}/>)

    expect(container.querySelector(zoneClassName)).toHaveStyle(targetStyle)
  })
})
