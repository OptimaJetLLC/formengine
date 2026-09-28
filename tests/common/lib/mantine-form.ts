import mantinePackageJsonRaw from '../../../packages/views/mantine/package.json'

interface PackageJsonExports {
  [key: string]: string | {import?: string; require?: string}
}

const mantinePackageJson = mantinePackageJsonRaw as {exports?: PackageJsonExports}

const EXCLUDED_COMPONENT_TYPES = new Set(['MtViewerWrapper'])

function getWrappedMantineComponentTypes(packageJson: {exports?: PackageJsonExports} = mantinePackageJson): Set<string> {
  const exports = packageJson.exports
  if (!exports || typeof exports !== 'object') {
    throw new Error('Mantine package.json has no exports field')
  }

  const wrappedTypes = new Set<string>()

  for (const [key, value] of Object.entries(exports)) {
    if (key === '.' || key === './view' || key === './package.json') {
      continue
    }

    const importPath = typeof value === 'string' ? value : (value.import ?? value.require)
    if (!importPath || !importPath.startsWith('./src/components/') || !importPath.endsWith('.tsx')) {
      continue
    }

    const exportName = key.replace(/^\.\//, '')
    if (!exportName) {
      continue
    }

    wrappedTypes.add(`Mt${exportName[0]?.toUpperCase()}${exportName.slice(1)}`)
  }

  return wrappedTypes
}

/**
 * Returns component type names (e.g. MtButton, MtCheckbox) from the mantine package.json exports.
 * Uses exports as the source of truth, but only includes types that have a FormEngine wrapper (Definer).
 * Multiple exports that map to the same underlying component file (e.g. chipCheckboxGroup/chipRadioGroup)
 * are preserved as separate component types (MtChipCheckboxGroup, MtChipRadioGroup).
 * @param packageJson mantine package.json object (defaults to imported package.json)
 * @returns sorted list of component type names
 */
function getMantineComponentTypes(packageJson: {exports?: PackageJsonExports} = mantinePackageJson): string[] {
  const wrappedComponentTypes = getWrappedMantineComponentTypes(packageJson)

  const exports = packageJson.exports
  if (!exports || typeof exports !== 'object') {
    throw new Error('Mantine package.json has no exports field')
  }
  const types: string[] = []
  for (const key of Object.keys(exports)) {
    if (key === '.' || key === './view' || key === './package.json') {
      continue
    }
    const exportName = key.replace(/^\.\//, '')
    if (!exportName) {
      continue
    }
    const typeName = `Mt${exportName[0]?.toUpperCase()}${exportName.slice(1)}`
    if (wrappedComponentTypes.has(typeName) && !EXCLUDED_COMPONENT_TYPES.has(typeName)) {
      types.push(typeName)
    }
  }
  return types.sort((a, b) => a.localeCompare(b))
}

/**
 * Converts component type (e.g. MtTextInput) to a label without the Mt prefix (e.g. Text Input).
 * @param type component type name
 * @returns human-readable label
 */
function componentTypeToLabel(type: string): string {
  const withoutPrefix = type.replace(/^Mt/, '')
  return withoutPrefix.replace(/([A-Z])/g, (_m, _p1, offset) => (offset ? ' ' : '') + _m).trim()
}

/**
 * Builds default text props for components that render textual content.
 * Falls back to the common `label` prop for input-like components.
 * @param type component type name
 * @returns props object with the proper text prop key
 */
function buildDefaultTextProps(type: string): Record<string, {value: string}> {
  const label = componentTypeToLabel(type)

  if (type === 'MtTypography') {
    return {content: {value: label}}
  }

  if (type === 'MtButton' || type === 'MtText' || type === 'MtTitle') {
    return {children: {value: label}}
  }

  return {label: {value: label}}
}

/**
 * Builds Mantine form JSON with one row per component type (labels only).
 * @param componentTypes list of component type names (e.g. MtButton, MtTextInput)
 * @returns form JSON object
 */
function buildMantineFormJson(componentTypes: string[]): any {
  const children: any[] = componentTypes.map((type, index) => ({
    key: `${type}-${index + 1}`,
    type,
    props: buildDefaultTextProps(type),
  }))

  return {
    version: '1',
    tooltipType: 'MtTooltip',
    modalType: 'MtDialog',
    form: {
      key: 'Screen',
      type: 'Screen',
      props: {},
      children,
    },
    localization: {},
    languages: [
      {
        code: 'en',
        dialect: 'US',
        name: 'English',
        description: 'American English',
        bidi: 'ltr',
      },
    ],
    defaultLanguage: 'en-US',
  }
}

/**
 * Generates Mantine form JSON (all components from package exports, sorted alphabetically).
 * @returns form JSON object
 */
export function generateMantineFormJson(): any {
  const componentTypes = getMantineComponentTypes()
  return buildMantineFormJson(componentTypes)
}
