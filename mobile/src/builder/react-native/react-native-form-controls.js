/* eslint-disable no-mixed-operators */
/* eslint-disable no-new-func */

import React from 'react';
import {
    BaseControls,
    CollectionEditor,
    Container,
    ControlBar,
    Dictionary,
    draw,
    DropdownTrigger,
    Dropzone,
    DWKitConst,
    dwKitExternalControlRender,
    Files,
    FunctionalFilter,
    isDefined,
    MenuGroup,
    NumberFormatControl,
    RadioGroup,
    Repeater,
    SearchControl,
    SemanticControl,
    StaticContent,
    TabGroup,
    WorkflowBar,
    Card
} from 'optimajet-builder-shared'
import RnComponent from '../../components/react-native/control/rn-component';
import rnComponentDefinition from '../../components/react-native/control/rn-components';
import { View } from 'react-native';
import JSON5 from 'json5';

const merge = require('deepmerge')
const clone = require('clone');

export default class ReactNativeFormControls extends BaseControls {

    static containers = {
        'form': '',
        'formgroup': '',
        'grid': '',
        'gridcolumn': '',
        'container': '',
        'rnview': '',
        'View': '',
        'repeater': ''
    };

    getStyle(model, buildermode, adaptiveViewType) {
        const style = BaseControls.getStyle(model, buildermode, adaptiveViewType);
        const propertyNames = [
            'marginTop', 'marginBottom',
            'marginLeft', 'marginRight',
            'width', 'height'
        ];
        propertyNames.forEach(property => 
            style[property] && (style[property] = parseFloat(style[property]))
        );
        return style;
    }

    getCustomStyle(source, style) {
        BaseControls.getCustomStyle(source, style);
        if (!style)
            return;
        const numericProperties = [
            'margin', 'padding',
            'width', 'height',
            'bottom', 'top', 'left', 'right', 'flex',
            'zIndex', 'radius',
        ];
        for(let property in style){
            numericProperties.forEach(name => {
                if (property.toLowerCase().includes(name)) {
                    const converted = parseFloat(style[property]);
                    if(converted) {
                        style[property] = converted;
                    }
                }
            })  
        }
    }


