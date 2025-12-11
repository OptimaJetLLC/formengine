import type {ChangeEvent} from 'react'
import {useCallback} from 'react'
import type {ViewType} from './ViewContext'
import {useView} from './ViewContext'

type Labeled = {value: ViewType; label: string}

const items: Labeled[] = [
  {value: 'rsuite', label: 'RSuite UI'},
  {value: 'mui', label: 'Material UI'},
]

/**
 * Component for selecting the builder view type (RSuite or Material UI).
 * @returns the React element.
 */
export const ViewPicker = () => {
  const {view, setView} = useView()
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setView((event.target.value as ViewType) ?? 'rsuite')
    },
    [setView]
  )

  return (
    <select value={view} onChange={handleChange}>
      {items.map(({value, label}) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
}
