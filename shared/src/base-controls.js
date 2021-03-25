/* eslint-disable no-mixed-operators */

import React, { useDebugValue } from 'react';
import Numeral from 'numeral';
import moment from 'moment';
import { dwKitDateFormat, dwKitExternalControlList } from './dwkit-util';
import { isDefined, isUndefined } from './helpers';
import JSON5 from 'json5';
import BuilderActions from './actions';
import { draw } from './component-render-registry';
import ControlBar from './control-bar';
import FormBuilderConst from './const';
export default class BaseControls {

    static containers = {
        'form': '',
        'formgroup': '',
        'grid': '',
        'gridcolumn': '',
        'container': '',
        'div': '',
        'repeater': ''
    };

    items = [];

    static isAdaptiveRender(model, adaptiveViewType) {
        if (model['style-adaptive'] && adaptiveViewType !== undefined && adaptiveViewType !== null && adaptiveViewType !== '' && model['style-renderwhen']) {
            if (adaptiveViewType !== model['style-renderwhen']) {
                return false;
            }
        }

        return true;
    }

    static isForm(model) {
        return (model !== null && model !== undefined &&
            (model['data-buildertype'] === 'form' ||
                model['data-buildertype'] === 'formgroup'));
    }

    static getFormattedDate(str, data) {
        if (data === undefined || data === null) {
            return '';
        }

        let propertyName;
        let format = undefined;
        let indexSep = str.indexOf(':');
        if (indexSep > 0) {
            propertyName = str.substring(0, indexSep);
            format = str.substring(indexSep + 1, str.length)
        }
        else {
            propertyName = str;
        }

        let value = data[propertyName];
        if (value === null || value === undefined) {
            value = '';
        }

        if (isDefined(format)) {
            if (typeof (value) == 'number') {
                value = Numeral(value).format(format);
            }
            else {
                const dateValue = moment(value);
                if (dateValue.isValid()) {
                    if (format === 'local') {
                        let localFormat = dwKitDateFormat('L');
                        value = dateValue.format(localFormat);
                    }
                    else {
                        value = dateValue.format(format);
                    }
                }
            }
        }

        return value;
    }

    static getStyle(model, builderMode, adaptiveViewType) {
        let style = {};

        if (model['style-marginTop']) {
            style.marginTop = model['style-marginTop'];
        }

        if (model['style-marginBottom']) {
            style.marginBottom = model['style-marginBottom'];
        }

        if (model['style-marginLeft']) {
            style.marginLeft = model['style-marginLeft'];
        }

        if (model['style-marginRight']) {
            style.marginRight = model['style-marginRight'];
        }

        if (model['style-width']) {
            style.width = model['style-width'];
        }

        if (model['style-height']) {
            style.height = model['style-height'];
        }

        if (model['style-float'] !== undefined) {
            style.float = model['style-float'];
        }

        if (model['style-display'] !== undefined) {
            style.display = model['style-display'];
        }

        if (model['style-hidden']) {
            if (builderMode) {
                style.opacity = 0.2;
            }
            else {
                style.display = 'none';
            }
        }

        if (model['style-source'] !== undefined) {
            BaseControls.getCustomStyle(model['style-source'], style);
        }

        if (model['style-font-size'] !== undefined) {
            style.fontSize = model['style-font-size'];
        }

        if (model['style-adaptive'] && model['style-mobilesource'] !== undefined && adaptiveViewType === 'mobile') {
            BaseControls.getCustomStyle(model['style-mobilesource'], style);
        }

        if(model.pinned){
            style.position = "absolute";

            if(model.pinnedPositionX){
                style.left = model.pinnedPositionX + "px"
            }

            if(model.pinnedPositionY){
                style.top = model.pinnedPositionY + "px"
            }
        }

        return style;
    }

    static getCustomStyle(source, style) {
        const properties = source.split(';');
        properties.forEach(function (property) {
            const tup = property.split(':');
            if (tup.length === 2) {
                let p = tup[0].replace(/^\s+|\s+$/g, '');
                style[p] = tup[1].replace(/^\s+|\s+$/g, '');
            }
        });
    }

    static getClassName(model, buildermode){
        var className = model["style-customcss"];

        if(buildermode && isDefined(BaseControls.containers["data-buildertype"])){
            className = (className == undefined ? "" : (className+" ")) + "formbuilder-item-container";
        }

        if(model["style-hiddeninprint"] == true){
            className = (className == undefined ? "" : (className+" ")) + "formbuilder-notprint";
        }

        return className;
    }

