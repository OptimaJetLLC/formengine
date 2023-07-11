import {componentMarkup} from '@react-form-builder/core'
import ArrowDownIcon from '@rsuite/icons/ArrowDown.js'
import {annotate} from 'rc-marked-input'
import {Ref, useRef} from 'react'
import {Button, Whisper} from 'rsuite'
import type {OverlayTriggerHandle, PickerHandle} from 'rsuite/Picker'
import {BindPopover} from './BindPopover'

/**
 * The React component that displays a button to bind a component property to another component.
 * @param props the React component properties.
 * @param props.onAdd the callback function called when adding or updating a binding.
 * @param props.name the component property name.
 * @returns the React element.
 */
export const AddBindButton = ({onAdd, name}: any) => {
  const triggerRef = useRef<PickerHandle | null>(null)

  const switchSpeaker = () => {
    if (triggerRef.current?.overlay) {
      triggerRef.current?.close?.()
    } else {
      triggerRef.current?.open?.()
    }
  }

  const handleSelect = ({componentStore, propertyName}: any) => {
    onAdd((previousValue: string) => {
      const value = annotate(componentMarkup, componentStore.key, propertyName)
      return previousValue + value + ' '
    })
  }

  return (
    <Whisper
      ref={triggerRef as Ref<OverlayTriggerHandle>}
      trigger="none"
      placement={'auto'}
      speaker={
        ({onClose, left, top, className}, ref) =>
          <BindPopover
            onClose={onClose} left={left} top={top} className={className} ref={ref}
            name={name} onSelect={handleSelect}
          />
      }
    >
      <Button onClick={switchSpeaker}>
        <ArrowDownIcon/>
      </Button>
    </Whisper>
  )
}
