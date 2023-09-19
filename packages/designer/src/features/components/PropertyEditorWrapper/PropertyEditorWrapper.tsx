import {Annotation, ComponentProperty, ComponentPropertyComputeType, isProperty, useComponentData} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {createElement, useCallback, useState} from 'react'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {EditorMap} from '../../annotation-editors'
import type {AnnotationEditorProps} from '../../annotation-editors/AnnotationEditorProps'
import {PropertyBlockType} from '../../ui/RightPanel/PropertiesEditor/components/Properties'
import {Erroneous} from './Erroneous'

interface PropertyEditorWrapperProps {
  annotation: Annotation
  context: Record<string, any>
  initContext?: () => Record<string, any>
  propertyBlockType?: PropertyBlockType
}

export const PropertyEditorWrapper = observer(({
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
  }, [context, initContext, annotation])

  const onClean = useCallback(() => delete context[annotation.key], [context, annotation])

  const showError = useCallback((message?: string) => setError(message), [])

  const setComputedFunction = useCallback((value: string) => {
    const newComponentProperty: ComponentProperty = {computeType: 'function', fnSource: value}
    context[annotation.key] = Object.assign(context[annotation.key] ?? {}, newComponentProperty)
  }, [context, annotation])

  const setComputedLocalization = useCallback((value: string) => {
    const newComponentProperty: ComponentProperty = {computeType: 'localization'}
    context[annotation.key] = Object.assign(context[annotation.key] ?? {}, newComponentProperty)
    store.viewer.form.localization.setLocalization(store.localizationLanguage.fullCode, componentData.key, annotation.key, propertyBlockType, value)
  }, [context, annotation, store, componentData, propertyBlockType])

  const setComputeCode = useCallback((value: string, type: ComponentPropertyComputeType) => {
    switch (type) {
      case 'function':
        return setComputedFunction(value)
      case 'localization':
        return setComputedLocalization(value)
    }
  }, [setComputedFunction, setComputedLocalization])

  const getComputedFunction = useCallback(() => {
    return context[annotation.key]?.fnSource
  }, [context, annotation])

  const getComputedLocalization = useCallback(() => {
    let localization = store.viewer.form.localization
      .getLocalization(store.localizationLanguage.fullCode, componentData.key, annotation.key, propertyBlockType)
    if (!localization) {
      localization = store.viewer.form.localization
        .getLocalization(store.defaultLanguage.fullCode, componentData.key, annotation.key, propertyBlockType)
    }
    return localization ?? ''
  }, [store, componentData, annotation, propertyBlockType])

  const getComputeCode = useCallback((type: ComponentPropertyComputeType) => {
    switch (type) {
      case 'function':
        return getComputedFunction()
      case 'localization':
        return getComputedLocalization()
    }
  }, [getComputedFunction, getComputedLocalization])

  const disableCompute = useCallback(() => {
    const newComponentProperty: ComponentProperty = {computeType: undefined}
    context[annotation.key] = Object.assign(context[annotation.key] ?? {}, newComponentProperty)
  }, [context, annotation])

  const getComputeType = useCallback(() => {
    const componentProperty = context[annotation.key]
    return componentProperty?.computeType
  }, [context, annotation])

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
    getComputeType
  }

  return !!annotationEditor && (
    <Erroneous {...annotationEditorProps} error={error}>
      {createElement(annotationEditor, annotationEditorProps)}
    </Erroneous>
  )
})
