import cx from 'clsx'
import {InputPicker} from 'rsuite'
import type {InputPickerProps} from 'rsuite/esm/InputPicker/InputPicker'
import styles from './SInputPicker.module.css'

/**
 * Styled input picker.
 * @param props {@link InputPickerProps}.
 * @returns React component.
 */
export const SInputPicker = (props: InputPickerProps) => <InputPicker {...props} className={cx(styles.root, props.className)} />
