import {Mention, MentionsInput} from 'react-mentions'
import {Input, InputGroup} from 'rsuite'
import {InputProps} from '../../../event/EventEditor/components/ActionList/ActionItem/components/ArgumentList/ArgumentItem'
import {componentMarkup} from '../../consts'
import {AddBindButton} from './components/AddBindButton'
import {useSyncText} from './hooks'

export const InputBindableText = ({name}: InputProps) => {
  const [value, setValue] = useSyncText(name)

  //TODO подписаться на событие, в котором обрабатывается стрелка в лево и в право
  //TODO событие удаления
  //TODO компонент с тегами и текстом - реализовать с помощью кода TagInput'a или наработак ниже
  return (
    <>
      {/*<TagGroup className={"rs-input"}>
                <span contentEditable={true} style={{outline: "none"}}/>
                <Tag tabIndex={-1} as={"span"} color="red">Red</Tag>

                <span contentEditable={true} style={{outline: "none"}}/>
                <Tag tabIndex={-1} as={"span"} color="orange">Orange</Tag>

                <span contentEditable={true} style={{outline: "none"}}/>
                <Tag tabIndex={-1} as={"span"} color="yellow">Yellow</Tag>

                <span contentEditable={true} inputMode={"text"} style={{outline: "none"}}/>
                <Tag tabIndex={-1} as={"span"} color="green">Green</Tag>

            </TagGroup>*/}
      {/*<div contentEditable={true}>
                Abc
            </div>*/}
      <InputGroup size={'sm'}>
        <Input as={MentionsInput} value={value as string} onChange={setValue}>
          <Mention

            style={{backgroundColor: 'none'}}
            markup={componentMarkup}
            trigger={'@'}
            data={[{id: '12', display: 'Abc'}]}
            renderSuggestion={() => null}
          >
            <div>asd</div>
          </Mention>
        </Input>
        <AddBindButton name={name} onAdd={setValue}/>
      </InputGroup>
    </>
  )
}


