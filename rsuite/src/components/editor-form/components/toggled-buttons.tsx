import React from 'react';
import { ControlLabel, ErrorMessage, FormControl, ButtonGroup, Button, SelectPicker, Slider } from 'rsuite';

const setDefault = (prop: any, defaultValue: any) => typeof prop !== 'undefined' ? prop : defaultValue;

type size = number | string;

const fontSizes: Map<string, size> = new Map<string, size>([
    ['xs', 12],
    ['sm', '13px'],
    ['md', 14],
    ['lg', 16]
]);

const ToggledButtons = ({ label, data, onSelect, errorMessage, style, children, appearance, ...props }: any) => {
    const size = setDefault(props.size, 'sm');
    const labelStyle = {
        fontSize: fontSizes.get(size)
    }; 

    return (
        <div className="rs-form-control-wrapper">
            <ControlLabel style={labelStyle}>{label}</ControlLabel>
            <ButtonGroup style={{ marginTop: 12 }} justified>
                {data.map(({value, label}: any) => {
                    const onClick = () => {
                        onSelect(value);
                    }
                    const buttonProps = {
                        children: label,
                        onClick,
                        appearance: (props.value == value 
                            ? 'primary'
                            : appearance ?? 'default'
                        ),
                        size
                    }
                    return <Button {...buttonProps} />
                })}
                
            </ButtonGroup>
            {!!errorMessage && <ErrorMessage show={!!errorMessage} placement="bottomStart">
                {errorMessage}
            </ErrorMessage>}
            </div>
    );
};

export default ToggledButtons;
