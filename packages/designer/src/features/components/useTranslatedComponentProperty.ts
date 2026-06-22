import type {Annotation} from '@react-form-builder/core'
import {isProperty} from '@react-form-builder/core'
import type {ReactNode} from 'react'
import {useCallback, useMemo} from 'react'
import {useTranslationPart} from '../localization/hooks'
import {useComponentLibraryDescription} from '../ui/ComponentBar/useComponentLibraryDescription'

/**
 * The translated component property.
 */
type TranslatedComponentProperty = {
  /**
   * The property hint.
   */
  hint: ReactNode
  /**
   * The property label.
   */
  label: string
}

const useComponentPropertyDescription = (componentType: string, annotation: Annotation) => {
  const propertyKey = annotation.key
  const getLibraryDescription = useComponentLibraryDescription()

  const name = useMemo(() => {
    if (!isProperty(annotation)) return

    const result = getLibraryDescription(libraryDescription => {
      return libraryDescription?.components?.[componentType]?.props?.[propertyKey]?.name
    })
    return result ?? getLibraryDescription(libraryDescription => {
      return libraryDescription?.commonProperties?.[propertyKey]?.name
    })
  }, [annotation, componentType, getLibraryDescription, propertyKey])

  const description = useMemo(() => {
    if (!isProperty(annotation)) return

    const result = getLibraryDescription(libraryDescription => {
      return libraryDescription?.components?.[componentType]?.props?.[propertyKey]?.description
    })
    return result ?? getLibraryDescription(libraryDescription => {
      return libraryDescription?.commonProperties?.[propertyKey]?.description
    })
  }, [annotation, componentType, getLibraryDescription, propertyKey])

  return useMemo(() => ({name, description}), [description, name])
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

  const propertyDescription = useComponentPropertyDescription(componentType, annotation)

  const getLabel = useCallback((key: string) => {
    return componentLabels(key) || commonLabels(key)
  }, [commonLabels, componentLabels])

  const hint = useMemo(() => {
    return propertyDescription?.description ?? annotation.hint ?? getLabel('hint')
  }, [annotation.hint, getLabel, propertyDescription?.description])

  const label = useMemo(() => {
    return propertyDescription?.name || getLabel('name') || annotation.name
  }, [annotation.name, getLabel, propertyDescription?.name])

  return useMemo(() => ({
    hint,
    label,
  }), [hint, label])
}
