import type {Annotation, ComponentProperty, LanguageFullCode, PropertyBlockType} from '@react-form-builder/core'
import {isProperty, isValidatorPropertyBlockType, namedObserver, useComponentData} from '@react-form-builder/core'
import {createElement, useCallback, useEffect, useMemo, useState} from 'react'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import type {AnnotationEditorProps, CalculableEditorProps} from '../../annotation-editors/AnnotationEditorProps'
import {useBuiltinPropertyEditors} from '../../ui/BuiltinPropertyEditorsProvider'
import type {Section} from '../../ui/RightPanel/PropertiesEditor/Section'
import {Erroneous} from './Erroneous'

interface PropertyEditorWrapperProps {
  annotation: Annotation
  context: Record<string, any>
  initContext?: () => Record<string, any>
  propertyBlockType?: PropertyBlockType
  displayedSection?: Section
}

const RawPropertyEditorWrapper = ({
                                    annotation,
                                    context,
                                    initContext,
                                    propertyBlockType = 'component',
                                    displayedSection
                                  }: PropertyEditorWrapperProps) => {
  const store = useBuilderStore()
  const componentData = useComponentData()
  const builtinPropertyEditors = useBuiltinPropertyEditors()

  const annotationEditor = useMemo(() => {
    return store.getPropertyEditor(annotation.editor) ?? builtinPropertyEditors[annotation.editor]
  }, [annotation.editor, builtinPropertyEditors, store])

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

  const onClean = useCallback(() => delete context[annotation.key], [context, annotation])

  const patchProperty = useCallback((patch: ComponentProperty) => {
    context[annotation.key] = Object.assign(context[annotation.key] ?? {}, patch)
  }, [context, annotation.key])

  const setComputedFunction = useCallback((value: string) => {
    patchProperty({computeType: 'function', fnSource: value})
  }, [patchProperty])

  const setComputedLocalization = useCallback((value: string, langCode?: LanguageFullCode) => {
    if (!langCode) return
    const normalized = value.trimStart()
    const loc = store.viewer.form.localization
    loc.setLocalization(langCode, componentData.key, annotation.key, propertyBlockType, normalized)
    if (isValidatorPropertyBlockType(propertyBlockType)) return

    const hasAny = loc.hasLocalization(componentData.key, annotation.key, propertyBlockType)
    patchProperty(hasAny ? {computeType: 'localization'} : {computeType: undefined})
  }, [patchProperty, annotation.key, store.viewer.form.localization, componentData.key, propertyBlockType])

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

  const getComputedLocalization = useCallback((langCode: LanguageFullCode) => {
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
    patchProperty({computeType: undefined})
  }, [propertyBlockType, patchProperty, store.viewer.form.localization, componentData.key])

  const hasLocalization = useCallback(() => {
    return store.viewer.form.localization
      .hasLocalization(componentData.key, annotation.key, propertyBlockType)
  }, [store, componentData, annotation, propertyBlockType])

  const getComputeType = useCallback(() => {
    if (isValidatorPropertyBlockType(propertyBlockType) && hasLocalization()) return 'localization'
    const componentProperty = context[annotation.key]
    return componentProperty?.computeType
  }, [propertyBlockType, hasLocalization, context, annotation.key])

  const hasComputeCode = useCallback<CalculableEditorProps['hasComputeCode']>(type => {
    if (type === 'function') return !!getComputeCode('function')
    return hasLocalization()
  }, [getComputeCode, hasLocalization])

  const annotationEditorProps: AnnotationEditorProps = {
    value,
    onChange,
    onClean,
    annotation,
    showError: setError,
    componentData,
    setComputeCode,
    getComputeCode,
    disableCompute,
    getComputeType,
    hasComputeCode,
    displayedSection
  }

  useEffect(() => {
    setContextInitialized(false)
  }, [componentData, initContext])

  useEffect(() => {
    setError(undefined)
  }, [context])

  return !!annotationEditor && (
    <Erroneous {...annotationEditorProps} error={error}>
      {createElement(annotationEditor, annotationEditorProps)}
    </Erroneous>
  )
}

export const PropertyEditorWrapper = namedObserver('PropertyEditorWrapper', RawPropertyEditorWrapper)
