import {useEffect, useState} from 'react'
import type {InputPickerProps} from 'rsuite'
import type {ItemDataType} from 'rsuite/esm/@types/common'
import type {ListProps} from 'rsuite/Windowing'

type LoadCallback = (newData: ItemDataType[]) => void

/**
 * Describes a function that is called when data is to be loaded into the component.
 * @param searchKeyword the current search value.
 * @param loadCallback the callback function called to set the data in the component.
 * @param currentDataLength the length of the data already loaded.
 */
export type LoadDataHandler = (
  searchKeyword: string,
  loadCallback: LoadCallback,
  currentDataLength: number
) => {}

type LoadDataProps = {
  initialData: ItemDataType[]
  onLoadData?: LoadDataHandler
  onSearch?: InputPickerProps['onSearch']
  onOpen?: InputPickerProps['onOpen']
}

/**
 * Implements data loading and infinite loader logic for RSuite picker components.
 * @param props the React component properties.
 * @param props.initialData the initial data for the picker.
 * @param props.onLoadData the callback function called when data should be load.
 * @param props.onSearch the callback function called when a search is performed.
 * @param props.onOpen the callback function called when the list is displayed.
 * @returns the object with prepared properties for the picker.
 */
export const useLoadData = ({initialData, onLoadData, ...props}: LoadDataProps) => {
  const [searchValue, setSearchValue] = useState('')
  const [data, setData] = useState<ItemDataType[]>(initialData ?? [])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!searchValue) return
    if (onLoadData) setLoading(true)
    onLoadData?.(searchValue, loadCallback, 0)
  }, [searchValue])

  const loadCallback: LoadCallback = newData => {
    setData([...data, ...newData])
    setLoading(false)
  }

  const listProps: Partial<ListProps> = {
    onItemsRendered: ({visibleStopIndex}) => {
      if (searchValue && visibleStopIndex >= data.length - 1) {
        setLoading(true)
        onLoadData?.(searchValue, loadCallback, data.length)
      }
    }
  }

  const onSearch = (value: string) => {
    setData([])
    setSearchValue(value)
    props.onSearch?.(value)
  }

  const onOpen = () => {
    props.onOpen?.()
    onLoadData?.('', loadCallback, 0)
  }

  return {data, loading, listProps, onSearch, onOpen, virtualized: !!onLoadData}
}
