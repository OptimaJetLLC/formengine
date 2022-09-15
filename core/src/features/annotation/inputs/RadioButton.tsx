import {IconProps} from '@rsuite/icons/lib/Icon'
import React from 'react'
import {Button, ButtonGroup, Form, IconButton, IconButtonProps} from 'rsuite'
import {PropertyEditorProps} from '../types'

export interface RadioButtonProps extends IconButtonProps {
  value: string;
  label?: string;
  icon?: React.ReactElement<IconProps>;
}

const RadioButton = ({label, icon, value, ...props}: RadioButtonProps) => icon
  ? <IconButton icon={icon} {...props}>{label}</IconButton>
  : <Button {...props}>{label}</Button>

export const WithRadioButton = (options: RadioButtonProps[]) => {
  return <T extends unknown>({componentStore, annotation}: PropertyEditorProps<T>) => {
    return (
      <div style={{display: 'flex', gap: 10, alignItems: 'center'}}>
        <Form.ControlLabel>{annotation.title}</Form.ControlLabel>
        <ButtonGroup>{options.map(props =>
          <RadioButton {...props} key={props.value}
                       appearance={(componentStore.props[annotation.key] || annotation.defaultValue) === props.value
                         ? 'primary'
                         : 'default'
                       }
                       onClick={() => {
                         componentStore.props[annotation.key] = props.value as T
                       }}/>
        )}
        </ButtonGroup>
      </div>
    )
  }
}