    createControl(parentComponent, control,
                  {
                      model, data, errors,
                      parentItem,
                      buildermode, children,
                      handleEvent, getAdditionalDataForControl, getFormFunc,
                      readOnlyControls, readOnly,
                      disableRefs,
                      uploadUrl, downloadUrl, extendedData, controlsToReplace, needCheckReplace,
                      eventOnEdit, eventOnDelete, eventOnCopy, externalControlRender, externalControlList,
                      adaptiveViewType, formData
                  }) {
        // let i;
        let res = undefined;

        let props = {
            key: model.key,
            name: model.key,            
            style: this.getStyle(model, buildermode, adaptiveViewType),
            'data-buildertype': model['data-buildertype'],
            propertyName: model['propertyName'] ? model['propertyName'] : model.key
        };

        if (!props.key) {
            console.log(model);
        }

        const dataBuilderType = props['data-buildertype'];
        const needReplace = needCheckReplace || controlsToReplace.includes(model.key);

        if (buildermode && this.isContainer(props['data-buildertype'])) {
            props.isContainer = true;
        }

        if (!disableRefs) {
            props.ref = model.key;
        }

        if (model.readOnly !== undefined) {
            props.readOnly = model.readOnly;
        }


        if (readOnly || Array.isArray(readOnlyControls) && readOnlyControls.includes(model.key)) {
            props.readOnly = true;
        }
        const regexForReplace = DWKitConst.regexForReplace;
        const replaceControlValue = function (originalValue) {
            if (!needReplace || originalValue === undefined || originalValue === null || buildermode) {
                return originalValue;
            }

            const replaceFromData = (m) => {
                if (formData !== undefined && formData !== null) {
                    if (m.slice(1, 5) === 'row.') {
                        return BaseControls.getFormattedDate(m.slice(5, m.length - 1), data);
                    }
                    return BaseControls.getFormattedDate(m.slice(1, m.length - 1), formData);
                }
                return BaseControls.getFormattedDate(m.slice(1, m.length - 1), data);
            };

            if (Array.isArray(originalValue)) {
                const newValue = [];
                let needPushKey = false;
                originalValue.forEach((v) => {
                    const newV = {};
                    for (let p in v) {
                        if (v.hasOwnProperty(p)) {
                            if (v[p] !== undefined && v[p] !== null && typeof v[p] === 'string') {
                                newV[p] = v[p].replace(regexForReplace, (m) => replaceFromData(m));
                                if (!needPushKey && needCheckReplace && newV[p] !== v[p]) {
                                    needPushKey = true;
                                }
                            }
                            else if (Array.isArray(v[p])) {
                                newV[p] = replaceControlValue(v[p]);
                            }
                            else {
                                newV[p] = v[p];
                            }
                        }
                    }
                    newValue.push(newV);
                });
                if (needPushKey) {
                    controlsToReplace.push(model.key);
                }
                return newValue;
            }
            else {
                if (typeof originalValue !== 'string') {
                    return originalValue;
                }
                let newValue = originalValue.replace(regexForReplace, (m) => replaceFromData(m));
                if (needCheckReplace && originalValue !== newValue) {
                    controlsToReplace.push(model.key);
                }
                return newValue;
            }
        };

        if (data !== undefined) {
            if (model['propertyName']) {
                props.value = data[model['propertyName']];
            }
            else {
                props.value = data[props.key];
            }
        }

        if (errors !== undefined && errors !== null) {
            if (model['propertyName']) {
                props.error = errors[model['propertyName']];
            }
            else {
                props.error = errors[props.key];
            }
        }

        if (control === SemanticControl) {
            if (dataBuilderType === 'header') {
                props.content = replaceControlValue(model.content);
                props.subheader = replaceControlValue(model.subheader);
            }
            else if (dataBuilderType === 'label') {
                props.content = replaceControlValue(model.content);
            }
            else if (dataBuilderType === 'message') {
                props.content = replaceControlValue(model.content);
                props.header = replaceControlValue(model.header);
                props.fluid = replaceControlValue(model.fluid);
            }
            else if (dataBuilderType === 'image') {
                props.src = replaceControlValue(model.src);
                props.href = replaceControlValue(model.href);
            }
            else if (dataBuilderType === 'breadcrumb') {
                props.items = replaceControlValue(model.items);
            }
            else if (dataBuilderType === 'button') {
                props.content = replaceControlValue(model.content);
            }

            res = <SemanticControl {...props} additionalParams={{
                model, data, errors, children, handleEvent, parentItem, uploadUrl, downloadUrl
            }}/>;
        }
        else if (control === NumberFormatControl) {
            props.format = model.format;
            props.mask = model.mask;
            props.thousandSeparator = model.thousandSeparator;
            props.prefix = model.prefix;
            props.suffix = model.suffix;
            props.keyboardType = model.keyboardType;

            res = <NumberFormatControl {...props} additionalParams={{
                model, data, errors, children, handleEvent, parentItem, uploadUrl, downloadUrl
            }}/>;
        }
        else if (control === RnComponent) {
            res = this.getControlJsx(control, props, {
                model, data, errors, children, handleEvent, parentItem, uploadUrl, downloadUrl
            });
        }
        else if (control === Dictionary) {
            props.label = model.label;
            props.defaultValue = model.defaultValue;
            props.placeholder = model.placeholder;
            props.disabled = model.disabled;
            props.fluid = model.fluid;
            props.selection = model.selection;
            props.multiple = model.multiple;
            props.search = model.search;
            props.dataModel = model.dataModel;
            props.clearable = model.clearable;
            props.columns = model.columns;
            props.paging = model.paging;
            props.pageSize = model.pageSize;
            props.getAdditionalDataForControl = getAdditionalDataForControl;
            props.filters = replaceControlValue(model.filters);
            props.textAsValue = model.textAsValue;

            if (model.text) {
                props.textFunc = new Function('data', `return ${model.text};`);
            }

            if (errors && errors[model.key] !== undefined) {
                props.error = errors[model.key];
            }

            props.handleEvent = handleEvent;
            props.parentIsForm = BaseControls.isForm(parentItem);
            res = (<Dictionary {...props} />);
        }
        else if (control === DropdownTrigger) {
            props.defaultValue = model.defaultValue;
            props.items = model.items;
            props.imageUrl = model.imageUrl;
            props.handleEvent = handleEvent;
            res = (<DropdownTrigger {...props} />);
        }
        else if (control === SearchControl) {
            props.url = model.url;
            props.category = model.category;
            props.placeholder = model.placeholder;
            props.handleEvent = handleEvent;
            res = (<SearchControl {...props} />);
        }
        else if (control === RadioGroup) {
            let items = [];
            if (model['data-elements'] !== undefined) {
                if (Array.isArray(model['data-elements'])) {
                    items = model['data-elements'];
                }
                else {
                    items = JSON5.parse(model['data-elements']);
                }
            }

            props.handleEvent = handleEvent;

            if (errors && errors[model.key] !== undefined) {
                props.error = errors[model.key];
            }

            res = (<RadioGroup {...props}
                               label={model.label}
                               direction={model.direction}
                               placeholder={model.placeholder}
                               items={items}>
            </RadioGroup>);
        }
        else if (control === CollectionEditor) {
            props.columns = model.columns;
            props.draggable = model.draggable;
            props.hierarchical = model.hierarchical;
            props.parentIdField = model.parentIdField;
            props.idField = model.idField;
            props.childrenField = model.childrenField;
            props.collapseAll = model.collapseAll;
            props.disableAdd = model.disableAdd;
            props.placeholders = clone(model.placeholders);

            if (props.placeholders) {
                props.data = data;
                props.adaptiveViewType = adaptiveViewType;

                props.controlBarParams = {
                    adaptiveViewType,
                    eventOnDelete,
                    eventOnEdit,
                    eventOnCopy,
                    parentComponent
                };

                props.getAdditionalDataForControl = getAdditionalDataForControl;
                props.createControl = this.createCollectionEditorControl.bind(this);
            }
            props.handleEvent = handleEvent;
            props.downloadUrl = downloadUrl;
            props.uploadUrl = uploadUrl;

            if (buildermode && props.value === undefined && props.columns !== undefined) {
                props.buildermode = buildermode;
                props.createBuilderDropzone = BaseControls.createBuilderDropzone;

                props.value = [];
                for (let i = 0; i < 5; i++) {
                    props.value.push({});
                }

                if (Boolean(model.hierarchical) &&
                    model.parentIdField !== undefined && model.parentIdField !== '' &&
                    model.idField !== undefined && model.idField !== '') {
                    for (let i = 1; i < 5; i++) {
                        const parent = props.value[i];
                        if (parent[model.idField] === undefined) {
                            parent[model.idField] = i;
                        }

                        for (let j = 0; j < 2; j++) {
                            const child = {};
                            child[model.parentIdField] = parent[model.idField];
                            props.value.push(child);
                        }
                    }
                }
            }

            if (extendedData !== undefined && extendedData.filters !== undefined && extendedData.filters[props.key] !== undefined) {
                props.filter = new FunctionalFilter(extendedData.filters[props.key], props.columns.map(c => c.key));
            }

            res = (<CollectionEditor {...props} />);
        }
        else if (control === MenuGroup) {
            props['data-items'] = replaceControlValue(model.items);
            props.pointing = model.pointing;
            props.secondary = model.secondary;
            props.tabular = model.tabular;
            props.fluid = model.fluid;
            props.vertical = model.vertical;
            props.activeitem = model.activeitem;
            props.link = model.link;
            props.handleEvent = handleEvent;
            res = (<MenuGroup {...props} />);
        }
        else if (control === TabGroup) {
            // todo remove unused
            props['data-panes'] = model.panes;
            props.pointing = model.pointing;
            props.secondary = model.secondary;
            props.tabular = model.tabular;
            props.fluid = model.fluid;
            props.vertical = model.vertical;
            props.activeitem = model.activeitem;

            props.placeholders = model.placeholders;

            this.setCreateControlsProps(props, {
                data, buildermode, model, children, getFormFunc, getAdditionalDataForControl, disableRefs, uploadUrl,
                downloadUrl, extendedData, controlsToReplace, eventOnEdit, eventOnDelete, eventOnCopy,
                adaptiveViewType, handleEvent, externalControlList, externalControlRender, needCheckReplace,
                readOnly, readOnlyControls, errors
            });

            res = (<TabGroup {...props} />);
        }
        else if (control === WorkflowBar) {
            props.blockSetState = model.blockSetState;
            props.blockCommands = model.blockCommands;
            props.setStateButton = model.setStateButton;
            props.handleEvent = handleEvent;
            props.getAdditionalDataForControl = getAdditionalDataForControl;
            props.blockLoadParameters = model.blockLoadParameters === undefined ? true : model.blockLoadParameters;
            props.blockSelectScheme = model.blockSelectScheme;
            props.selectSchemeDropdown = model.selectSchemeDropdown;

            if (data) {
                props.selectedScheme = data.__wf_selectedscheme;
            }

            if (extendedData) {
                props.schemes = extendedData.schemes ? extendedData.schemes : [];
            }
            else {
                props.schemes = [];
            }

            if (errors && errors[model.key] !== undefined) {
                props.error = errors[model.key];
            }

            if (buildermode) {
                props.commands = [
                    { value: 'approve', text: 'Approve', type: 1 },
                    { value: 'back', text: 'Back', type: 2 }
                ];

                props.states = [
                    { value: 'draft', text: 'Draft' },
                    { value: 'state1', text: 'State 1' },
                    { value: 'state2', text: 'State 2' },
                    { value: 'state3', text: 'State 3' },
                    { value: 'finish', text: 'Finish' }
                ];

                props.schemes = [];
            }

            res = (<WorkflowBar {...props} />);
        }
        else if (control === Container) {
            if (props.style && model['style-display'] === 'flex') {
                if (model['style-display-horizontalalign']) {
                    props.style.justifyContent = model['style-display-horizontalalign'];
                }
                if (model['style-display-verticalalign']) {
                    props.style.alignItems = model['style-display-verticalalign'];
                }
                else {
                    props.style.alignItems = 'baseline';
                }
            }
            props.childrenView = model["childrenView"];
            if(parentItem && parentItem["children-style-source"]){
                var parentStyle = {};
                this.getCustomStyle(parentItem["children-style-source"], parentStyle);

                for(var field in parentStyle){
                    if(!props.style[field]){
                        props.style[field] = parentStyle[field];
                    }
                }
            }

            delete props.propertyName;
            res = (<Container {...props} children={children}/>);
        }
        else if (control === Repeater) {
            props.slider = model.slider;

            props['item-visibleCondition'] = model['item-visibleCondition'];
            props.pageSize = model.pageSize;
            props.pagerType = model.pagerType;
            props.loadButtonLabel = model.loadButtonLabel;
            props.noRecordsLabel = model.noRecordsLabel;
            props.defaultSort = model.defaultSort;
            if (extendedData !== undefined && extendedData.filters !== undefined && extendedData.filters[props.key] !== undefined) {
                props.filter = new FunctionalFilter(extendedData.filters[props.key], ['*']);
            }

            props.placeholders = clone(model.placeholders);

            //TODO Set read-only for all controls in server pager mode
            props.controlProps = {
                readOnly: model.pagerType === 'server' ? true : readOnly
            };

            props.model = model;
            props.data = data;
            const controlProps = props.controlProps;

            this.setCreateControlsProps(controlProps, {
                children, getFormFunc, getAdditionalDataForControl, disableRefs, uploadUrl,
                downloadUrl, extendedData, controlsToReplace, eventOnEdit, eventOnDelete, eventOnCopy,
                adaptiveViewType, handleEvent, externalControlList, externalControlRender,
                readOnlyControls, buildermode
            });

            props.childrenView = model["childrenView"];            
            res = (<Repeater {...props} />);
        }
        else if (control === StaticContent) {
            props.content = replaceControlValue(model.content);
            props.isHtml = model.isHtml;
            res = (<StaticContent {...props} />);
        }
        else if (control === Dropzone) {
            props.iconFiletypes = model.iconFiletypes;
            props.postUrl = uploadUrl;
            props.showFiletypeIcon = model.showFiletypeIcon;
            props.autoProcessQueue = model.autoProcessQueue;
            props.addRemoveLinks = model.addRemoveLinks;
            res = (<Dropzone {...props}
                             additionalParams={{ model, data, errors, children, handleEvent, parentItem }}/>);
        }
        else if (control === Files) {

            props.iconFiletypes = model.iconFiletypes;
            props.postUrl = uploadUrl;
            props.showFiletypeIcon = model.showFiletypeIcon;
            props.autoProcessQueue = model.autoProcessQueue;
            props.useDropzone = model.useDropzone;
            props.columns = model.columns;
            props.idField = model.idField;

            props.downloadUrl = downloadUrl;

            res = <Files {...props} additionalParams={{ model, data, errors, children, handleEvent, parentItem }}/>;
        }
        else if (control === Card) {
            props.header = replaceControlValue(model.header);
            props.subheader = replaceControlValue(model.subheader);
            props.imgurl = replaceControlValue(model.imgurl);
            props.placeholders = model.placeholders;
            props.activeEvent = model.events && model.events["onClick"] && model.events["onClick"].active;

            this.setCreateControlsProps(props, {
                data, buildermode, model, children, getFormFunc, getAdditionalDataForControl, disableRefs, uploadUrl,
                downloadUrl, extendedData, controlsToReplace, eventOnEdit, eventOnDelete, eventOnCopy,
                adaptiveViewType, handleEvent, externalControlList, externalControlRender, needCheckReplace,
                readOnly, readOnlyControls, errors
            });

            res = (<Card {...props} />);
        }
            // todo
        /*
                else if (control === TreePicker) {
                    props.label = model.label;
                    props.defaultValue = model.defaultValue;
                    props.placeholder = model.placeholder;
                    props.selection = model.selection;
                    props.multiple = model.multiple;
                    props.search = model.search;
                    props.dataModel = model.dataModel;
                    props.clearable = model.clearable;
                    props.columns = model.columns;
                    props.paging = model.paging;
                    props.pageSize = model.pageSize;
                    props.parentIdField = model.parentIdField;
                    props.getAdditionalDataForControl = getAdditionalDataForControl;
                    props.modalCssClass = model['style-custommodalcss'];
                    props.fluid = model.fluid;
                    props.disabled = model.disabled;
                    props.handleEvent = handleEvent;

                    if (model['style-modalsource'] !== undefined) {
                        let style = {};
                        BaseControls.getCustomStyle(model['style-modalsource'], style);
                        props.modalStyle = style;
                    }

                    if (errors && errors[model.key] !== undefined) {
                        props.error = errors[model.key];
                    }

                    if (model.text) {
                        props.textFunc = new Function('data', `return ${model.text};`);
                    }

                    props.parentIsForm = BaseControls.isForm(parentItem);
                    res = <TreePicker {...props} />;
                }
        */
        else {
            let customRenderer = externalControlRender || dwKitExternalControlRender();
            if (customRenderer) {
                props.parentIsForm = BaseControls.isForm(parentItem);
                res = customRenderer(parentComponent, control,
                    {
                        model, data, errors,
                        parentItem,
                        buildermode, children,
                        handleEvent, getAdditionalDataForControl,
                        readOnlyControls, readOnly,
                        disableRefs,
                        uploadUrl, downloadUrl, extendedData, controlsToReplace, needCheckReplace,
                        eventOnEdit, eventOnDelete, eventOnCopy,
                        controlProps: props, replaceControlValue
                    }
                );
            }

            if (!res) {
                console.error('Control is unsupported!', control, model);
            }
        }

        // TODO Fix tooltips for android
        // if (model['tooltip-errordisabled'] !== true &&
        //     errors && errors[model.key] !== undefined && typeof (errors[model.key]) != 'boolean') {
        //     let popupposition = model['tooltip-errorposition'] === '' ? undefined : model['tooltip-errorposition'];
        //     let popupon = model['tooltip-errorshowtype'] === '' ? undefined : model['tooltip-errorshowtype'];

        //     // todo use tooltip component
        //     return draw('popup', {
        //         content: errors[model.key],
        //         key: model.key + '-error',
        //         trigger: res,
        //         popupOn: popupon,
        //         popupPosition: popupposition,
        //     });            
        // }
        // else if (model['tooltip-enabled']) {
        //     let popupposition = model['tooltip-position'] === '' ? 'bottom' : model['tooltip-position'];
        //     let popupon = model['tooltip-showtype'] === '' ? undefined : model['tooltip-showtype'];

        //     return draw('popup', {
        //         content: model['tooltip-content'],
        //         header: model['tooltip-header'],
        //         key: model.key + '-tooltip',
        //         trigger: res,
        //         popupOn: popupon,
        //         popupPosition: popupposition,
        //     });
        // }

        return res;
    }

