import {ComponentDataProvider, namedObserver, oneOf, useStore} from '@react-form-builder/core'
import {useCallback, useMemo} from 'react'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import type {AnnotationEditorProps} from '../../../annotation-editors/AnnotationEditorProps'
import {Picker} from '../../../annotation-editors/Picker'

export const FormLanguageSettings = namedObserver('FormLanguageSettings', () => {
  const builderStore = useBuilderStore()
  const viewerStore = useStore()

  const languages = builderStore.formAvailableLanguages

  const defaultFormLanguage = useMemo(() => {
    const values = languages.map(l => l.fullCode)
    const labels = languages.map(l => l.name)
    return oneOf(...values).labeled(...labels)
      .default(builderStore.defaultLanguage.fullCode)
      .notLocalize.calculable(false)
      .withEditorProps({
        placement: 'auto'
      })
      .build('defaultLanguage')
  }, [languages, builderStore.defaultLanguage])

  const onChange = useCallback(value => {
    const found = languages.find(l => l.fullCode === value)
    if (found) viewerStore.form.defaultLanguage = found
  }, [languages, viewerStore.form])

  const onClean = useCallback(() => viewerStore.form.defaultLanguage = builderStore.defaultLanguage,
    [viewerStore, builderStore])

  const disableCompute = useCallback(() => undefined, [])
  const setComputeCode = useCallback(() => undefined, [])
  const getComputeCode = useCallback(() => '', [])
  const getComputeType = useCallback(() => undefined, [])
  const hasComputeCode = useCallback(() => false, [])

  const annotationEditorProps: AnnotationEditorProps = {
    onChange,
    value: viewerStore.form.defaultLanguage.fullCode,
    componentData: builderStore.viewer.form.componentTree,
    onClean,
    annotation: defaultFormLanguage,
    disableCompute,
    setComputeCode,
    getComputeCode,
    getComputeType,
    hasComputeCode,
  }

  return (
    <ComponentDataProvider value={builderStore.viewer.form.componentTree}>
      <Picker {...annotationEditorProps}/>
    </ComponentDataProvider>
  )
})
