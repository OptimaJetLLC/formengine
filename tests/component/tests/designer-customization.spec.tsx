import {builderViewWithCss} from '@react-form-builder/components-rsuite'
import {
  type CustomizableKey,
  CustomizableZone,
  CustomizationMap,
  FormBuilder,
  FormBuilderProps,
  IFormStorage,
  Options,
  useFormBuilder,
} from '@react-form-builder/designer'
import {generatedLicenseKey} from '@react-form-builder/tests-common/lib/designer/utils/license'
import {fireEvent, render} from '@testing-library/react'
import {klona} from 'klona/full'
import {useCallback} from 'react'
import {Button} from 'rsuite'
import {describe, expect, vi} from 'vitest'
import {openToolbarActions} from '../util/openToolbarActions'
import form from './forms/designer-customization.json'

/**
 * Avoid @monaco-editor/react async ready setState (act warnings). Customization only needs a mountable stub.
 */
vi.mock('../../../packages/designer/src/features/components/CodeEditor/MonacoCodeEditor', () => ({
  MonacoCodeEditor: ({className}: {className?: string}) => <div className={['monaco-editor', className].filter(Boolean).join(' ')} />,
}))

const getFormFn = () => JSON.stringify(form)

const App = (props: Partial<FormBuilderProps>) => {
  return <FormBuilder licenseKey={generatedLicenseKey} getForm={getFormFn} view={builderViewWithCss} {...props} />
}

const targetStyle = {
  backgroundColor: 'red !important',
}
const zoneCustomClass = 'TEST_CUSTOM_CLASS'
const zoneRenderedClass = 'TEST_RENDER_CUSTOM_CLASS'
const zoneRenderContent = 'TEST_CUSTOM_CONTENT'
const customRenderer = () => {
  return (
    <div className={zoneRenderedClass} data-testid="custom-renderer">
      {zoneRenderContent}
    </div>
  )
}

const editableWrapperTestId = 'comment-editable-wrapper'

type ActivateHelpers = {
  container: HTMLElement
  findByTestId: (id: string) => Promise<HTMLElement>
}

type ZoneAccess = {
  /** Extra FormBuilder props required for the zone to mount. */
  builderProps?: Partial<FormBuilderProps>
  /** UI steps required before the zone is present and testable. */
  activate?: (helpers: ActivateHelpers) => Promise<void>
  /**
   * Extra wait used by presence/class/style assertions after activate.
   * Skipped for hidden/customRenderer where the zone content is intentionally absent.
   */
  awaitVisible?: (helpers: ActivateHelpers) => Promise<void>
}

const formStorage: IFormStorage = {
  getForm: async () => getFormFn(),
  getFormNames: async () => ['designer-customization'],
  removeForm: async () => undefined,
  saveForm: async () => undefined,
}

const formStorageProps: Partial<FormBuilderProps> = {
  formStorage,
  formName: 'designer-customization',
  persistFormName: false,
}

const selectEditableComponent = async ({findByTestId}: ActivateHelpers) => {
  fireEvent.click(await findByTestId(editableWrapperTestId))
}

const selectEditableAndOpenToolbarActions = async (helpers: ActivateHelpers) => {
  await selectEditableComponent(helpers)
  await openToolbarActions()
}

const queryInDocument = (container: HTMLElement, selector: string) => {
  return container.querySelector(selector) ?? container.ownerDocument.querySelector(selector)
}

const openLeftTab =
  (tabTestId: string) =>
  async ({findByTestId}: ActivateHelpers) => {
    fireEvent.click(await findByTestId(tabTestId))
  }

const openRightTab = (tabTestId: string) => async (helpers: ActivateHelpers) => {
  await selectEditableComponent(helpers)
  fireEvent.click(await helpers.findByTestId(tabTestId))
}

