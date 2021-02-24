/* eslint-disable eqeqeq */

import { Component } from 'react';
import JSON5 from 'json5';
import { draw } from '../component-render-registry';
import { isDefined, isNotEmptyString } from '../helpers';

const clone = require('clone');

// todo rename from SemanticControl to something like UberControl or SimpleControl
export default class SemanticControl extends Component {

    render() {


        // if (control === SemanticControl) {
        //     if (dataBuilderType === 'header') {
        //         props.content = replaceControlValue(model.content);
        //         props.subheader = replaceControlValue(model.subheader);
        //     }
        //     else if (dataBuilderType === 'label') {
        //         props.content = replaceControlValue(model.content);
        //     }
        //     else if (dataBuilderType === 'message') {
        //         props.content = replaceControlValue(model.content);
        //         props.header = replaceControlValue(model.header);
        //     }
        //     else if (dataBuilderType === 'image') {
        //         props.src = replaceControlValue(model.src);
        //         props.href = replaceControlValue(model.href);
        //     }
        //     else if (dataBuilderType === 'breadcrumb') {
        //         props.items = replaceControlValue(model.items);
        //     }
        //     else if (dataBuilderType === 'button') {
        //         props.content = replaceControlValue(model.content);
        //     }
    
        //     res = <SemanticControl {...props} additionalParams={{
        //         model, data, errors, children, handleEvent, parentItem, uploadUrl, downloadUrl
        //     }}/>;
        //     }

        let me = this;
        let propsControl = {};
        for (let p in this.props) {
            if (p === 'additionalParams' || p === 'items' || p === 'propertyName') {
                continue;
            }

            propsControl[p] = this.props[p];
        }

        let model = this.props.additionalParams.model;
        let data = this.props.additionalParams.data;
        let errors = this.props.additionalParams.errors;
        let children = this.props.additionalParams.children;
        let parentItem = this.props.additionalParams.parentItem;
        let handleEvent = this.props.additionalParams.handleEvent;

        let type = model['data-buildertype'];

        let res;
        // if (type === 'header') {
        //     res = draw(type, {
        //         props: this.props,
        //         propsControl: propsControl,
        //         model: model,
        //     });
        // }
        // else if (type === 'button') {
        //     propsControl.floated = model.floated;
        //     propsControl.size = model.size !== '' ? model.size : null;
        //     propsControl.content = this.props.content;
        //     propsControl.basic = model.basic;
        //     propsControl.circular = model.circular;
        //     propsControl.compact = model.compact;
        //     propsControl.disabled = model.disabled;
        //     propsControl.fluid = model.fluid;
        //     propsControl.primary = model.primary;
        //     propsControl.secondary = model.secondary;
        //     propsControl.link = model.link;

        //     if (model.icon) {
        //         propsControl.icon = model.icon;
        //     }

        //     if (handleEvent !== undefined) {
        //         let onClickParent = propsControl.onClick;
        //         propsControl.onClick = function (e) {
        //             if(onClickParent)
        //                 onClickParent(e);

        //             if(e.currentTarget && e.currentTarget.classList)
        //                 e.currentTarget.classList.add("loading");
        
        //             let res = handleEvent({syntheticEvent: e, key: propsControl.name, eventName: "onClick"});
                    
        //             if(e.currentTarget && e.currentTarget.classList)
        //                 e.currentTarget.classList.remove("loading");
            
        //             return res;
        //         };
        //     }

        //     res = draw(type, {
        //         propsControl: propsControl,
        //         isForm: this.isForm(parentItem),
        //     });
        // }
        // else if (type === 'label') {
        //     res = draw(type, {
        //         props: this.props,
        //         propsControl: propsControl,
        //         model: model,
        //     })
        // }
        // else if (type === 'message') {
        //     res = draw(type, {
        //         props: this.props,
        //         propsControl: propsControl,
        //         model: model,
        //     })
        // }
        //else 
        if (type === 'input') {
            propsControl.defaultValue = model.defaultvalue;
            propsControl.size = model.size;

            if (isNotEmptyString(model.label)) {
                propsControl.label = model.label;
            }

            propsControl.keyboardType = model.keyboardType;
            propsControl.labelPosition = model.labelPosition;
            propsControl.placeholder = model.placeholder;
            propsControl.type = model.type;
            propsControl.disabled = model.disabled;
            propsControl.transparent = model.transparent;
            propsControl.fluid = model.fluid;
            propsControl.readOnly = model.readOnly || this.props.readOnly;

            if (handleEvent != null) {
                propsControl.onChange = function (e, { name, value }) {
                    let res = value;
                    if(propsControl.type === 'number'){
                        if(res == ""){
                            res = undefined;
                        }
                        else if(typeof res == "string"){
                            let lastWord = res[res.length-1];
                            if(lastWord != "." && lastWord != ","){
                                res = Number(res);
                                if(Number.isNaN(res)){
                                    res = value;
                                }
                            }
                        }
                    }
                    handleEvent({
                        syntheticEvent: e,
                        key: propsControl.name,
                        propertyName: me.props.propertyName,
                        eventName: 'onChange',
                        name: name,
                        value: res
                    });
                };
            }

            if (propsControl.value == null) {
                propsControl.value = '';
            }

            propsControl.error = Boolean(this.props.error);

            res = draw(type, {
                isForm: this.isForm(parentItem),
                props: this.props,
                propsControl: propsControl,
            });
        }
        // else if (type === 'textarea') {
        //     // delete autoHeight to suppress semantic-ui-react warning
        //     delete propsControl.autoHeight;

        //     propsControl.placeholder = model.placeholder;
        //     propsControl.keyboardType = model.keyboardType;
        //     propsControl.rows = (model.rows !== null && model.rows !== undefined) ? Number(model.rows) : undefined;

        //     if (model.label !== undefined && model.label !== '') {
        //         propsControl.label = model.label;
        //     }

        //     propsControl.readOnly = model.readOnly || this.props.readOnly;

        //     if (handleEvent !== null) {
        //         propsControl.onChange = function (e, { name, value }) {
        //             handleEvent({
        //                 syntheticEvent: e,
        //                 key: propsControl.name,
        //                 propertyName: me.props.propertyName,
        //                 eventName: 'onChange',
        //                 name: name,
        //                 value: value
        //             });
        //         };
        //     }

        //     if (propsControl.value == null) {
        //         propsControl.value = '';
        //     }

        //     res = draw(type, {
        //         isForm: this.isForm(parentItem),
        //         props: this.props,
        //         propsControl: propsControl,
        //     });
        // }
        else if (type === 'checkbox') {
            if (model.label !== undefined && model.label !== '') {
                propsControl.label = model.label;
            }

            propsControl.placeholder = model.placeholder;
            propsControl.type = model.type;
            propsControl.disabled = model.disabled;
            propsControl.fitted = model.fitted;
            propsControl.indeterminate = model.indeterminate;
            propsControl.readOnly = model.readOnly || this.props.readOnly;
            propsControl.slider = model.slider;
            propsControl.toggle = model.toggle;

            if (handleEvent !== null) {
                propsControl.onChange = function (e, { name, checked }) {
                    handleEvent({
                        syntheticEvent: e,
                        key: propsControl.name,
                        propertyName: me.props.propertyName,
                        eventName: 'onChange',
                        name: name,
                        value: checked
                    });
                };
            }

            if (data !== undefined) {
                if (typeof (variable) === 'boolean') {
                    propsControl.checked = data[propsControl.name];
                }
                else if (data[propsControl.name] === 'true' || data[propsControl.name] === '1') {
                    propsControl.checked = true;
                }
                else if (data[propsControl.name] === 'false' || data[propsControl.name] === '0') {
                    propsControl.checked = false;
                }
                else {
                    propsControl.checked = Boolean(data[propsControl.name]);
                }
            }

            if (errors && isDefined(errors[model.key]) && Boolean(errors[model.key]) == true) {
                if (!isNotEmptyString(propsControl.className)) {
                    propsControl.className = 'error';
                }
                else {
                    propsControl.className += ' error';
                }
            }

            res = draw(type, {
                isForm: this.isForm(parentItem),
                propsControl: propsControl,
            });
        }
        else if (type === 'dropdown') {
            let options = [];
            if (model['data-elements'] !== undefined) {
                if (Array.isArray(model['data-elements'])) {
                    options = model['data-elements'];
                }
                else {
                    options = JSON5.parse(model['data-elements']);
                }
            }

            if (model.label !== undefined && model.label !== '') {
                propsControl.label = model.label;
            }

            if (model.clearable && !model.multiple) {
                options = clone(options);
                options.unshift({ key: '__reset', value: '', text: '   ' });
            }

            propsControl.defaultValue = model.defaultvalue;
            propsControl.placeholder = model.placeholder;
            propsControl.options = options;
            propsControl.fluid = model.fluid;
            propsControl.selection = model.selection;
            propsControl.multiple = model.multiple;
            propsControl.search = model.search;
            propsControl.disabled = model.disabled || model.readOnly || this.props.readOnly;

            if (errors && errors[model.key] !== undefined) {
                propsControl.error = Boolean(propsControl.error);
            }

            if (handleEvent !== null) {
                propsControl.onChange = function (e, { name, value }) {
                    handleEvent({
                        syntheticEvent: e,
                        key: propsControl.name,
                        propertyName: me.props.propertyName,
                        eventName: 'onChange',
                        name: name,
                        value: value
                    });
                };
            }

            propsControl.allowAdditions = model.allowAddItems;
            if (propsControl.allowAdditions) {
                propsControl.onAddItem = function (e, { value }) {
                    let v = clone(propsControl.value);
                    if (Array.isArray(v)) {
                        if (!v.includes(value)) {
                            v.push(value);
                        }
                    }
                    else {
                        v = [value];
                    }

                    propsControl.onChange(e, { name: propsControl.name, value: v });
                }
            }

            if (propsControl.multiple) {
                if (propsControl.value === undefined || propsControl.value === null) {
                    propsControl.value = [];
                }

                if (!Array.isArray(propsControl.value)) {
                    let valueArray;
                    try {
                        valueArray = JSON5.parse(propsControl.value);
                    }
                    catch (e) {
                    }

                    if (!Array.isArray(valueArray)) {
                        valueArray = [propsControl.value];
                    }

                    propsControl.value = valueArray;
                }

                if (propsControl.allowAdditions) {
                    this.dropdownCheckAdditional(propsControl.value, propsControl.options);
                }
            }

            res = draw(type, {
                isForm: this.isForm(parentItem),
                props: this.props,
                propsControl: propsControl,
            });
        }
        else if (type === 'statistic') {
            let items = [];
            if (model['data-elements'] !== undefined) {
                if (Array.isArray(model['data-elements'])) {
                    items = model['data-elements'];
                }
                else {
                    items = JSON5.parse(model['data-elements']);
                }
            }

            res = draw(type, {
                items: items,
                model: model,
                propsControl: propsControl,
            });
        }
        else if (type === 'image') {
            res = draw(type, {
                model: model,
                props: this.props,
                propsControl: propsControl
            });
        }
        else if (type === 'form') {
            res = draw(type, {
                propsControl: propsControl,
                children: children,
                model: model,
            });
        }
        else if (type === 'formgroup') {
            res = draw(type, {
                propsControl: propsControl,
                widths: model.widths,
                widthsCustom: model.widthsCustom,
                children: children,
                orientation: model.orientation,
            });
        }
        else if (type === 'breadcrumb') {
            let children = [];
            if (Array.isArray(this.props.items)) {
                for (let i = 0; i < this.props.items.length; i++) {
                    let item = this.props.items[i];
                    let childProps = { key: i };
                    childProps.active = item.active;
                    childProps.href = item.url;
                    if (handleEvent !== null) {
                        childProps.onClick = function (e) {
                            handleEvent({
                                syntheticEvent: e,
                                key: propsControl.name,
                                eventName: 'onItemClick',
                                parameters: { target: item.url }
                            });
                            e.preventDefault();
                        };
                    }
                    children.push({
                        childProps: { ...childProps },
                        text: isDefined(item.text) ? item.text : '<not set>',
                    });
                    if (i < this.props.items.length - 1) {
                        let dividerProps = {
                            key: i + '_d'
                        };
                        if (item.divider !== '') {
                            dividerProps.icon = item.divider;
                        }
                        children.push({
                            dividerProps: { ...dividerProps },
                            isDivider: true,
                        });
                    }
                }
            }
            res = draw(type, {
                children: children,
                propsControl: propsControl,
            });
        }
        else {
            res = draw('unknown', {
                props: this.props,
                type: type,
            });
        }
        return res;
    }

    isForm(m) {
        return (m != null &&
            (m['data-buildertype'] === 'form' ||
                m['data-buildertype'] === 'formgroup'));
    }

    dropdownCheckAdditional(value, options) {
        if (!Array.isArray(value)) {
            return;
        }
        value.forEach(function (v) {
            let isFind = false;
            for (let i = 0; i < options.length; i++) {
                let o = options[i];
                if (v === o.value) {
                    isFind = true;
                    break;
                }
            }

            if (isFind == false) {
                options.push({ value: v, text: v });
            }
        });
    }
}
