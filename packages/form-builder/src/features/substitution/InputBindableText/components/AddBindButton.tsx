import {componentMarkup} from '@react-form-builder/core'
import ArrowDownIcon from '@rsuite/icons/ArrowDown'
import {annotate} from 'rc-marked-input'
import {Ref, useRef} from 'react'
import {Button, Whisper} from 'rsuite'
import {OverlayTriggerHandle, PickerHandle} from 'rsuite/Picker'
import {BindPopover} from './BindPopover'

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
