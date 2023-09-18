import {DataValidator, errorMessageModel, useDestroy, WrapperProps} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {useEffect, useMemo, useState} from 'react'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import type {AnnotationEditorProps} from '../../annotation-editors/AnnotationEditorProps'
import {annotationResolver} from '../../validation'

/**
 * Represents a set of erroneous component properties.
 */
export interface ErroneousProps extends WrapperProps, AnnotationEditorProps {
  error?: string
}

/**
 * React form builder component that displays error for the component property editor.
 * @param props the React component properties.
 * @returns the React element.
 */
export const Erroneous = observer((props: ErroneousProps) => {
  const {annotation, value, children} = props
  const ErrorMessage = errorMessageModel.view
  const store = useBuilderStore()
  const [error, setError] = useState<string>()
  const [mounted, setMounted] = useState(true)

  const schema = useMemo(() => DataValidator.create(
    store.viewer,
    annotationResolver,
    {annotation, store: store.viewer},
    setError), [store, annotation])

  const updateErrorMessage = async () => {
    if (!mounted) return
    if (props.error) return setError(props.error)
    setError(undefined)
    const validationResult = await schema.validate(value)
    if (validationResult) setError(validationResult)
  }

  useEffect(() => {
    updateErrorMessage().catch(console.error)
  }, [value, props.error])

  useDestroy(() => {
    schema.dispose()
    setMounted(false)
  })

  return (
    <ErrorMessage error={error}>
      {children}
    </ErrorMessage>
  )
})
