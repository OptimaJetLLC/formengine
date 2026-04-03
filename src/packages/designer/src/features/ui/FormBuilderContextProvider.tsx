import {namedObserver} from '@react-form-builder/core'
import type {ForwardedRef, ReactNode} from 'react'
import {useEffect, useImperativeHandle, useState} from 'react'
import {FormBuilderImpl} from '../../stores/FormBuilderImpl'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {FormBuilderProvider} from '../../utils/FormBuilderContext'
import type {IFormBuilder} from '../../utils/types'

/**
 * The form builder context provider props.
 */
interface FormBuilderContextProviderProps {
  /**
   * The React child node.
   */
  children: ReactNode
  /**
   * The reference to {@link IFormBuilder}.
   */
  builderRef?: ForwardedRef<IFormBuilder>
}

const RawFormBuilderContextProvider = ({children, builderRef}: FormBuilderContextProviderProps) => {
  const builderStore = useBuilderStore()
  const [formBuilder, setFormBuilder] = useState(() => new FormBuilderImpl(builderStore))
  const [builderMode, setBuilderMode] = useState(formBuilder.builderMode)

  useImperativeHandle(builderRef, () => formBuilder, [formBuilder])

  useEffect(() => {
    if (builderMode !== formBuilder.builderMode) {
      setFormBuilder(new FormBuilderImpl(builderStore))
      setBuilderMode(formBuilder.builderMode)
    }
  }, [formBuilder.builderMode, builderMode, builderStore])

  return <FormBuilderProvider value={formBuilder}>{children}</FormBuilderProvider>
}

export const FormBuilderContextProvider = namedObserver('FormBuilderProvider', RawFormBuilderContextProvider)
