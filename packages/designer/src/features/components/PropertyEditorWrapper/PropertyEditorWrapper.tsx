import type {PropertyBlockType} from '@react-form-builder/core'
import {
  Annotation,
  ComponentProperty,
  isProperty,
  isValidatorPropertyBlockType,
  namedObserver,
  useComponentData
} from '@react-form-builder/core'
import {createElement, useCallback, useEffect, useState} from 'react'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {EditorMap} from '../../annotation-editors'
import type {AnnotationEditorProps, CalculableEditorProps} from '../../annotation-editors/AnnotationEditorProps'
import {Erroneous} from './Erroneous'

interface PropertyEditorWrapperProps {
  annotation: Annotation
  context: Record<string, any>
  initContext?: () => Record<string, any>
  propertyBlockType?: PropertyBlockType
}

export const PropertyEditorWrapper = namedObserver('PropertyEditorWrapper', ({
                                                                               annotation,
                                                                               context,
                                                                               initContext,
                                                                               propertyBlockType = 'component'
                                                                             }: PropertyEditorWrapperProps) => {
  // custom editors have the highest priority
  const store = useBuilderStore()
  const componentData = useComponentData()
  const annotationEditor = store.customPropertyEditor(annotation.editor) ?? EditorMap[annotation.editor]
  const [contextInitialized, setContextInitialized] = useState(false)
  const [error, setError] = useState<string>()

  const value = (isProperty(annotation) ? context[annotation.key]?.value : context[annotation.key]) ?? annotation.default

  const onChange = useCallback((value: any) => {
    let propertyContext = context
    if (!contextInitialized) {
      setContextInitialized(true)
      propertyContext = initContext?.() ?? context
    }
    if (isProperty(annotation)) {
      propertyContext[annotation.key] ??= {}
      propertyContext[annotation.key].value = value
      return
    }
    propertyContext[annotation.key] = value
  }, [context, initContext, annotation, contextInitialized])

  useEffect(() => {
    setContextInitialized(false)
  }, [componentData])

  const onClean = useCallback(() => delete context[annotation.key], [context, annotation])

  const showError = useCallback((message?: string) => setError(message), [])

  const setComputedFunction = useCallback((value: string) => {
    const newComponentProperty: ComponentProperty = {computeType: 'function', fnSource: value}
    context[annotation.key] = Object.assign(context[annotation.key] ?? {}, newComponentProperty)
  }, [context, annotation])

  const setComputedLocalization = useCallback((value: string, langCode?: string) => {
    if (!langCode) return
    store.viewer.form.localization.setLocalization(langCode, componentData.key, annotation.key, propertyBlockType, value)
    if (isValidatorPropertyBlockType(propertyBlockType)) return
    const newComponentProperty: ComponentProperty = {computeType: 'localization'}
    context[annotation.key] = Object.assign(context[annotation.key] ?? {}, newComponentProperty)
  }, [context, annotation, store, componentData, propertyBlockType])

  const setComputeCode = useCallback<CalculableEditorProps['setComputeCode']>((value, type, params) => {
    switch (type) {
      case 'function':
        return setComputedFunction(value)
      case 'localization':
        return setComputedLocalization(value, params?.langCode)
    }
  }, [setComputedFunction, setComputedLocalization])

  const getComputedFunction = useCallback(() => {
    return context[annotation.key]?.fnSource
  }, [context, annotation])

  const getComputedLocalization = useCallback((langCode: string) => {
    const localization = store.viewer.form.localization
      .getLocalization(langCode, componentData.key, annotation.key, propertyBlockType)
    return localization ?? ''
  }, [store, componentData, annotation, propertyBlockType])

  const getComputeCode = useCallback<CalculableEditorProps['getComputeCode']>((type, params) => {
    switch (type) {
      case 'function':
        return getComputedFunction()
      case 'localization':
        return params?.langCode ? getComputedLocalization(params?.langCode) : ''
    }
  }, [getComputedFunction, getComputedLocalization])

  const disableCompute = useCallback(() => {
    if (isValidatorPropertyBlockType(propertyBlockType)) {
      store.viewer.form.localization.removeLocalizationForType(componentData.key, propertyBlockType)
      return
    }
    const newComponentProperty: ComponentProperty = {computeType: undefined}
    context[annotation.key] = Object.assign(context[annotation.key] ?? {}, newComponentProperty)
  }, [context, annotation])

  const hasLocalization = useCallback(() => {
    return store.viewer.form.localization
      .hasLocalization(componentData.key, annotation.key, propertyBlockType)
  }, [store, componentData, annotation, propertyBlockType])

  const getComputeType = useCallback(() => {
    if (isValidatorPropertyBlockType(propertyBlockType) && hasLocalization()) return 'localization'
    const componentProperty = context[annotation.key]
    return componentProperty?.computeType
  }, [context, annotation, getComputedLocalization])

  const hasComputeCode = useCallback<CalculableEditorProps['hasComputeCode']>(type => {
    if (type === 'function') return !!getComputeCode('function')
    return hasLocalization()
  }, [getComputeCode, hasLocalization])

  const annotationEditorProps: AnnotationEditorProps = {
    value,
    onChange,
    onClean,
    annotation,
    showError,
    componentData,
    setComputeCode,
    getComputeCode,
    disableCompute,
    getComputeType,
    hasComputeCode,
  }

  return !!annotationEditor && (
    <Erroneous {...annotationEditorProps} error={error}>
      {createElement(annotationEditor, annotationEditorProps)}
    </Erroneous>
  )
})
