import React from 'react';
import { ControlLabel, ErrorMessage, FormControl, FormGroup, InputGroup, SelectPicker, Slider } from 'rsuite';

const setDefault = (prop: any, defaultValue: any) => typeof prop !== 'undefined' ? prop : defaultValue;

type size = number | string;

const fontSizes: Map<string, size> = new Map<string, size>([
    ['xs', 12],
    ['sm', '13px'],
    ['md', 14],
    ['lg', 16]
]);

const FormInput = ({ label, errorMessage, style, children, ...props }: any) => {
    const size = setDefault(props.size, 'sm');
    const labelStyle = {
        fontSize: fontSizes.get(size)
    };
    const formControl = <FormControl {...props} size={setDefault(size, 'sm')}/>;

    return (
        <FormGroup className={('dwkit-input-form' + ((errorMessage != undefined) ? ' error' : ''))}
                   style={{ marginTop: 10, marginBottom: 5, ...style }}>
            <ControlLabel style={labelStyle}>{label}</ControlLabel>
            <div className="rs-form-control-wrapper">
                {children
                    ? <InputGroup inside style={{ width: 'auto' }} size={setDefault(size, 'sm')}>
                        {formControl}
                        {children}
                    </InputGroup>
                    : formControl
                }
                {!!errorMessage && <ErrorMessage show={!!errorMessage} placement="bottomStart">
                    {errorMessage}
                </ErrorMessage>}
            </div>
        </FormGroup>
    );
};


const FormSelect = ({ searchable, cleanable, ...props }: any) => {
    return <FormInput {...props} accepter={SelectPicker} block placement="auto"
                      searchable={setDefault(searchable, false)} cleanable={setDefault(cleanable, false)}/>;
};

export { FormInput, FormSelect };
