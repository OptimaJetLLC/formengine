import {IconProps} from '@rsuite/icons/lib/Icon'
import React from 'react'
import {Button, ButtonGroup, Form, IconButton, IconButtonProps} from 'rsuite'
import {PropertyEditorProps} from '../types'
import {isProperty} from '../utils'
import {LabeledValue} from '../utils/LabeledValue'

export interface RadioButtonProps extends IconButtonProps, LabeledValue {
  icon?: React.ReactElement<IconProps>;
}

export const RadioButton = ({componentStore, annotation}: PropertyEditorProps) => {
  if (!isProperty(annotation)) return null

  return (
    <div style={{display: 'flex', gap: 10, alignItems: 'center'}}>
      <Form.ControlLabel>{annotation.name}</Form.ControlLabel>
      <ButtonGroup>
        {annotation.data.map(props =>
          <InnerRadioButton
            key={props.value}
            appearance={(componentStore.props[annotation.key] || annotation.scheme?.getDefault()) === props.value
              ? 'primary'
              : 'default'
            }
            value={props.value as string}
            label={props.label}
            onClick={() => {
              componentStore.props[annotation.key] = props.value
            }}/>
        )}
      </ButtonGroup>
    </div>
  )
}

const InnerRadioButton = ({label, icon, value, ...props}: RadioButtonProps) => icon
  ? <IconButton icon={icon} {...props}>{label}</IconButton>
  : <Button {...props}>{label}</Button>