    static fillDefaultValues(model, defaultValues) {
        for (let k in defaultValues) {
            if (model[k] === undefined) {
                model[k] = defaultValues[k];
            }
        }
        return model;
    }

    static createBuilderDropzone(key, elementToInsert, elementAfter, text, placeholderKey) {
        let dzValue = '';
        const onChangeDZ = function (e, { name, value }) {
            dzValue = value;
        };

        const onClosePopup = function () {
            try {
                const json = JSON5.parse(dzValue);
                BuilderActions.insert(json, key, elementToInsert, elementAfter, placeholderKey);
            }
            catch (e) {
            }
        };

        return draw('builder-dropzone', {
            key: key,
            elementToInsert: elementToInsert,
            elementAfter: elementAfter,
            onChangeDZ: onChangeDZ,
            onClosePopup: onClosePopup,
            placeholderKey: placeholderKey,
            text: 'DROP ZONE',
        });
    }

    isContainer(key) {
        return isDefined(BaseControls.containers[key]);
    }

    getItems() {
        return this.items;
    }

    setItems(items) {
        this.items = items || [];
    }

    addItem(item, index){
        this.items.splice(index, 0, item);
    }

    addItems(items){
        if(Array.isArray(items)){
            for(let i=0; i < items.length; i++)
                this.items.push(items[i]);
        }
        else{
            this.items.push(itemss);
        }
    }

    removeItems(keys){
        for(let i=0; i < keys.length; i++)
            this.removeItem(keys[i]);
    }

    removeItem(key){
        for(let i=0; i < this.items.length; i++){
            if(this.items[i].key == key){
                this.items.splice(i,1);
            }
        }
    }

    getControlInfoByType(builderType, externalControlList) {
        for (let item of this.items) {
            if (item.key === builderType) {
                return item;
            }
        }

        let externalControls = externalControlList || dwKitExternalControlList();
        if (externalControls) {
            for (let item of externalControls) {
                if (item.key === builderType) {
                    return item;
                }
            }
        }
    }

    getControlByType(builderType, externalControlList) {
        const controlInfo = this.getControlInfoByType(builderType, externalControlList);
        if (controlInfo) {
            return controlInfo.control;
        }
        return null;
    }

    getEditControlByType(builderType, externalControlList) {
        const controlInfo = this.getControlInfoByType(builderType, externalControlList);
        if (controlInfo) {
            return controlInfo.editControl;
        }
        return null;
    }

