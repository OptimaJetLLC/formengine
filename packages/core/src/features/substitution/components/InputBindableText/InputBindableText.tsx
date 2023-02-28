import {assign} from 'lodash'
import {createMarkedInput} from 'rc-marked-input'
import {InputGroup, Tag} from 'rsuite'
import {InputProps} from '../../../event/EventEditor/components/ActionList/ActionItem/components/ArgumentList/ArgumentItem'
import {useActionData} from '../../../event/EventEditor/components/ActionList/ActionItem/contexts/ActionDataContext'
import {componentMarkup} from '../../consts'
import {AddBindButton} from './components/AddBindButton'

const MarkedInput = createMarkedInput(Tag, [{
  markup: componentMarkup,
  initMark: props => ({children: props.label})
}])

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
