import {namedObserver, startCase, useTooltipType} from '@react-form-builder/core'
import {useMemo} from 'react'
import type {ItemDataType} from 'rsuite/esm/internals/types'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {SInputPicker} from './SInputPicker'

/**
 * React form builder component that displays tooltip picker
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
const RawTooltipTypePicker = (props: AnnotationEditorProps) => {
  const {value, onChange, onClean} = props
  const builderStore = useBuilderStore()
  const tooltipType = useTooltipType()

  const data = useMemo(() => {
    const names = builderStore.view
      .filterModels(model => model.hasComponentRole('tooltip'))
      .map(model => model.type)

    const uniqueNames = [...new Set(names)]

    return uniqueNames.map(name => {
      return {
        value: name,
        label: startCase(name)
      } as ItemDataType
    })
  }, [builderStore.view])

  return <LabeledProperty {...props}>
    <SInputPicker value={value ?? tooltipType ?? ''} data={data} onChange={onChange}
                  onClean={onClean} block cleanable size={'xs'} placement={'auto'}/>
  </LabeledProperty>
}

export const TooltipTypePicker = namedObserver('TooltipTypePicker', RawTooltipTypePicker)
