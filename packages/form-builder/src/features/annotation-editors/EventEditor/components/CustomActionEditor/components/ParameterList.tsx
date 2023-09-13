import {generateUniqueName} from '@react-form-builder/core'
import {useEffect, useState} from 'react'
import {Button} from 'rsuite'
import {Columns, Rows} from '../../../../../components/Containers'
import {useTranslationPart} from '../../../../../localization/hooks'
import type {Parameter} from '../../ActionList/ActionItem/components/ArgumentList/ArgumentItem/Parameter'
import {ParameterItem} from './ParameterItem'

/**
 * The React {@link ParameterList} component properties.
 */
interface ParameterPanelProps {

  /**
   * The array of action parameters.
   */
  value?: Parameter[]

  /**
   * the callback function called when data should be changed.
   * @param value the array of parameters.
   */
  onChange: (value?: Parameter[]) => void
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
  const [params, setParams] = useState(value)

  useEffect(() => {
    setParams(value)
  }, [value])

  const changeParams = (value?: Parameter[]) => {
    setParams(value)
    onChange(value)
  }

  const handleCreateParam = () => {
    const names = params?.map(value => value[0]) ?? []
    const existingNames = new Set(names)
    const paramName = generateUniqueName('prop', existingNames)
    const newParam: Parameter = [paramName, 'string']
    const paramArray = params ? [...params, newParam] : [newParam]
    changeParams(paramArray)
  }

  const handleRemoveParam = (index: number) => {
    const paramArray = params ? [...params] : []
    paramArray?.splice(index, 1)
    changeParams(paramArray)
  }

  const handleChangeParam = (value: Parameter, index: number) => {
    const paramArray = params ? [...params] : []
    paramArray[index] = value
    changeParams(paramArray)
  }

  const items = params?.map((param, index) => {
    return <ParameterItem key={index} value={param} onRemove={() => handleRemoveParam(index)} parameters={params}
                          onChange={value => handleChangeParam(value, index)}/>
  })

  return (
    <Rows style={{maxWidth: 240}}>
      <Columns style={{alignItems: 'center', justifyContent: 'space-between', height: 34}}>
        <h6>{t('parameters')}</h6>
        <Button onClick={handleCreateParam} appearance={'link'}><h6>{t('add')}</h6></Button>
      </Columns>

      <Rows style={{overflow: 'auto'}}>
        {items}
      </Rows>
    </Rows>
  )
}
