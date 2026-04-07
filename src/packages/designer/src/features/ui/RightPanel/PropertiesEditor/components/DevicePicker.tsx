import {useCallback} from 'react'
import type {Device} from '../../../../../utils/types'
import {useTranslationPart} from '../../../../localization/hooks'
import {FixedSelectPicker} from '../../../FixedSelectPicker'
import styles from './DevicePicker.module.css'

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

  const handleChange = useCallback((val: any) => onChange(val as Device), [onChange])

  return (
    <h6 className={styles.header}>
      {t('forDevice')}
      <FixedSelectPicker
        className={styles.picker}
        value={value}
        data={translatedItems}
        onChange={handleChange}
        appearance={'subtle'}
        size={'xs'}
        searchable={false}
        cleanable={false}
        width={100}
      />
    </h6>
  )
}
