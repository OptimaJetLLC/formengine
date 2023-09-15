import {boolean, date, define, event} from '@react-form-builder/core'
import {Calendar} from 'rsuite'

export const rsCalendar = define(Calendar)
  .type('RsCalendar')
  .name('Calendar')
  .props({
    bordered: boolean.hinted('Show border'),
    compact: boolean.hinted('Display a compact calendar'),
    defaultValue: date.hinted('Default value'),
    isoWeek: boolean.hinted('ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day'),
    onChange: event.hinted('Callback fired before the value changed'),
    onSelect: event.hinted('Callback fired before the date selected'),
    value: date.valued.hinted('Controlled value'),
  })
