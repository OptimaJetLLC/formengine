import type {BuilderTheme} from '@react-form-builder/core'
import type {ChangeEvent, ReactNode} from 'react'
import {useCallback} from 'react'

type Labeled = {value: BuilderTheme; label: string; icon?: ReactNode}

const items: Labeled[] = [
  {value: 'light', label: 'Light'},
  {value: 'dark', label: 'Dark'},
]

type ThemePickerProps = {
  theme: BuilderTheme
  onChange: (theme: BuilderTheme) => void
}

/**
 * Component for selecting the viewer theme.
 * @param props the ThemePicker props.
 * @returns the React element.
 */
export const ThemePicker = (props: ThemePickerProps) => {
  const {theme, onChange} = props
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      onChange((event.target.value as BuilderTheme) ?? 'light')
    },
    [onChange]
  )
  return (
    <select value={theme} onChange={handleChange}>
      {items.map(item => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  )
}
