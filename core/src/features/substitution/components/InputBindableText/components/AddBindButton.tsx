import ArrowDownIcon from '@rsuite/icons/ArrowDown'
import React from 'react'
import {Button, Whisper} from 'rsuite'
import {PickerInstance} from 'rsuite/Picker'
import {componentMarkup} from '../../../consts'
import {makeMentionsMarkup} from '../../../utils'
import {BindPopover} from './BindPopover'

export const AddBindButton = ({onAdd, name}: any) => {
  const triggerRef = React.useRef<PickerInstance>()

  const switchSpeaker = () => {
    if (triggerRef.current?.overlay) {
      triggerRef.current?.close?.()
    } else {
      triggerRef.current?.open?.()
    }
  }

  const handleSelect = ({componentStore, propertyName}: any) => {
    onAdd((previousValue: string) => {
      let value = makeMentionsMarkup(componentMarkup, componentStore.key, propertyName)
      return previousValue + value + ' '
    })
  }

  return (
    <Whisper
      ref={triggerRef}
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
