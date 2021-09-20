import React, { Component } from 'react';
import { Form } from 'rsuite';
import { FormInput } from './form-input';
import { localize } from './localization';
import { BuilderControlDefinition } from '../../contol-library-wrapper';

export interface GeneralDescriptionProps {
    // todo not any
    control: any;
    editorControls: Map<string, BuilderControlDefinition>;
    data: any;
}

export interface GeneralDescriptionState {

}

export class GeneralDescription extends Component<GeneralDescriptionProps, GeneralDescriptionState> {

    render() {
        const controlId = this.props.control['data-buildertype'];
        const control = this.props.editorControls.get(controlId);
        if (!control) {
            console.log('Cannot find component ' + controlId);
            return null;
        }

        const children: any[] = [];
        const it = control.propertyByName.values();
        let item = it.next();
        while (!item.done) {
            const property = item.value;
            if (property.type.name === 'string') {
                const value = this.props.data[property.name] || property.defaultValue;
                children.push(
                    (<FormInput name={property.name}
                                label={localize(property.name, property.defaultLabel)}
                                value={value}
                    />));
            }
            item = it.next();
        }

        return (<Form key="generalDescriptionForm">
            {children}
        </Form>);
    }

}

