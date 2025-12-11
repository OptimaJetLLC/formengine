import {RadioGroup} from '@mui/material'
import {boolean, ComponentStore, define, event, node, string} from '@react-form-builder/core'
import {inputsCategory} from './categories'

const muiRadioGroupType = 'MuiRadioGroup'

const getInitialJson = () => {
  const componentStore = new ComponentStore(muiRadioGroupType, muiRadioGroupType)
  componentStore.children = [1, 2, 3].map(() => {
    return new ComponentStore('MuiRadioItem', 'MuiRadioItem')
  })
  return JSON.stringify(componentStore)
}

export const muiRadioGroup = define(RadioGroup, muiRadioGroupType)
  .icon('RadioGroup')
  .category(inputsCategory)
  .props({
    name: string.default('RadioGroup'),
    row: boolean,
    value: string.valued.uncontrolledValue(''),
    children: node,
    onChange: event
  })
  .initialJson(getInitialJson())
