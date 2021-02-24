import React from 'react';
import { BoolType, EnumType, NumberType, StyleType } from '../../control/control-property-types';
import rnComponentDefinition from '../../control/rn-components';
import { BoolTypeEditor } from './bool-type-editor';
import { StyleTypeEditor } from './style-type-editor';
import { StringTypeEditor } from './string-type-editor';
import { NumberTypeEditor } from './number-type-editor';
import { EnumTypeEditor } from './enum-type-editor';

export default class PropertyEditor {

    constructor(baseEditControl, componentName, propsData) {
        this.componentName = componentName;
        this.getLocalValue = baseEditControl.getLocalValue.bind(baseEditControl);
        this.defs = rnComponentDefinition[componentName];
        this.propsData = propsData;
    }

    getFormName() {
        return this.componentName + 'form';
    }

    drawProperty(name) {
        const definition = this.defs.propertyByName[name];
        const key = definition.name;
        const localKey = key.toLowerCase() + 'field';
        const defaultValue = definition.defaultLabel;
        const localForm = this.componentName.toLowerCase() + 'form';
        const label = this.getLocalValue(localKey, defaultValue, localForm);

        const typeDesc = definition.type.getDescription();
        const placeholder = this.getLocalValue(typeDesc.key, typeDesc.defaultValue, typeDesc.form);

        if (definition.type === BoolType) {
            return (<BoolTypeEditor label={label} value={this.propsData[key]} placeholder={placeholder}
                                    getLocalValue={this.getLocalValue.bind(this)}
                                    onValueChange={value => this.propsData[key] = value}/>);
        }

        if (definition.type instanceof EnumType) {
            return (<EnumTypeEditor label={label} value={this.propsData[key]} placeholder={placeholder}
                                    getLocalValue={this.getLocalValue.bind(this)}
                                    typeDefinition={definition.type}
                                    onValueChange={value => this.propsData[key] = value}/>);
        }

        if (definition.type === NumberType) {
            return (<NumberTypeEditor label={label} value={this.propsData[key]} placeholder={placeholder}
                                      onValueChange={value => this.propsData[key] = value}/>);
        }

        if (definition.type === StyleType) {
            const dataStyleKey = 'data-' + key;
            return (<StyleTypeEditor label={label} value={this.propsData[dataStyleKey]} placeholder={placeholder}
                                     onValueChange={value => this.propsData[dataStyleKey] = value}/>);
        }

        return (<StringTypeEditor label={label} value={this.propsData[key]} placeholder={placeholder}
                                  onValueChange={value => this.propsData[key] = value}/>);
    }

}

