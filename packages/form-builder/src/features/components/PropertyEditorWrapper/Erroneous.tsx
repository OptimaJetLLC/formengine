import {DataValidator, errorMessageModel, useDestroy, WrapperProps} from '@react-form-builder/core'
import {useEffect, useMemo, useState} from 'react'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {useEditor} from '../../../utils/useEditor'
import {annotationResolver} from '../../validation'

/**
 * React form builder component that displays error for the component property editor.
 * @param props the React component properties.
 * @param props.children the children of the React component.
 * @returns the React element.
 */
export const Erroneous = ({children}: WrapperProps) => {
  const ErrorMessage = errorMessageModel.view

  const {annotation, value} = useEditor()
  const store = useBuilderStore()
  const [error, setError] = useState<string>()
  const [mounted, setMounted] = useState(true)

  const schema = useMemo(() => DataValidator.create(
    store.viewer,
    annotationResolver,
    {annotation, store: store.viewer},
    setError), [store, annotation])

  useEffect(() => {
    setError(undefined)
    schema.validate(value).then(e => {
      if (mounted) setError(e)
    })
  }, [value])

  useDestroy(() => {
    schema.dispose()
    setMounted(false)
  })

  return (
    <ErrorMessage error={error}>
      {children}
    </ErrorMessage>
  )
}
