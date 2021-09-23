import React from 'react';
import { FormInput } from './components/form-input';
import { localize } from './localization';

interface StringPropertyEditorProps {
    name: string;
    placeholder: string;
    labelKey: string;
    labelDefaultValue: string;
}

export default function StringPropertyEditor(props: StringPropertyEditorProps) {
    const label = localize(props.labelKey, props.labelDefaultValue);
    return (<FormInput name={props.name} label={label} placeholder={props.placeholder}/>);
}
