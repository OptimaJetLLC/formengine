type ToolbarItem =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strike'
  | 'blockquote'
  | 'code-block'
  | 'image'
  | 'video'
  | 'formula'
  | 'link'
  | {color: []}
  | {background: []}
  | {script: 'super' | 'sub'}
  | {header: Array<number | boolean>}
  | {list: 'ordered' | 'bullet'}
  | {indent: '-1' | '+1'}
  | {align: []}

interface FormatGroupSpec {
  defaultOn?: true
  formats: readonly string[]
  toolbar: readonly (readonly ToolbarItem[])[]
}

/**
 * Format groups. A disabled group is fully off: no toolbar control and no Quill format.
 */
const richTextFormatCatalog = {
  inlineFormatting: {
    defaultOn: true,
    formats: ['bold', 'italic', 'underline', 'strike', 'color', 'background', 'script'],
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{color: []}, {background: []}],
      [{script: 'super'}, {script: 'sub'}],
    ],
  },
  blocks: {
    defaultOn: true,
    formats: ['header', 'blockquote', 'code-block', 'list', 'indent', 'align'],
    toolbar: [
      [{header: [1, 2, 3, 4, 5, 6, false]}],
      [{list: 'ordered'}, {list: 'bullet'}],
      [{indent: '-1'}, {indent: '+1'}],
      [{align: []}],
      ['blockquote'],
      ['code-block'],
    ],
  },
  image: {defaultOn: true, formats: ['image'], toolbar: [['image']]},
  video: {formats: ['video'], toolbar: [['video']]},
  formula: {formats: ['formula'], toolbar: [['formula']]},
  link: {formats: ['link'], toolbar: [['link']]},
} satisfies Record<string, FormatGroupSpec>

type RichTextFormatFeature = keyof typeof richTextFormatCatalog

/**
 * A single rich text editor feature group name.
 */
export type RichTextFeature = RichTextFormatFeature | 'undoRedo' | 'keyboardShortcuts'

/**
 * Public feature flags. Omitted keys keep their defaults.
 */
export type RichTextFeatureFlags = Partial<Record<RichTextFeature, boolean>>

/**
 * Complete, mixed, or absent feature state derived from a modules blob.
 */
export type RichTextFeatureState = 'on' | 'off' | 'partial'

const formatFeatureNames = Object.keys(richTextFormatCatalog) as RichTextFormatFeature[]

/**
 * Feature group names in catalog order.
 */
export const richTextFeatureNames: RichTextFeature[] = [...formatFeatureNames, 'undoRedo', 'keyboardShortcuts']

/**
 * Default feature flags. Video, formula, link, and keyboard shortcuts stay off.
 */
export const defaultRichTextFeatureFlags: Record<RichTextFeature, boolean> = {
  inlineFormatting: true,
  blocks: true,
  image: true,
  video: false,
  formula: false,
  link: false,
  undoRedo: true,
  keyboardShortcuts: false,
}

/**
 * Feature groups enabled when `features` is omitted.
 */
export const defaultRichTextFeatures: readonly RichTextFeature[] = richTextFeatureNames.filter(name => defaultRichTextFeatureFlags[name])

const shortcutKeys = ['bold', 'italic', 'underline'] as const

function sameJson(left: unknown, right: unknown): boolean {
  return JSON.stringify(left) === JSON.stringify(right)
}

/**
 * Returns true when the value is a plain object suitable as a Quill modules blob.
 * @param value the value to test.
 * @returns true if the value is a non-array object.
 */
export function isModulesRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function toolbarContainer(modules: Record<string, unknown> | undefined): unknown[] {
  const toolbar = modules?.toolbar
  if (Array.isArray(toolbar)) return toolbar
  if (isModulesRecord(toolbar) && Array.isArray(toolbar.container)) return toolbar.container
  return []
}

function flattenToolbar(modules: Record<string, unknown> | undefined): unknown[] {
  return toolbarContainer(modules).flat(2)
}

