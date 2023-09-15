import {boolean, date, define, event, number, oneOf, string} from '@react-form-builder/core'
import {DatePicker} from 'rsuite'
import {placement, size} from '../commonProperties'

export const rsDatePicker = define(DatePicker)
  .type('RsDatePicker')
  .name('DatePicker')
  .props({
    appearance: oneOf('default', 'subtle').hinted('Set picker appearance'),
    block: boolean.hinted('Blocking an entire row'),
    calendarDefaultDate: date.hinted('Calendar panel default presentation date and time'),
    cleanable: boolean.hinted('Whether the selected value can be cleared'),
    defaultOpen: boolean.hinted('Default value of open property'),
    defaultValue: date.hinted('Default value'),
    disabled: boolean.hinted('Whether disabled the component'),
    editable: boolean.hinted('Rendered as an input, the date can be entered via the keyboard'),
    format: string.hinted('Format date'),
    isoWeek: boolean.hinted('ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day'),
    limitEndYear: number.hinted('Set the upper limit of the available year relative to the current selection date'),
    limitStartYear: number.hinted('Set the lower limit of the available year relative to the current selection date'),
    onChange: event.hinted('Callback fired when value changed'),
    onChangeCalendarDate: event.hinted('Callback function that changes the calendar date'),
    onClean: event.hinted('Callback fired when value clean'),
    onClose: event.hinted('Callback fired when close component'),
    onEnter: event.hinted('Callback fired before the overlay transitions in'),
    onEntered: event.hinted('Callback fired after the overlay finishes transitioning in'),
    onEntering: event.hinted('Callback fired as the overlay begins to transition in'),
    oneTap: event.hinted('One click to complete the selection date'),
    onExit: event.hinted('Callback fired right before the overlay transitions out'),
    onExited: event.hinted('Callback fired after the overlay finishes transitioning out'),
    onExiting: event.hinted('Callback fired as the overlay begins to transition out'),
    onNextMonth: event.hinted('Switch to the callback function for the next Month'),
    onOk: event.hinted('Click the OK callback function'),
    onOpen: event.hinted('Callback fired when open component'),
    onPrevMonth: event.hinted('Switch to the callback function for the previous Month'),
    onSelect: event.hinted('Callback fired when date or time is selected'),
    onToggleMonthDropdown: event.hinted('Callback function that switches to the month view'),
    onToggleTimeDropdown: event.hinted('Callback function that switches to the time view'),
    open: boolean.hinted('Whether open the component'),
    placeholder: string.hinted('Placeholder'),
    placement: placement.hinted('The placement of component'),
    preventOverflow: boolean.hinted('Prevent floating element overflow'),
    showMeridian: boolean.hinted('Display hours in 12 format'),
    showWeekNumbers: boolean.hinted('Whether to show week numbers'),
    size: size.hinted('A picker size'),
    value: date.valued.hinted('Value (Controlled)')
  })