const openMainMenu = async ({container}: ActivateHelpers) => {
  const menuButton = container.querySelector('.FE_MainMenu_Button > button') as HTMLElement | null
  expect(menuButton).toBeInTheDocument()
  fireEvent.click(menuButton!)
}

/**
 * Zones that wrap the form canvas. Hiding or replacing them removes `reactVersion` from the document.
 */
const formHostZones = new Set<CustomizableKey>(['MainContainer', 'CentralPanel', 'FormContainer'])

const assignZoneAccess = (zones: readonly CustomizableKey[], access: ZoneAccess): Partial<Record<CustomizableKey, ZoneAccess>> =>
  Object.fromEntries(zones.map(zone => [zone, access]))

const selectEditableAccess: ZoneAccess = {activate: selectEditableComponent}
const openMainMenuAccess: ZoneAccess = {activate: openMainMenu}
const openMainMenuWithStorageAccess: ZoneAccess = {
  builderProps: formStorageProps,
  activate: openMainMenu,
}

/**
 * FE-1134: zones that need builder props and/or extra UI steps before customization can be asserted.
 */
const zoneAccessConfig: Partial<Record<CustomizableKey, ZoneAccess>> = {
  ...assignZoneAccess(
    [
      'Component_Toolbar',
      'Component_Toolbar_Items',
      'Component_Toolbar_Title',
      'RightPanel_Content',
      'LabeledProperty',
      'PropertyInput',
      'PropertyLabel',
      'PropertyCodeButton',
    ],
    selectEditableAccess
  ),

  ...assignZoneAccess(
    [
      'Component_Toolbar_AddButton',
      'Component_Toolbar_NearbyTreeButton',
      'Component_Toolbar_CloneButton',
      'Component_Toolbar_PresetComponentButton',
      'Component_Toolbar_RemoveButton',
      'Component_Toolbar_RevealInTreeButton',
    ],
    {activate: selectEditableAndOpenToolbarActions}
  ),

  Tree_Tab_Content: {activate: openLeftTab('Tree_Tab')},
  Settings_Tab_Content: {activate: openLeftTab('Settings_Tab')},
  Forms_Tab: {builderProps: formStorageProps},
  Forms_Tab_Content: {
    builderProps: formStorageProps,
    activate: openLeftTab('Forms_Tab'),
    // Wait for async form list reload so presence assertions do not race setState.
    awaitVisible: async ({findByTestId}) => {
      await findByTestId('add-new-form-button')
      await findByTestId('form-list-item-designer-customization')
    },
  },

  Main_Tab_Content: {activate: openRightTab('Main_Tab')},
  Style_Tab_Content: {activate: openRightTab('Style_Tab')},
  Actions_Tab_Content: {activate: openRightTab('Actions_Tab')},
  Rules_Tab_Content: {activate: openRightTab('Rules_Tab')},

  ...assignZoneAccess(
    ['MainMenu_Item_Download', 'MainMenu_Item_Upload', 'MainMenu_Item_Clear', 'MainMenu_Item_Print', 'MainMenu_Item_LanguageSwitch'],
    openMainMenuAccess
  ),

  ...assignZoneAccess(
    [
      'MainMenu_Item_AddNewForm',
      'MainMenu_Item_Save',
      'MainMenu_Item_SaveAs',
      // eslint-disable-next-line no-secrets/no-secrets
      'MainMenu_Item_ExportForms',
      'MainMenu_Item_ImportForms',
    ],
    openMainMenuWithStorageAccess
  ),

  // eslint-disable-next-line no-secrets/no-secrets
  MainMenu_Item_ExportJsonFormSchema: {
    builderProps: {
      generateJsonFormSchema: () => '{}',
    },
    activate: openMainMenu,
  },
}

function createZoneStaticCustomization(): Array<[CustomizableKey, CustomizationMap, ZoneAccess | undefined]> {
  return Array.from(CustomizableZone).map(zone => [
    zone,
    {
      [zone]: {
        className: zoneCustomClass,
        style: targetStyle,
        customRenderer: undefined,
        hidden: undefined,
      } as Options,
    },
    zoneAccessConfig[zone],
  ])
}

