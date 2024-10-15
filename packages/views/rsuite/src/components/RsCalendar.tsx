import {boolean, date, define, event} from '@react-form-builder/core'
import {Calendar} from 'rsuite'
import {readOnly} from '../commonProperties'

const RsCalendar: typeof Calendar = (props) => {
  return props.readOnly
    ? <Calendar {...props} onChange={undefined}/>
    : <Calendar {...props}/>
}

export const rsCalendar = define(RsCalendar, 'RsCalendar')
  .name('Calendar')
  .props({
    bordered: boolean.hinted('Show border').default(false),
    compact: boolean.hinted('Display a compact calendar').default(false),
    defaultValue: date.hinted('Default value'),
    readOnly,
    isoWeek: boolean.hinted('ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day').default(false),
    onChange: event.hinted('Callback fired before the value changed'),
    onSelect: event.hinted('Callback fired before the date selected'),
    value: date.valued.hinted('Controlled value'),
  })
