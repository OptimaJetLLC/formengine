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

interface LoadDataProps extends Pick<InputPickerProps,
  'data' | 'value' | 'onSearch' | 'onOpen'> {
  onLoadData?: LoadDataHandler
}

/**
 * Implements data loading and infinite loader logic for RSuite picker components.
 * @param props the React component properties.
 * @param props.data the data for the picker.
 * @param props.onLoadData the callback function called when data should be load.
 * @param props.onSearch the callback function called when a search is performed.
 * @param props.onOpen the callback function called when the list is displayed.
 * @param props.value the current value of the component.
 * @returns the object with prepared properties for the picker.
 */
export const useLoadData = ({data: initialData, onLoadData, value, ...props}: LoadDataProps) => {
  const [searchValue, setSearchValue] = useState('')
  const [data, setData] = useState<ItemDataType[]>(initialData ?? [])
  const [loading, setLoading] = useState(false)
  const hasValue = (item: ItemDataType) => item.value === value

  useEffect(() => {
    const valueItem = value && !initialData?.some(hasValue) ? [{value, label: value}] : []
    setData([
      ...valueItem,
      ...(initialData ?? [])
    ])
  }, [initialData])

  useEffect(() => {
    if (!searchValue) return
    if (onLoadData) setLoading(true)
    onLoadData?.(searchValue, loadCallback, 0)
  }, [searchValue])

  const loadCallback: LoadCallback = newData => {
    let filteredData = data

    if (value && newData.some(hasValue)) {
      filteredData = data.filter(item => !hasValue(item))
    }

    setData([...filteredData, ...newData])
    setLoading(false)
  }

  const listProps: Partial<ListProps> = {
    onItemsRendered: ({visibleStopIndex}) => {
      if (visibleStopIndex >= data.length - 1) {
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

  return {data, value, loading, listProps, onSearch, onOpen, virtualized: !!onLoadData}
}