function toolbarItemFormat(item: unknown): string | undefined {
  if (typeof item === 'string') return item
  if (isModulesRecord(item)) {
    const [format] = Object.keys(item)
    return format
  }
  return undefined
}

function toolbarObjectRest(toolbar: unknown): Record<string, unknown> {
  if (!isModulesRecord(toolbar)) return {}
  const {container: _container, ...rest} = toolbar
  return rest
}

function itemInFormatGroup(item: unknown, feature: RichTextFormatFeature): boolean {
  return richTextFormatCatalog[feature].toolbar.some(row => row.some(groupItem => sameJson(groupItem, item)))
}

function stripFormatGroup(container: unknown[], feature: RichTextFormatFeature): unknown[] {
  return container
    .map(row => (Array.isArray(row) ? row.filter(item => !itemInFormatGroup(item, feature)) : row))
    .filter(row => !Array.isArray(row) || row.length > 0)
}

function withToolbarContainer(existing: Record<string, unknown> | undefined, container: unknown[]): Record<string, unknown> {
  const {toolbar, ...rest} = existing ?? {}
  return {
    ...rest,
    toolbar: {
      ...toolbarObjectRest(toolbar),
      container,
    },
  }
}

function applyFormatFeature(feature: RichTextFormatFeature, enabled: boolean, existing?: Record<string, unknown>): Record<string, unknown> {
  const stripped = stripFormatGroup(toolbarContainer(existing), feature)
  const container = enabled ? [...stripped, ...richTextFormatCatalog[feature].toolbar.map(row => [...row])] : stripped
  return withToolbarContainer(existing, container)
}

function applyHistory(enabled: boolean, existing?: Record<string, unknown>): Record<string, unknown> {
  const {history, ...rest} = existing ?? {}
  if (!enabled) {
    return {...rest, history: {...(isModulesRecord(history) ? history : {}), maxStack: 0}}
  }
  if (!isModulesRecord(history)) return rest
  const next = {...history}
  delete next.maxStack
  return Object.keys(next).length ? {...rest, history: next} : rest
}

function applyKeyboard(enabled: boolean, existing?: Record<string, unknown>): Record<string, unknown> {
  const {keyboard, ...rest} = existing ?? {}
  if (!enabled) {
    return {
      ...rest,
      keyboard: {
        ...(isModulesRecord(keyboard) ? keyboard : {}),
        bindings: {bold: false, italic: false, underline: false},
      },
    }
  }
  if (!isModulesRecord(keyboard)) return rest
  const next = {...keyboard}
  if (isModulesRecord(next.bindings)) {
    const bindings = {...next.bindings}
    for (const key of shortcutKeys) delete bindings[key]
    if (Object.keys(bindings).length) {
      next.bindings = bindings
    } else {
      delete next.bindings
    }
  }
  return Object.keys(next).length ? {...rest, keyboard: next} : rest
}

function formatGroupState(modules: Record<string, unknown> | undefined, feature: RichTextFormatFeature): RichTextFeatureState {
  const flat = flattenToolbar(modules)
  const items = richTextFormatCatalog[feature].toolbar.flat()
  const present = items.filter(item => flat.some(entry => sameJson(entry, item))).length
  if (present === 0) return 'off'
  if (present === items.length) return 'on'
  return 'partial'
}

function historyState(modules: Record<string, unknown> | undefined): RichTextFeatureState {
  const history = modules?.history
  return history && typeof history === 'object' && (history as {maxStack?: number}).maxStack === 0 ? 'off' : 'on'
}

function keyboardState(modules: Record<string, unknown> | undefined): RichTextFeatureState {
  const bindings = (modules?.keyboard as {bindings?: Record<string, unknown>} | undefined)?.bindings
  const offs = shortcutKeys.map(key => bindings?.[key] === false)
  if (offs.every(Boolean)) return 'off'
  if (offs.some(Boolean)) return 'partial'
  return 'on'
}

