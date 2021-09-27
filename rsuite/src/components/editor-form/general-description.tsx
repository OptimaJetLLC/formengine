import React, { Component } from 'react';
import { Form, Checkbox, TableProps } from 'rsuite';
import { FormInput, FormSelect } from './components/form-input';
import EditableTable from '../common/EditableTable';
import ToggledButtons from './components/toggled-buttons';
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
            const commonProps = {
                name: property.name,
                label: localize(property.name, property.defaultLabel),
                value: this.props.data[property.name] || property.defaultValue,
            };
            const mapData = () => property.type.values.map(({defaultValue, value}) => ({value, label: defaultValue}))
            if (property.type.name === 'string') {
                children.push(<FormInput {...commonProps} />);
            }
            if (property.type.name === 'enum') {
                children.push(<FormSelect {...commonProps} data={mapData()} />);
            }
            if (property.type.name === 'toggle-select') {
                children.push(<ToggledButtons {...commonProps} data={mapData()} appearance='ghost'/>);
            }
            if (property.type.name === 'map') {
                const tableProps = {
                    label: commonProps.label,
                    data: [],
                    columns: ['value', 'label'],
                    compact: true,
                }
                children.push(<EditableTable  {...tableProps} />);
            }
            if (property.type.name === 'bool') {
                const checkboxProps = {
                    name: commonProps.name,
                    children: commonProps.label,
                    checked: commonProps.value,
                }
                children.push(<Checkbox {...checkboxProps} />);
            }
            item = it.next();
        }

        return (<Form key="generalDescriptionForm" fluid>
            {children}
        </Form>);
    }

}

