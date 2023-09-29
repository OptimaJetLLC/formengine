import styled from '@emotion/styled'
import {Device} from '@react-form-builder/core'
import {useTranslationPart} from '../../../../localization/hooks'
import {FixedSelectPicker} from '../../../FixedSelectPicker'

/**
 * React component that select device for component styles editors.
 * @param props the React component properties.
 * @param props.value the value picker.
 * @param props.onChange onChange event of the picker.
 * @returns the React element.
 */
export const DevicePicker = ({value, onChange}: { value: Device, onChange: (value: Device) => void }) => {
  const t = useTranslationPart('style')
  const devices: Device[] = ['any', 'desktop', 'mobile', 'tablet']
  const translatedItems = devices.map(value => ({value, label: t(value)}))

  return (
    <SHeader>
      {t('forDevice')}
      <SPicker value={value} data={translatedItems} onChange={val => onChange(val as Device)} appearance={'subtle'} size={'xs'}
               searchable={false} cleanable={false} width={100}/>
    </SHeader>
  )
}

const SHeader = styled.h6`
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 28px;
  gap: 10px;
`

const SPicker = styled(FixedSelectPicker)`
  margin-inline-end: 4px;

  .rs-picker-toggle-value {
    font-size: 15px;
  }
`
