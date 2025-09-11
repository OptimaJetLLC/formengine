import styled from '@emotion/styled'
import type {ErrorWrapperProps, WrapperProps} from '@react-form-builder/core'
import {namedObserver} from '@react-form-builder/core'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import type {AnnotationEditorProps} from '../../annotation-editors/AnnotationEditorProps'
import {annotationResolver} from '../../validation'
import {useDataValidator} from './useDataValidator'

const SDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const ErrorMessage = styled.p`
  font-size: 12px;
  color: var(--red-600);
  margin-top: 0.25rem;

  &:before {
    content: "❌ ";
    font-size: 10px;
    padding: 6px;
  }

  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`

const PropertyErrorMessage = ({children, error}: ErrorWrapperProps) => (
  <SDiv>
    {children}
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </SDiv>
)

/**
 * Represents a set of erroneous component properties.
 */
export interface ErroneousProps extends WrapperProps, AnnotationEditorProps {
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
