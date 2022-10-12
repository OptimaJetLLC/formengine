import {createMarkedInput} from 'rc-marked-input'
import {InputGroup, Tag} from 'rsuite'
import {InputProps} from '../../../event/EventEditor/components/ActionList/ActionItem/components/ArgumentList/ArgumentItem'
import {componentMarkup} from '../../consts'
import {AddBindButton} from './components/AddBindButton'
import {useSyncText} from './hooks'


const MarkedInput = createMarkedInput(Tag, [{
  markup: componentMarkup,
  initMark: props => ({children: props.label})
}])

export const InputBindableText = ({name}: InputProps) => {
  const [value, setValue] = useSyncText(name)

  return (
    <InputGroup size={'sm'}>
      <MarkedInput
        style={{backgroundColor: 'white', padding: 5, margin: 0, width: '100%'}}
        value={value} onChange={setValue}
      />
      <AddBindButton name={name} onAdd={setValue}/>
    </InputGroup>
  )
}
