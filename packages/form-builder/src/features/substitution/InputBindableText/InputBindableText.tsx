import {componentMarkup} from '@react-form-builder/core'
import {assign} from 'lodash-es'
import {createMarkedInput} from 'rc-marked-input'
import {InputGroup, Tag} from 'rsuite'
import {InputProps} from '../../annotation-editors/EventEditor/components/ActionList/ActionItem/components/ArgumentList/ArgumentItem'
import {useActionData} from '../../annotation-editors/EventEditor/components/ActionList/ActionItem/contexts/ActionDataContext'
import {AddBindButton} from './components/AddBindButton'

const MarkedInput = createMarkedInput(Tag, [{
  markup: componentMarkup,
  initMark: props => ({children: props.label})
}])

/**
 * React component that displays an input component for editing action parameter data and a component bind button.
 * @param props the React component properties.
 * @param props.name the parameter name.
 * @returns the React element.
 */
export const InputBindableText = ({name}: InputProps) => {
  const data = useActionData()
  const value = String(data.args?.[name] ?? '')
  const handleChange = (value: string) => data.args = assign({}, data.args, {[name]: String(value)})

  return (
    <InputGroup size={'sm'}>
      <MarkedInput
        style={{backgroundColor: 'white', padding: 8, margin: 0, width: '100%'}}
        value={value} onChange={handleChange}
      />
      <AddBindButton name={name} onAdd={handleChange}/>
    </InputGroup>
  )
}