    createControls(parentComponent,
                   {
                       model, data, errors,
                       eventOnEdit, eventOnDelete, eventOnCopy, handleEvent,
                       parentItem,
                       getFormFunc, getAdditionalDataForControl,
                       buildermode,
                       hideControls, readOnlyControls,
                       readOnly, disableRefs,
                       uploadUrl, downloadUrl, extendedData, controlsToReplace, needCheckReplace,
                       parentPlaceholder,
                       formItem,
                       externalControlRender, externalControlList,
                       adaptiveViewType,
                       formData
                   }) {
        let res = [];

        //this place is for demo block

        if (model === null || model === undefined) {
            return res;
        }

        for (let i = 0; i < model.length; i++) {
            if (Array.isArray(hideControls) && hideControls.includes(model[i].key) ||
                (!buildermode && !BaseControls.isAdaptiveRender(model[i], adaptiveViewType))) {
                continue;
            }

            let item;
            const dbtype = model[i]['data-buildertype'];

            if(dbtype == "__settings")
                continue;

            if (dbtype === 'customcontrol') {
                if (model[i].type === undefined || model[i].type === '') {
                    item = draw('empty', {
                        key: model[i].key,
                        text: 'Fill Type property for rendering the control.',
                    });
                }
                else {
                    const controlPropsInit = model[i].props === undefined ? {} : JSON5.parse(model[i].props);
                    let controlProps = {
                        ...controlPropsInit,
                        key: model[i].key,
                        name: model[i].key,
                        className: model[i]['style-customcss'],
                        className: BaseControls.getClassName(model[i], buildermode),
                        style: BaseControls.getStyle(model[i], buildermode, adaptiveViewType),
                        'data-buildertype': model[i]['data-buildertype'],
                        getAdditionalDataForControl: getAdditionalDataForControl,
                        uploadUrl, downloadUrl
                    };

                    if (readOnly || (Array.isArray(readOnlyControls) && readOnlyControls.includes(controlProps.key))) {
                        controlProps.readOnly = true;
                    }

                    let children = model[i].children;
                    if (model[i].children !== undefined) {
                        try {
                            children = JSON5.parse(model[i].children);
                        }
                        catch (e) {
                        }
                    }

                    if (children === undefined || (Array.isArray(children) && children.length === 0)) {
                        item = React.createElement(
                            model[i].type,
                            controlProps
                        );
                    }
                    else {
                        item = React.createElement(
                            model[i].type,
                            controlProps,
                            children
                        );
                    }
                }
            }
            else if (dbtype === 'customblock') {
                let children_source = [];
                let renderempty = false;
                let cbbuildermode = false;
                let addDropZones = false;
                let newParentItem = model[i];
                let newParentPlaceholder = parentPlaceholder;
                let newFormItem = formItem;

                if (model[i].sourceType === 'form' || model[i].sourceType === undefined) {
                    if (model[i].children !== undefined && model[i].children !== '') {
                        children_source = model[i].children;
                    }
                    else {
                        if (getFormFunc === undefined) {
                            console.error(
                                'Error: "getFormFunc" parameter is undefined!. Please, set "getFormFunc" parameter for DWKitBuilder or DWKitForm!');
                            continue;
                        }

                        if (model[i].formname !== undefined && model[i].formname !== '') {
                            children_source = getFormFunc(model[i].formname);
                        }
                        else {
                            renderempty = true;
                        }
                    }
                }
                else if (model[i].sourceType === 'placeholder') {
                    cbbuildermode = eventOnEdit !== undefined;
                    addDropZones = eventOnEdit !== undefined;
                    newParentItem = parentItem;

                    if (newParentPlaceholder === undefined) {
                        newParentPlaceholder = model[i].key;
                    }

                    if (newFormItem === undefined) {
                        newFormItem = parentItem;
                    }

                    if (newFormItem !== undefined &&
                        newFormItem.placeholders !== undefined &&
                        newFormItem.placeholders[model[i].key] !== undefined) {

                        children_source = newFormItem.placeholders[model[i].key];
                    }
                }
                else {
                    if (model[i].source !== undefined && model[i].source !== '') {
                        try {
                            children_source = JSON5.parse(model[i].source);
                        }
                        catch (e) {
                            // todo log error on incorrect JSON? Ask Betin
                            renderempty = true;
                        }
                    }
                    else {
                        renderempty = true;
                    }
                }

                if (renderempty) {
                    item = draw('empty', {
                        key: model[i].key,
                        text: 'Set a form name or source in properties.',
                    });
                }
                else {
                    let children = this.createControls(
                        parentComponent,
                        {
                            model: children_source,
                            data: data,
                            errors: errors,
                            buildermode: cbbuildermode,
                            eventOnEdit: eventOnEdit,
                            eventOnDelete: eventOnDelete,
                            eventOnCopy: eventOnCopy,
                            parentItem: newParentItem,
                            handleEvent: handleEvent,
                            getFormFunc: getFormFunc,
                            getAdditionalDataForControl: getAdditionalDataForControl,
                            hideControls: hideControls,
                            readOnlyControls: readOnlyControls,
                            readOnly: readOnly,
                            disableRefs,
                            uploadUrl, downloadUrl, controlsToReplace, needCheckReplace,
                            parentPlaceholder: newParentPlaceholder,
                            formItem: newFormItem,
                            extendedData: extendedData,
                            externalControlRender, externalControlList,
                            adaptiveViewType,
                            formData
                        }
                    );

                    let formProps = {
                        key: model[i].key,
                        name: model[i].key,
                        className: BaseControls.getClassName(model[i], buildermode),
                        style: BaseControls.getStyle(model[i], buildermode, adaptiveViewType),
                        'data-buildertype': model[i]['data-buildertype']
                    };

                    if (addDropZones) {
                        if (children === undefined) {
                            children = [];
                        }

                        if (children.length > 0) {
                            let dz_footer = BaseControls.createBuilderDropzone(
                                model[i].key + '_dropzone_footer',
                                newFormItem === undefined ? undefined : newFormItem.key,//parentItem === undefined ? undefined : parentItem.key,
                                children[children.length - 1].key,
                                model[i].key,
                                model[i].key
                            );
                            children.push(dz_footer);
                        }

                        let dz = BaseControls.createBuilderDropzone(
                            model[i].key + '_dropzone_header',
                            newFormItem === undefined ? undefined : newFormItem.key,//parentItem === undefined ? undefined : parentItem.key,
                            undefined,
                            model[i].key,
                            model[i].key
                        );
                        children.unshift(dz);
                    }

                    item = React.createElement(
                        this.getPlatformContainerControl(),
                        formProps,
                        children
                    );
                }
            }
            else {
                const control = this.getControlByType(dbtype, externalControlList);
                if (control === null) {
                    item = draw('null-control', {
                        key: model[i].key,
                        text: `${dbtype} is unsupported`
                    });
                }
                else {
                    if (this.isContainer(dbtype)) {
                        let newFormItem = formItem;
                        if (isUndefined(newFormItem) && isDefined(parentItem) && parentItem.sourceType === 'form') {
                            newFormItem = parentItem;
                        }

                        let containerReadOnly = undefined;
                        if (model[i].readOnly !== undefined) {
                            containerReadOnly = model[i].readOnly;
                        }

                        if (readOnly || Array.isArray(readOnlyControls) && readOnlyControls.includes(model[i].key)) {
                            containerReadOnly = true;
                        }

                        var isHorizontalGroup = buildermode && 
                            (model[i]["data-buildertype"] === "formgroup" && model[i].orientation !== "grouped" || 
                            model[i]["data-buildertype"] === "container" && model[i]["style-display"] === "flex");
                     
                        let children = this.createControls(
                            parentComponent,
                            {
                                model: model[i].children,
                                data: data,
                                errors: errors,
                                buildermode: buildermode,
                                eventOnEdit: eventOnEdit,
                                eventOnDelete: eventOnDelete,
                                eventOnCopy: eventOnCopy,
                                parentItem: model[i],
                                handleEvent: handleEvent,
                                getFormFunc: getFormFunc,
                                getAdditionalDataForControl: getAdditionalDataForControl,
                                hideControls: hideControls,
                                readOnlyControls: readOnlyControls,
                                readOnly: containerReadOnly,
                                disableRefs,
                                uploadUrl, downloadUrl, controlsToReplace, needCheckReplace,
                                parentPlaceholder: undefined,
                                formItem: newFormItem,
                                extendedData, externalControlRender, externalControlList,
                                adaptiveViewType,
                                formData
                            }
                        );
                        if (buildermode) {
                            if (children.length > 0) {
                                let textDZ = isHorizontalGroup ? '...' : '... ' + model[i].key + ' down ...';
                                const dropzone_footer = BaseControls.createBuilderDropzone(
                                    model[i].key + '-dropzone_footer',
                                    model[i].key,
                                    undefined,
                                    textDZ
                                );
                                children.push(dropzone_footer);
                            }

                            let textDZ = isHorizontalGroup ? '...' : '... ' + model[i].key + ' up ...';
                            const dropzone_header = BaseControls.createBuilderDropzone(
                                model[i].key + '-dropzone_header',
                                model[i].key,
                                undefined,
                                textDZ
                            );
                            children.unshift(dropzone_header);
                        }
                        item = this.createControl(parentComponent, control,
                            {
                                model: model[i],
                                data,
                                errors,
                                parentItem,
                                buildermode,
                                children,
                                handleEvent,
                                getFormFunc,
                                getAdditionalDataForControl,
                                readOnlyControls,
                                readOnly,
                                disableRefs,
                                uploadUrl,
                                downloadUrl,
                                extendedData,
                                parentPlaceholder,
                                controlsToReplace,
                                needCheckReplace,
                                eventOnEdit,
                                eventOnDelete,
                                eventOnCopy,
                                externalControlRender,
                                externalControlList,
                                adaptiveViewType,
                                formData
                            }
                        );
                    }
                    else {
                        item = this.createControl(parentComponent, control,
                            {
                                model: model[i],
                                data,
                                errors,
                                parentItem,
                                buildermode,
                                handleEvent,
                                getFormFunc,
                                getAdditionalDataForControl,
                                readOnlyControls,
                                readOnly,
                                disableRefs,
                                uploadUrl,
                                downloadUrl,
                                extendedData,
                                parentPlaceholder,
                                controlsToReplace,
                                needCheckReplace,
                                eventOnEdit,
                                eventOnDelete,
                                eventOnCopy,
                                externalControlRender,
                                externalControlList,
                                adaptiveViewType,
                                formData
                            }
                        );
                    }
                }
            }

            if (buildermode) {
                if (i > 0 && res.length > 0 && i < model.length) {
                    const dropzone_bw = BaseControls.createBuilderDropzone(
                        model[i].key + '-dropzone_bw',
                        parentItem === undefined ? undefined : parentItem.key,
                        model[i].key,
                        '...',
                        parentPlaceholder
                    );
                    res.push(dropzone_bw);
                }

                res.push(<ControlBar key={item.key + "_controlbar"}
                    control={item}
                    text={model[i]["data-buildertype"]}
                    model={model[i]} parent={parentComponent}
                    onDelete={eventOnDelete} onEdit={eventOnEdit} onCopy={eventOnCopy}
                    isGroup={model[i]["data-buildertype"] === "formgroup"}
                />);
            }
            else {
                res.push(item);
            }
        }

        return res;
    }

