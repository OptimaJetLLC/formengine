import {boolean, date, define, event} from '@react-form-builder/core'
import {Calendar} from 'rsuite'

export const rsCalendar = define(Calendar, 'RsCalendar')
  .name('Calendar')
  .props({
    bordered: boolean.hinted('Show border').default(false),
    compact: boolean.hinted('Display a compact calendar').default(false),
    defaultValue: date.hinted('Default value'),
    isoWeek: boolean.hinted('ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day').default(false),
    onChange: event.hinted('Callback fired before the value changed'),
    onSelect: event.hinted('Callback fired before the date selected'),
    value: date.valued.hinted('Controlled value'),
  })
