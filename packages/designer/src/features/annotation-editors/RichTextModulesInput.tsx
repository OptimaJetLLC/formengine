import {namedObserver, PropertyAnnotation, startCase} from '@react-form-builder/core'
import {useCallback, useMemo} from 'react'
import {Checkbox} from 'rsuite'
import type {CheckboxProps, ValueType} from 'rsuite/esm/Checkbox/Checkbox'
import {useTranslatedComponentProperty} from '../components/useTranslatedComponentProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {HintedLabel} from './Hinted'
import {ObjectInput} from './ObjectInput'
import styles from './RichTextModulesInput.module.css'

interface RichTextModulesEditorProps {
  featureNames?: string[]
  applyFeatureToModules?: (feature: string, enabled: boolean, existing?: Record<string, unknown>) => Record<string, unknown>
  featureStateFromModules?: (modules: Record<string, unknown> | undefined, feature: string) => 'on' | 'off' | 'partial'
}

function asModules(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined
  return value as Record<string, unknown>
}

interface FeatureCheckboxProps {
  feature: string
  state: 'on' | 'off' | 'partial'
  onToggle: (feature: string, enabled: boolean) => void
}

const FeatureCheckbox = ({feature, state, onToggle}: FeatureCheckboxProps) => {
  const partial = state === 'partial'
  const handleChange = useCallback<NonNullable<CheckboxProps['onChange']>>(
    (_: ValueType | undefined, checked: boolean) => {
      if (partial) return
      onToggle(feature, checked)
    },
    [feature, onToggle, partial]
  )

  return (
    <Checkbox checked={state === 'on'} indeterminate={partial} disabled={partial} onChange={handleChange}>
      <span className={styles.label}>{startCase(feature)}</span>
    </Checkbox>
  )
}

const RawRichTextModulesInput = (props: AnnotationEditorProps) => {
  const {value, onChange, componentData} = props
  const editorProps = (props.annotation.editorProps ?? {}) as RichTextModulesEditorProps
  const {featureNames = [], applyFeatureToModules, featureStateFromModules} = editorProps
  const modules = asModules(value)

  const featuresAnnotation = useMemo(() => {
    const result = new PropertyAnnotation('features', 'Features')
    Object.assign(result, {
      calculable: false,
      localizable: false,
      editor: 'boolean',
    })
    return result
  }, [])

  const {label, hint} = useTranslatedComponentProperty(featuresAnnotation, componentData.model.type)

  const handleFeatureChange = useCallback(
    (feature: string, enabled: boolean) => {
      if (!applyFeatureToModules) return
      onChange(applyFeatureToModules(feature, enabled, modules))
    },
    [applyFeatureToModules, modules, onChange]
  )

  return (
    <>
      <div className={styles.features}>
        <HintedLabel hint={hint} className={styles.title}>
          {label}
        </HintedLabel>
        <div className={styles.list}>
          {featureNames.map(feature => (
            <FeatureCheckbox
              key={feature}
              feature={feature}
              state={featureStateFromModules?.(modules, feature) ?? 'off'}
              onToggle={handleFeatureChange}
            />
          ))}
        </div>
      </div>
      <ObjectInput {...props} />
    </>
  )
}

/**
 * Designer editor for rich text `modules`. Feature checkboxes merge into that blob.
 * @param props the annotation editor component properties.
 * @returns the React element.
 */
// eslint-disable-next-line no-secrets/no-secrets -- observer display name
export const RichTextModulesInput = namedObserver('RichTextModulesInput', RawRichTextModulesInput)
