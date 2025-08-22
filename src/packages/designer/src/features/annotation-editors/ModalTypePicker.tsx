import {namedObserver, useModalType} from '@react-form-builder/core'
import {startCase} from 'lodash-es'
import {useMemo} from 'react'
import type {ItemDataType} from 'rsuite/esm/internals/types'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {SInputPicker} from './SInputPicker'

/**
 * React form builder component that displays modal picker.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
const RawModalTypePicker = (props: AnnotationEditorProps) => {
  const {value, onChange, onClean} = props
  const builderStore = useBuilderStore()
  const modalType = useModalType()

  const data = useMemo(() => {
    return builderStore.view
      .filterModels(model => model.hasComponentRole('modal'))
      .map(model => model.typeName)
      .map(name => {
        return {
          value: name,
          label: startCase(name)
        } as ItemDataType
      })
  }, [builderStore.view])

  return <LabeledProperty {...props}>
    <SInputPicker value={value ?? modalType ?? ''} data={data} onChange={onChange}
                  onClean={onClean} block cleanable size={'xs'} placement={'auto'} data-testid="modal-type-picker"/>
  </LabeledProperty>
}

export const ModalTypePicker = namedObserver('ModalTypePicker', RawModalTypePicker)
