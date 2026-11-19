import {boolean, date, define, event, string} from '@react-form-builder/core'
import {useRef} from 'react'
import {Calendar} from 'rsuite'
import type {CalendarProps} from 'rsuite/esm/Calendar/Calendar'
import {readOnly} from '../commonProperties'
import {fieldsCategory} from './categories'
import {useRsuiteCalendarLabelInName} from './hooks/useRsuiteCalendarLabelInName'
import {Labeled} from './internal/Labeled'

/**
 * Props for the RsCalendar component.
 */
export interface RsCalendarProps extends CalendarProps {
  /**
   * Whether the calendar is read only.
   */
  readOnly: boolean
  /**
   *  Label for the calendar.
   */
  label?: string
}

/**
 * Calendar component with label support.
 * @param props the component props.
 * @param props.label the label for the calendar.
 * @param props.style the CSS styles.
 * @param props.className the CSS class name.
 * @param props.props the additional calendar props.
 * @returns the React element.
 */
const RsCalendar = ({label, style, className, ...props}: RsCalendarProps) => {
  const rootRef = useRef<HTMLDivElement>(null)
  useRsuiteCalendarLabelInName(rootRef)

  return (
    <Labeled ref={rootRef} label={label} style={style} className={className} passAriaToChildren={false} passAriaToGroup>
      {props.readOnly ? <Calendar {...props} onChange={undefined} /> : <Calendar {...props} />}
    </Labeled>
  )
}

export const rsCalendar = define(RsCalendar, 'RsCalendar')
  .name('Calendar')
  .category(fieldsCategory)
  .props({
    label: string,
    bordered: boolean.default(false),
    compact: boolean.default(false),
    defaultValue: date,
    readOnly,
    isoWeek: boolean.default(false),
    onChange: event,
    onSelect: event,
    value: date.valued,
  })
