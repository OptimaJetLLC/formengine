import {useEffect, useState} from 'react'
import type {InputPickerProps} from 'rsuite'
import type {ItemDataType} from 'rsuite/esm/internals/types'
import type {ListProps} from 'rsuite/esm/internals/Windowing'

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
  'data' | 'value' | 'onSearch' | 'onOpen' | 'onCreate'> {
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
  // TODO lint ignored, will be fixed after merger with #FE-619

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData])

  useEffect(() => {
    if (!searchValue) return
    if (onLoadData) setLoading(true)
    onLoadData?.(searchValue, loadCallback, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      if (onLoadData && (visibleStopIndex >= data.length - 1)) {
        setLoading(true)
        onLoadData(searchValue, loadCallback, data.length)
      }
    }
  }

  const onSearch = (value: string) => {
    if (onLoadData) setData([])
    setSearchValue(value)
    props.onSearch?.(value)
  }

  const onOpen = () => {
    props.onOpen?.()
    if (!value) onLoadData?.('', loadCallback, 0)
  }

  const onCreate: InputPickerProps['onCreate'] = (_, item) => {
    setData([item, ...data])
    setSearchValue('')
  }

  return {data, value, loading, listProps, onSearch, onOpen, onCreate, virtualized: !!onLoadData}
}
