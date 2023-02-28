import {assign} from 'lodash'
import {observer} from 'mobx-react'
import {SelectPicker} from 'rsuite'
import {useActionData} from '../../../../contexts/ActionDataContext'
import {InputProps} from '../InputProps'

const booleanData = [
  {label: 'True', value: 1},
  {label: 'False', value: 0},
  //{label: "Bind to prop...", value: -2}
]

//TODO использовать для аргументов и пропертей одни компоненты.
//Эти TODO относятся к InputNumber и к InputBindableText в substitution
export const InputBoolean = observer(({name}: InputProps) => {
  const data = useActionData()
  const value = data.args?.[name] ? 1 : 0
  const handleChange = (value: string) => data.args = assign({}, data.args, {[name]: Boolean(value)})

  /* TODO
  * Значение undefined для аргументов и bool в частности сейчас не реализован.
  * Предполагается, что если значение может быть undefined, то значение
  * cleanable будет равен true и значение можно будет стереть.

  * TODO
  * Реализация Bindings для boolean в данный момент не приоритете.
  * */

  return (
    <SelectPicker
      data={booleanData}
      searchable={false}
      cleanable={false}
      value={value}
      onSelect={handleChange}
    />
  )
})
