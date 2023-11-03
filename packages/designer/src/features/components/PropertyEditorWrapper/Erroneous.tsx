import styled from '@emotion/styled'
import {ErrorWrapperProps, namedObserver, WrapperProps} from '@react-form-builder/core'
import {useEffect, useState} from 'react'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import type {AnnotationEditorProps} from '../../annotation-editors/AnnotationEditorProps'
import {annotationResolver} from '../../validation'
import {useDataValidator} from './useDataValidator'

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
export const Erroneous = namedObserver('Erroneous', (props: ErroneousProps) => {
  const {annotation, value, children} = props
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
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    updateErrorMessage().catch(console.error)
  }, [value, props.error])

  return (
    <PropertyErrorMessage error={error}>
      {children}
    </PropertyErrorMessage>
  )
})

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
    {error && <ErrorMessage children={error}/>}
  </SDiv>
)
