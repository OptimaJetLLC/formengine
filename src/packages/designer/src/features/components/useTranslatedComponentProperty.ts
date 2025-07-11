import type {Annotation} from '@react-form-builder/core'
import type {ReactNode} from 'react'
import {useCallback, useMemo} from 'react'
import {useTranslationPart} from '../localization/hooks'

/**
 * The translated component property.
 */
export type TranslatedComponentProperty = {
  /**
   * The property hint.
   */
  hint: ReactNode
  /**
   * The property label.
   */
  label: string
}

/**
 * Returns the translated component property.
 * @param annotation the metadata for a React component property.
 * @param componentType the React component type.
 * @returns the translated component property.
 */
export const useTranslatedComponentProperty = (annotation: Annotation,
                                               componentType: string): TranslatedComponentProperty => {
  const commonLabels = useTranslationPart(`annotation.${annotation.key}`)
  const componentLabels = useTranslationPart(`${componentType}.${annotation.key}`)

  const getLabel = useCallback((key: string) => {
    return componentLabels(key) || commonLabels(key)
  }, [commonLabels, componentLabels])

  const hint = useMemo(() => {
    return annotation.hint ?? getLabel('hint')
  }, [annotation.hint, getLabel])

  const label = useMemo(() => {
    return getLabel('name') || annotation.name
  }, [annotation.name, getLabel])

  return useMemo(() => ({
    hint,
    label,
  }), [hint, label])
}