/**
 * Reads whether a feature group is fully on, fully off, or only partially present in `modules`.
 * @param modules the stored modules blob.
 * @param feature the feature group name.
 * @returns the derived feature state.
 */
export function featureStateFromModules(modules: Record<string, unknown> | undefined, feature: RichTextFeature): RichTextFeatureState {
  switch (feature) {
    case 'undoRedo':
      return historyState(modules)
    case 'keyboardShortcuts':
      return keyboardState(modules)
    case 'inlineFormatting':
    case 'blocks':
    case 'image':
    case 'video':
    case 'formula':
    case 'link':
      return formatGroupState(modules, feature)
    default: {
      const unhandled: never = feature
      return unhandled
    }
  }
}

/**
 * Merges one feature flag into a modules blob. Other toolbar items and extra keys are left in place.
 * @param feature the feature group to enable or disable.
 * @param enabled true to fully enable the group, false to fully disable it.
 * @param existing the stored modules blob.
 * @returns modules to persist and pass to Quill.
 */
export function applyFeatureToModules(
  feature: RichTextFeature,
  enabled: boolean,
  existing?: Record<string, unknown>
): Record<string, unknown> {
  switch (feature) {
    case 'undoRedo':
      return applyHistory(enabled, existing)
    case 'keyboardShortcuts':
      return applyKeyboard(enabled, existing)
    case 'inlineFormatting':
    case 'blocks':
    case 'image':
    case 'video':
    case 'formula':
    case 'link':
      return applyFormatFeature(feature, enabled, existing)
    default: {
      const unhandled: never = feature
      return unhandled
    }
  }
}

/**
 * Rebuilds every feature-controlled slice of `modules` from a complete enabled set.
 * @param enabled the enabled feature group names.
 * @param existing the stored modules blob.
 * @returns modules to persist and pass to Quill.
 */
export function applyFeaturesToModules(enabled: ReadonlySet<RichTextFeature>, existing?: Record<string, unknown>): Record<string, unknown> {
  const flags = Object.fromEntries(richTextFeatureNames.map(name => [name, enabled.has(name)])) as Record<RichTextFeature, boolean>
  let result: Record<string, unknown> = existing ?? {}
  for (const name of richTextFeatureNames) {
    result = applyFeatureToModules(name, flags[name], result)
  }
  return result
}

/**
 * Modules stored when a rich text editor is inserted, matching {@link defaultRichTextFeatureFlags}.
 */
export const defaultRichTextModules = applyFeaturesToModules(
  new Set(richTextFeatureNames.filter(name => defaultRichTextFeatureFlags[name]))
)

/**
 * Applies each specified feature flag to `existing`, leaving unspecified groups unchanged.
 * @param flags the feature flags to apply.
 * @param existing the stored modules blob.
 * @returns modules to persist and pass to Quill.
 */
export function modulesFromFeatureFlags(flags: RichTextFeatureFlags, existing?: Record<string, unknown>): Record<string, unknown> {
  let result = existing ?? defaultRichTextModules
  for (const name of richTextFeatureNames) {
    if (name in flags) result = applyFeatureToModules(name, Boolean(flags[name]), result)
  }
  return result
}

/**
 * Builds the Quill formats allowlist. Off groups contribute no formats; partial groups use the stored toolbar.
 * @param modules the stored modules blob.
 * @returns Quill format names to register.
 */
export function formatsFromModules(modules: Record<string, unknown> | undefined): string[] {
  const formats: string[] = []
  const seen = new Set<string>()

  const add = (format: string) => {
    if (seen.has(format)) return
    seen.add(format)
    formats.push(format)
  }

  for (const name of formatFeatureNames) {
    const state = featureStateFromModules(modules, name)
    if (state === 'off') continue
    if (state === 'on') {
      for (const format of richTextFormatCatalog[name].formats) add(format)
      continue
    }
    for (const item of flattenToolbar(modules)) {
      if (!itemInFormatGroup(item, name)) continue
      const format = toolbarItemFormat(item)
      if (format) add(format)
    }
  }

  return formats
}
