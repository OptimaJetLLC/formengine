import {generateUniqueName} from '@react-form-builder/core'
import {useCallback} from 'react'
import {Button} from 'rsuite'
import {Columns, Rows} from '../../../../../components/Containers'
import {useTranslationPart} from '../../../../../localization/hooks'
import type {Parameter} from '../../ActionList/ActionItem/components/ArgumentList/ArgumentItem/Parameter'
import {ParameterItem} from './ParameterItem'
import styles from './ParameterList.module.css'
import {useArrayMapMemo} from './UseArrayMapMemo'

let counter = 0

function generateUniqueId() {
  return ++counter
}

/**
 * The element in the list of action parameters.
 */
export type ParameterListItem = {
  /**
   * The action parameter unique key.
   */
  key: number

  /**
   * The action parameter.
   */
  parameter: Parameter
}

/**
 * The React {@link ParameterList} component properties.
 */
interface ParameterPanelProps {
  /**
   * The array of action parameters.
   */
  value?: ParameterListItem[]

  /**
   * the callback function called when data should be changed.
   * @param value the array of parameters.
   */
  onChange: (value?: ParameterListItem[]) => void
}

/**
 * Converts the action parameter to the element in the list of action parameters.
 * @param parameter the action parameter.
 * @returns the element in the list of action parameters.
 */
export const toParameterListItem = (parameter: Parameter): ParameterListItem => {
  return {
    key: generateUniqueId(),
    parameter,
  }
}

/**
 * React form builder component that displays the list of action parameters.
 * @param props the React component properties.
 * @param props.value the array of action parameters.
 * @param props.onChange the callback function called when data should be changed.
 * @returns the React element.
 */
export const ParameterList = ({value, onChange}: ParameterPanelProps) => {
  const t = useTranslationPart('actions')
  const params = value

  const changeParams = useCallback(
    (value?: ParameterListItem[]) => {
      onChange(value)
    },
    [onChange]
  )

  const handleCreateParam = useCallback(() => {
    const names = params?.map(value => value.parameter[0]) ?? []
    const existingNames = new Set(names)
    const paramName = generateUniqueName('prop', existingNames)
    const newParam = toParameterListItem([paramName, 'string'])
    const paramArray = params ? [...params, newParam] : [newParam]
    changeParams(paramArray)
  }, [params, changeParams])

  const handleRemoveParam = useCallback(
    (index: number) => {
      const paramArray = params ? [...params] : []
      paramArray?.splice(index, 1)
      changeParams(paramArray)
    },
    [params, changeParams]
  )

  const handleChangeParam = useCallback(
    (value: Parameter, index: number) => {
      const paramArray = params ? [...params] : []
      paramArray[index].parameter = value
      changeParams(paramArray)
    },
    [params, changeParams]
  )

  const createRemoveHandler = useCallback(
    (index: number) => {
      return () => handleRemoveParam(index)
    },
    [handleRemoveParam]
  )

  const createChangeHandler = useCallback(
    (index: number) => {
      return (value: Parameter) => handleChangeParam(value, index)
    },
    [handleChangeParam]
  )

  const createIsParameterNameExistsHandler = useCallback(() => {
    return (name: string) => {
      return !!params?.find(({parameter}) => parameter[0] === name)
    }
  }, [params])

  const toParameterItem = useCallback(
    (item: ParameterListItem, index: number) => {
      return (
        <ParameterItem
          key={item.key}
          value={item.parameter}
          onRemove={createRemoveHandler(index)}
          onChange={createChangeHandler(index)}
          isParameterNameExists={createIsParameterNameExistsHandler()}
        />
      )
    },
    [createChangeHandler, createIsParameterNameExistsHandler, createRemoveHandler]
  )

  const items = useArrayMapMemo(params, toParameterItem)

  return (
    <Rows className={styles.rows}>
      <Columns className={styles.header}>
        <h6>{t('parameters')}</h6>
        <Button onClick={handleCreateParam} appearance="link">
          <h6>{t('add')}</h6>
        </Button>
      </Columns>

      <Rows className={styles.items}>{items}</Rows>
    </Rows>
  )
}
