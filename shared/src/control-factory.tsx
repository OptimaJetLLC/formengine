import React from 'react';
import merge from 'ts-deepmerge';
import { isDefined } from './helpers';
import EditorPropertyItem from '../../component-api/src/property/editor-property-item';
import { BuilderControlDefinition } from '../../rsuite/src/contol-library-wrapper';
const ControlBar = require('../../rsuite/src/components/renderer/control-bar.jsx').default;

export class ControlFactory {

    constructor(private _controls: Map<string, BuilderControlDefinition>) {
    }

    createControls(parentComponent: any,
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
                   }: any): any[] {
        let res: any[] = [];
        if (model === null || model === undefined) {
            return res;
        }

        for (let i = 0; i < model.length; i++) {
            let containerReadOnly = undefined;
            if (model[i].readOnly !== undefined) {
                containerReadOnly = model[i].readOnly;
            }

            if (readOnly || Array.isArray(readOnlyControls) && readOnlyControls.includes(model[i].key)) {
                containerReadOnly = true;
            }

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
                    // todo remove formItem?
                    formItem: formItem,
                    extendedData, externalControlRender, externalControlList,
                    adaptiveViewType,
                    formData
                }
            );
            if (buildermode) {
                // todo нужно?
                const isHorizontalGroup = buildermode &&
                    (model[i]["data-buildertype"] === "formgroup" && model[i].orientation !== "grouped" ||
                        model[i]["data-buildertype"] === "container" && model[i]["style-display"] === "flex");

                if (children.length == 0) {
                    let textDZ = isHorizontalGroup ? '...' : '... ' + model[i].key + ' down ...';
                    // todo implement
                    // const dropzone_footer = BaseControls.createBuilderDropzone(
                    //     model[i].key + '-dropzone_footer',
                    //     model[i].key,
                    //     undefined,
                    //     textDZ
                    // );
                    // children.push(dropzone_footer);
                }

                // let textDZ = isHorizontalGroup ? '...' : '... ' + model[i].key + ' up ...';
                // const dropzone_header = BaseControls.createBuilderDropzone(
                //     model[i].key + '-dropzone_header',
                //     model[i].key,
                //     undefined,
                //     textDZ
                // );
                // children.unshift(dropzone_header);
            }

            const item = this.createControl(parentComponent,
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
                    hideControls,
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

            
            res.push(<ControlBar key={model.key + '_controlbar'} {...{
                model, control: item,
                onDelete: eventOnDelete,
                onEdit: eventOnEdit,
                onCopy: eventOnCopy,
                parent: parentItem
            }}/>);
        }

        return res;
    }

    // todo remove any
    createControl(parentComponent: any,
                  {
                      model, data, errors,
                      parentItem,
                      buildermode, children,
                      handleEvent, getAdditionalDataForControl, getFormFunc,
                      hideControls, readOnlyControls, readOnly,
                      disableRefs,
                      uploadUrl, downloadUrl, extendedData, controlsToReplace, needCheckReplace,
                      eventOnEdit, eventOnDelete, eventOnCopy, externalControlRender, externalControlList,
                      adaptiveViewType, formData
                  }: any) {
        let props = {
            key: model.key,
            name: model.key,
            // todo style
            // style: this.getStyle(model, buildermode, adaptiveViewType),
            'data-buildertype': model['data-buildertype'],
            propertyName: model['propertyName'] ? model['propertyName'] : model.key
        };

        return this.getControlJsx(props, {
            model, data, errors, children, handleEvent, parentItem, uploadUrl, downloadUrl
        });
    }

    // todo remove unused
    getControlJsx(props: any,
                  { model, data, errors, children, handleEvent, parentItem, uploadUrl, downloadUrl }: any
    ) {
        // todo rename data-buildertype to data-builder-type
        const dataBuilderType = model['data-buildertype'];
        const builderControl = this._controls.get(dataBuilderType);

        if (!builderControl) {
            console.log('Error! Cannot find control ' + dataBuilderType);
            // todo draw absent control
            // return draw('null-control', {
            //     key: model.key,
            //     text: `${dataBuilderType} is unsupported`
            // });
            return;
        }

        // todo use editor components?
        const defaults = Object.assign({}, builderControl.defaultProps);
        // if (isDefined(children)) {
        //     defaults.children = children;
        // }
        const controlProps = {
            ...merge(defaults, props),
            ...ControlFactory.getControlProps(model, builderControl.control.propertyTypes),
        };

        const Renderer = builderControl.control.renderer;
        return (<Renderer {...controlProps} />);
    }

    private static getControlProps(model: any, propertyItems: EditorPropertyItem[]): any {
        // todo rename control-model?
        let data = model ? model['control-model'] || {} : {};
        const result: any = {};
        for (let property of propertyItems) {
            if (isDefined(data[property.name])) {
                result[property.name] = data[property.name];
            }
        }
        return result;
    }

}
