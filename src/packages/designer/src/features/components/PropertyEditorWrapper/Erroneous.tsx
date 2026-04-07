import type {ErrorWrapperProps, WrapperProps} from '@react-form-builder/core'
import {namedObserver} from '@react-form-builder/core'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import type {AnnotationEditorProps} from '../../annotation-editors/AnnotationEditorProps'
import {annotationResolver} from '../../validation/utils/annotationResolver'
import {useDataValidator} from './useDataValidator'

import styles from './Erroneous.module.css'

const PropertyErrorMessage = ({children, error}: ErrorWrapperProps) => (
  <div className={styles.root}>
    {children}
    {error && <p className={styles.errorMessage}>{error}</p>}
  </div>
)

/**
 * Represents a set of erroneous component properties.
 */
interface ErroneousProps extends WrapperProps, AnnotationEditorProps {
  /**
   * The error message.
   */
  error?: string
}

/**
 * React form builder component that displays error for the component property editor.
 * @param props the React component properties.
 * @returns the React element.
 */
const RawErroneous = (props: ErroneousProps) => {
  const {annotation, value, children} = props
  const builderStore = useBuilderStore()
  const [error, setError] = useState<string>()
  const [mounted, setMounted] = useState(true)
  const dataValidatorArgs = useMemo(() => ({annotation, store: builderStore.viewer}),
    [annotation, builderStore.viewer])

  const schema = useDataValidator(
    builderStore.viewer,
    annotationResolver,
    dataValidatorArgs,
    setError)

  const updateErrorMessage = useCallback(async (value: any, propsError: string | undefined) => {
    if (!mounted) return
    if (propsError) return setError(propsError)
    setError(undefined)
    const validationResult = await schema.validate(value)
    if (validationResult && mounted) setError(validationResult)
  }, [mounted, schema])

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    updateErrorMessage(value, props.error).catch(console.error)
  }, [value, props.error, updateErrorMessage])

  return (
    <PropertyErrorMessage error={error}>
      {children}
    </PropertyErrorMessage>
  )
}

export const Erroneous = namedObserver('Erroneous', RawErroneous)