    setCreateControlsProps(props, paramsToSet) {
        Object.assign(props, paramsToSet);
        if (props.buildermode) {
            props.createBuilderDropzone = BaseControls.createBuilderDropzone;
        }
        props.createControls = this.createControls.bind(this);
    }

    getPlatformContainerControl() {
        return 'div';
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

    createControl(parentComponent, control, params) {
        const model = params.model;
        const buildermode = params.buildermode;
        const adaptiveViewType = params.adaptiveViewType;
        const needCheckReplace = params.needCheckReplace;
        const controlsToReplace = params.controlsToReplace;
        const readOnly = params.readOnly;
        const readOnlyControls = params.readOnlyControls;
        const data = params.data;
        const errors = params.errors;
        const parentItem = params.parentItem;

        let res = undefined;

        let props = {
            key: model.key,
            name: model.key,
            className: BaseControls.getClassName(model, buildermode),
            style: BaseControls.getStyle(model, buildermode, adaptiveViewType),
            'data-buildertype': model['data-buildertype'],
            propertyName: model['propertyName'] ? model['propertyName'] : model.key
        };

        if (!props.key) {
            console.log(model);
        }

        const needReplace = needCheckReplace || controlsToReplace.includes(model.key);

        if (buildermode && this.isContainer(props['data-buildertype'])) {
            props.className = (isUndefined(props.className) ? '' : (props.className + ' '))
                + 'formbuilder-item-container';
        }

        if (model.readOnly !== undefined) {
            props.readOnly = model.readOnly;
        }

        if (readOnly || Array.isArray(readOnlyControls) && readOnlyControls.includes(model.key)) {
            props.readOnly = true;
        }

        const regexForReplace = FormBuilderConst.regexForReplace;
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

        if (data) {
            props.value = data[props.propertyName];
        }

        if (errors) {
            props.error = errors[props.propertyName];
        }

        if(params.children){
                props.children = params.children;
        }

        if(control){
            props.additionalParams = params;
            props.replaceControlValue = replaceControlValue;
            props.buildermode = buildermode;
            if (props.buildermode) {
                props.createBuilderDropzone = BaseControls.createBuilderDropzone;
            }
            props.createControls = this.createControls.bind(this);
            res = React.createElement(control, props);
        }
        else{
            let customRenderer = externalControlRender || dwKitExternalControlRender();
            if (customRenderer) {
                props.parentIsForm = BaseControls.isForm(parentItem);
                res = customRenderer(parentComponent, control,
                    {
                        ...params,
                        controlProps: props, 
                        replaceControlValue
                    }
                );
            }

            if (!res) {
                console.error('Control is unsupported!', control, model);
            }
        }

        if (model['tooltip-errordisabled'] !== true &&
            errors && errors[model.key] !== undefined && typeof (errors[model.key]) != 'boolean' && !Array.isArray(errors[model.key])) {
        
            let popupposition = model['tooltip-errorposition'] == '' ? undefined : model['tooltip-errorposition'];
            let popupon = model['tooltip-errorshowtype'] == '' ? undefined : model['tooltip-errorshowtype'];

            return draw('popup', {
                className: 'formbuilder-tooltiperror',
                content: errors[model.key],
                key: model.key + '-error',
                trigger: res,
                popupOn: popupon,
                popupPosition: popupposition,
            });
        }
        else if (model['tooltip-enabled']) {
            let popupposition = model['tooltip-showtype'] == '' ? undefined : model['tooltip-showtype'];
            let popupon = model['tooltip-position'] == '' ? undefined : model['tooltip-position'];

            return draw('popup', {
                className: model['tooltip-classname'],
                content: model['tooltip-content'],
                header: model['tooltip-header'],
                key: model.key + '-tooltip',
                trigger: res,
                popupOn: popupon,
                popupPosition: popupposition,
            });
        }

        return res;
    }    
}