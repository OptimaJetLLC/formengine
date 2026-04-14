import type {ErrorWrapperProps, WrapperProps} from '@react-form-builder/core'
import {namedObserver} from '@react-form-builder/core'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import type {AnnotationEditorProps} from '../../annotation-editors/AnnotationEditorProps'
import {annotationResolver} from '../../validation/utils/annotationResolver'
import styles from './Erroneous.module.css'
import {useDataValidator} from './useDataValidator'

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
  const mountedRef = useRef(true)
  const dataValidatorArgs = useMemo(() => ({annotation, store: builderStore.viewer}),
    [annotation, builderStore.viewer])

  const setErrorIfMounted = useCallback((message: string | undefined) => {
    if (mountedRef.current) {
      setError(message)
    }
  }, [])

  const schema = useDataValidator(
    builderStore.viewer,
    annotationResolver,
    dataValidatorArgs,
    setErrorIfMounted)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (props.error) return
    schema.validate(value).catch(console.error)
  }, [value, props.error, schema])

  return (
    <PropertyErrorMessage error={props.error ?? error}>
      {children}
    </PropertyErrorMessage>
  )
}

export const Erroneous = namedObserver('Erroneous', RawErroneous)
