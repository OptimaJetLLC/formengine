import {errorMessageModel, namedObserver, useDestroy, WrapperProps} from '@react-form-builder/core'
import {useEffect, useState} from 'react'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import type {AnnotationEditorProps} from '../../annotation-editors/AnnotationEditorProps'
import {annotationResolver} from '../../validation'
import {useDataValidator} from './useDataValidator'

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
export const Erroneous = namedObserver('Erroneous', (props: ErroneousProps) => {
  const {annotation, value, children} = props
  const ErrorMessage = errorMessageModel.view
  const builderStore = useBuilderStore()
  const [error, setError] = useState<string>()
  const [mounted, setMounted] = useState(true)

  const schema = useDataValidator(
    builderStore.viewer,
    annotationResolver,
    {annotation, store: builderStore.viewer},
    setError)

  const updateErrorMessage = async () => {
    if (!mounted) return
    if (props.error) return setError(props.error)
    setError(undefined)
    const validationResult = await schema.validate(value)
    if (validationResult) setError(validationResult)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    updateErrorMessage().catch(console.error)
  }, [value, props.error])

  useDestroy(() => {
    setMounted(false)
  })

  return (
    <ErrorMessage error={error}>
      {children}
    </ErrorMessage>
  )
})