    isContainer(key) {
        return isDefined(ReactNativeFormControls.containers[key]);
    }

    getPlatformContainerControl() {
        return View;
    }

    getControlJsx(control, props, {
        model, data, errors, children, handleEvent, parentItem, uploadUrl, downloadUrl
    }) {
        const dataBuilderType = model['data-buildertype'];
        const component = rnComponentDefinition[dataBuilderType];
        if (!component) {
            return draw('null-control', {
                key: model.key,
                text: `${dataBuilderType} is unsupported`
            });
        }

        const defaults = Object.assign({}, component.defaultProps);
        if (isDefined(children)) {
            defaults.children = children;
        }
        const Renderer = component.renderer;
        const dataProps = component.getDataProps ? component.getDataProps(model) : {};
        const controlProps = {
            ...merge(defaults, props),
            ...this.getControlProps(model, component.propertyTypes),
            ...dataProps,
        };

        // delete unsupported props
        if (controlProps.className) {
            delete controlProps.className;
        }

        return (<Renderer {...controlProps}/>);
    }

    getControlProps(model, propNames) {
        let data = model ? model['control-model'] || {} : {};
        const result = {};
        for (let property of propNames) {
            if (isDefined(data[property.name])) {
                result[property.name] = data[property.name];
            }
        }
        return result;
    }


    createCollectionEditorControl(parentControl, databuildertype, parameters, controlBarParams) {
        let control = this.getControlByType(databuildertype);
        if (!control) {
            console.error('Control is unsupported!', databuildertype, parentControl, parameters);
            return;
        }

        let item = this.createControl(parentControl, control,
            {
                ...parameters,
                needCheckReplace: true
            }
        );
        let res = [];
        if (parameters.buildermode) {
            let builderControl = (
                <ControlBar key={parameters.model.key + '_controlbar'}
                            model={parameters.model} parent={controlBarParams.parentComponent}
                            onDelete={controlBarParams.eventOnDelete} onEdit={controlBarParams.eventOnEdit}
                            onCopy={controlBarParams.eventOnCopy}
                            control={item}
                            />);
            res.push(builderControl);
            return res;
        }
        return item;
    }

}
