import {DidMountEvent, WillUnmountEvent} from '@react-form-builder/core'
import {event, htmlAttributes, renderWhen, tooltipProps, validation} from '../annotation'
import {Annotation} from '../annotation/types/annotations/Annotation'

export const modules: Annotation[] = [
  tooltipProps.build('tooltipProps'),
  renderWhen.build('renderWhen'),
  htmlAttributes.build('htmlAttributes'),
  validation.build('validation'),
  event.build(DidMountEvent),
  event.build(WillUnmountEvent),
]