describe.each(createZoneStaticCustomization())(
  `should apply all possible customization settings for every zone`,
  function (zone, customization, access) {
    const zoneClassName = `.FE_${zone}:not(.FE_Palette_Component):not(.FE_Palette_ComponentGroup)`
    const builderProps = access?.builderProps
    // Form-host zones remove/replace the canvas, so reactVersion is unavailable under hide/replace.
    const awaitForm = !formHostZones.has(zone)

    const renderZone = (zoneCustomization: CustomizationMap) => {
      return render(<App customization={zoneCustomization} {...builderProps} />)
    }

    const readyAndActivate = async (
      container: HTMLElement,
      findByTestId: (id: string) => Promise<HTMLElement>,
      options?: {awaitForm?: boolean; awaitVisible?: boolean}
    ) => {
      if (options?.awaitForm ?? true) {
        expect(await findByTestId('reactVersion')).toBeInTheDocument()
      }
      await access?.activate?.({container, findByTestId})
      if (options?.awaitVisible) {
        await access?.awaitVisible?.({container, findByTestId})
      }
    }

    it(`should apply class and style customization for ${zone}`, async () => {
      const {container, findByTestId, unmount} = renderZone(customization)
      try {
        await readyAndActivate(container, findByTestId, {awaitVisible: true})
        const el = queryInDocument(container, zoneClassName)
        expect(el).toBeInTheDocument()
        expect(el).toHaveClass(zoneCustomClass)
        expect(el).toHaveStyle(targetStyle)
      } finally {
        unmount()
      }
    })

    it(`should apply respect hidden customization for ${zone}`, async () => {
      const config = klona(customization)
      config[zone]!.hidden = true

      const {container, findByTestId} = render(
        <div data-testid="test-app">
          <App customization={config} {...builderProps} />
        </div>
      )

      expect(await findByTestId('test-app')).toBeInTheDocument()
      await readyAndActivate(container, findByTestId, {awaitForm})

      expect(queryInDocument(container, zoneClassName)).not.toBeInTheDocument()
    })

    it(`should apply custom renderer customization for ${zone}`, async () => {
      const config = klona(customization)
      config[zone]!.customRenderer = customRenderer
      const {container, findByTestId, findAllByTestId} = renderZone(config)
      await readyAndActivate(container, findByTestId, {awaitForm})

      // Some zones (e.g. property editors) mount many instances of the same customizable key.
      expect(await findAllByTestId('custom-renderer')).not.toHaveLength(0)
      const rendered = queryInDocument(container, `div.${zoneRenderedClass}`)
      expect(rendered).toBeInTheDocument()
      expect(rendered).toHaveTextContent(zoneRenderContent)
    })
  }
)

const toggleTestId = 'test-toggle-button'
const toggleLabels = {
  builder: 'EditMode',
  viewer: 'PreviewMode',
}

const CustomToggleModeButton = () => {
  const builder = useFormBuilder()
  const label = toggleLabels[builder.builderMode]
  const toggleMode = useCallback(() => (builder.builderMode = builder.builderMode === 'builder' ? 'viewer' : 'builder'), [builder])

  return (
    <Button onClick={toggleMode} data-testid={toggleTestId}>
      {label}
    </Button>
  )
}

export const customization: CustomizationMap = {
  ToggleModeButton: {
    customRenderer: () => <CustomToggleModeButton />,
  },
}

describe(`Custom renderer`, function () {
  it('should observe the FormBuilder changes', async () => {
    const {findByTestId} = render(<App customization={customization} />)
    const toggleButton = await findByTestId(toggleTestId)
    expect(toggleButton).toHaveTextContent(toggleLabels['builder'])

    fireEvent.click(toggleButton)
    expect(toggleButton).toHaveTextContent(toggleLabels['viewer'])
  })
})
