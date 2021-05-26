/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable eqeqeq */

import { Component } from 'react';
import JSON5 from 'json5';
import { v1 as uuidv1 } from 'uuid';
import { isDefined, isUndefined } from '../helpers';
import { draw } from '../component-render-registry';

const isEqual = require('react-fast-compare');
const clone = require('clone');

export default class CollectionEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: {},
            data: []
        };
        
        this.extendedProps = {...this.props};
        const model =  this.props.additionalParams?.model || this.props.model || this.props
        const {handleEvent, downloadUrl, uploadUrl} = this.props.additionalParams ? this.props.additionalParams : this.props;

        this.extendedProps.columns = model.columns;
        this.extendedProps.draggable = model.draggable;
        this.extendedProps.hierarchical = model.hierarchical;
        this.extendedProps.parentIdField = model.parentIdField;
        this.extendedProps.idField = model.idField;
        this.extendedProps.childrenField = model.childrenField;
        this.extendedProps.collapseAll = model.collapseAll;
        this.extendedProps.disableAdd = model.disableAdd;            
        this.extendedProps.disableCopy = model.disableCopy;
        this.extendedProps.disableDelete = model.disableDelete;
        
        this.extendedProps.placeholders = clone(model.placeholders);

        if (this.extendedProps.placeholders) {

            this.extendedProps.data = data;
            this.extendedProps.adaptiveViewType = adaptiveViewType;

            this.extendedProps.controlBarParams = {
                adaptiveViewType,
                eventOnDelete,
                eventOnEdit,
                eventOnCopy,
                parentComponent
            };

            this.extendedProps.getAdditionalDataForControl = getAdditionalDataForControl;
            this.extendedProps.createControl = this.createCollectionEditorControl.bind(this);
        }
        this.extendedProps.handleEvent = handleEvent;
        this.extendedProps.downloadUrl = downloadUrl;
        this.extendedProps.uploadUrl = uploadUrl;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let newState = null;

        if(!isEqual(prevState.originalValue, nextProps.value)){
            newState = {};
            newState.originalValue = clone(nextProps.value);
            
            var rows = nextProps.value == undefined ? [] : nextProps.value;
            
            if(!Array.isArray(rows)){
                newState.data = rows.length ? JSON5.parse(rows) : [];
                newState.stringmode = true;
            }
            else {
                newState.data = clone(rows);
                newState.stringmode = false;
            }
        }

        return newState;
    }

    applyCollapseAll(data) {
        for (let p in data) {
            if (isUndefined(this.state.expanded[p])) {
                this.state.expanded[p] = false;
            }
        }
    }

    getFilteredItems(array, filter) {
        let items = [];
        if (array === undefined) {
            return items;
        }
        if (filter !== undefined) {
            return array.filter((r) => filter.IsRowMatched(r));
        }
        return array;
    }

    btnDelete(index, rows) {
        if (!this.extendedProps.handleEvent && !this.extendedProps.onChange) {
            return;
        }

        if (rows === undefined) {
            rows = this.state.data;
        }

        const obj = rows[index];
        rows.splice(index, 1);

        if (this.extendedProps.handleEvent) {
            this.extendedProps.handleEvent({
                key: this.extendedProps.name,
                propertyName: this.extendedProps.propertyName,
                eventName: 'onDelete',
                parameters: { rowIdx: index, row: obj }
            });
        }

        this.sendChangesToParent();
    }

    btnAddChild(index, rows) {
        if (rows === undefined) {
            rows = isUndefined(this.state.data) ? [] : this.state.data;
        }

        let objParent = rows[index];
        let obj = isUndefined(this.extendedProps.defaultrow) ? {} : { ...this.extendedProps.defaultrow };
        //set temporary id to the new row
        obj.__id = 'CLIENT_' + uuidv1();
        this.fillDefaultValues(obj, this.extendedProps.columns, this.extendedProps.placeholders);

        if (this.extendedProps.parentIdField) {
            obj[this.extendedProps.parentIdField] = objParent[this.extendedProps.idField] || objParent['__id'];
            rows.push(obj);
        }
        else {
            if (!Array.isArray(objParent[this.extendedProps.childrenField])) // parent has no child elements
            {
                objParent[this.extendedProps.childrenField] = [];
            }

            objParent[this.extendedProps.childrenField].push(obj);
        }

        if (this.extendedProps.handleEvent) {
            this.extendedProps.handleEvent({
                key: this.extendedProps.name,
                propertyName: this.extendedProps.propertyName,
                eventName: 'onAddChild',
                parameters: { rowIdx: rows.length - 1, row: obj }
            });
        }
        this.sendChangesToParent();
    }

    btnAdd = () => {
        let obj = isUndefined(this.extendedProps.defaultrow) ? {} : this.extendedProps.defaultrow;
        //set temporary id to the new row
        obj.__id = 'CLIENT_' + uuidv1();
        this.fillDefaultValues(obj, this.extendedProps.columns, this.extendedProps.placeholders);
        this.state.data.push(obj);

        if (this.extendedProps.handleEvent) {
            this.extendedProps.handleEvent({
                key: this.extendedProps.name,
                propertyName: this.extendedProps.propertyName,
                eventName: 'onAdd',
                parameters: { rowIdx: this.state.data.length - 1, row: obj }
            });
        }

        this.sendChangesToParent();
    };

    fillDefaultValues(obj, columns, placeholders) {
        if (!columns || !placeholders) {
            return;
        }

        for (let j = 0; j < columns.length; j++) {
            let colName = undefined;
            if (typeof columns[j] === 'object') {
                colName = columns[j].key;
            }
            else {
                colName = columns[j];
            }

            const ps = placeholders[colName];
            if (Array.isArray(ps) && ps.length > 0) {
                let model = ps[0];
                if (model) {
                    let propertyName = colName;
                    if (model.propertyName) {
                        propertyName = model.propertyName;
                    }

                    if (model.defaultValue) {
                        obj[propertyName] = model.defaultValue;
                    }
                }
            }
        }
    }

    copyForParentId(rows, sourceObj, newParentId) {
        const copied = clone(sourceObj);
        copied['__id'] = 'CLIENT_' + uuidv1();
        delete copied[this.extendedProps.idField];
        copied[this.extendedProps.parentIdField] = newParentId;

        rows.filter(r => r[this.extendedProps.parentIdField] === (sourceObj[this.extendedProps.idField] || sourceObj['__id']))
            .forEach(r => this.copyForParentId(rows, r, copied['__id']));

        rows.push(copied);

        return copied;
    }

    resetIdsRecursive(obj) {
        obj['__id'] = 'CLIENT_' + uuidv1();
        delete obj[this.extendedProps.idField];

        if (Array.isArray(obj[this.extendedProps.childrenField])) {
            obj[this.extendedProps.childrenField].forEach(c => this.resetIdsRecursive(c));
        }
    }

    btnCopy(index, rows) {
        if (!rows) {
            rows = this.state.data;
        }

        const sourceObj = rows[index];

        let copied;

        if (this.extendedProps.parentIdField && sourceObj.hasOwnProperty(this.extendedProps.parentIdField)) {
            copied = this.copyForParentId(rows, sourceObj, sourceObj[this.extendedProps.parentIdField]);
        }
        else {
            copied = clone(sourceObj);
            this.resetIdsRecursive(copied);
            rows.push(copied);
        }

        if (this.extendedProps.handleEvent) {
            this.extendedProps.handleEvent({
                key: this.extendedProps.name,
                propertyName: this.extendedProps.propertyName,
                eventName: 'onCopy',
                parameters: { rowIdx: rows.length - 1, row: copied }
            });
        }
        this.sendChangesToParent();
    }

    onExpand(i, value) {
        this.state.expanded[i] = value;
        this.forceUpdate();
    }

    onDragOver(e) {
        e.preventDefault();
    }

    onDragStart(index, rows, e) {
        e.dataTransfer.setData('index', index);
        var image = e.target;
        if(image)
            image = image.parentElement;
        if(image)
            image = image.parentElement;
        if(image)
            e.dataTransfer.setDragImage($(e.target).parent().parent()[0], 0, 0);
        this.state.dragElementIndex = index;
        this.state.dragRows = rows;

    }

    onDragEnd(index, e) {
        this.state.dragElementIndex = undefined;
        this.state.dragRows = undefined;
    }

    onDrop(index, rows, e) {
        const rowIndexA = this.state.dragElementIndex;
        let rowsA = this.state.dragRows;
        const rowIndexB = index;
        let rowsB = rows;
        if (isDefined(rowIndexA)) {
            if (rowIndexB !== rowIndexA) {
                if (this.extendedProps.parentIdField !== undefined && this.extendedProps.parentIdField !== '') {
                    rowsA[rowIndexA][this.extendedProps.parentIdField] = rowsB[rowIndexB][this.extendedProps.parentIdField];
                }
                rowsB.splice(rowIndexB, 0, rowsA.splice(rowIndexA, 1)[0]);
                this.sendChangesToParent();
            }
            e.preventDefault();
        }
        return false;
    }

    handleChange = (item, e, { name, propertyName, value, checked, additionalValues }) => {
        if (!this.extendedProps.handleEvent && !this.extendedProps.onChange) {
            return;
        }

        const pn = propertyName ? propertyName : name;
        if (isUndefined(value) && isDefined(checked)) {
            item[pn] = checked;
        }
        else {
            item[pn] = value;
        }

        if(typeof(additionalValues) == "object"){
            for(let p in additionalValues){
                let field = pn + "_" + p;
                item[field] = additionalValues[p];
            }
        }

        this.sendChangesToParent();

        if (e && e.preventDefault) {
            e.preventDefault();
        }
        else {
            this.forceUpdate();
        }
    };

    sendChangesToParent() {
        let rows = this.state.data;
        let res = this.state.stringmode ? (rows.length ? JSON5.stringify(rows) : []) : rows;

        if (this.extendedProps.buildermode) {
            // do nothing, this.extendedProps.value is read only
            // this.extendedProps.value = res;
        }
        else {
            if (this.extendedProps.onChange) {
                this.extendedProps.onChange(null, { name: this.extendedProps.name, propertyName: this.extendedProps.propertyName, value: res });
            }
            else {
                this.extendedProps.handleEvent({
                    syntheticEvent: null,
                    key: this.extendedProps.name,
                    eventName: 'onChange',
                    name: this.extendedProps.name,
                    value: res,
                    propertyName: this.extendedProps.propertyName
                });
            }
        }
    }

    render() {    
        const controlProps = {
            className: this.extendedProps.className,
            style: this.extendedProps.style,
        };

            // if (buildermode && controlProps.value === undefined && controlProps.columns !== undefined) {
            //     controlProps.buildermode = buildermode;
            //     controlProps.createBuilderDropzone = BaseControls.createBuilderDropzone;
    
            //     controlProps.value = [];
            //     for (i = 0; i < 5; i++) {
            //         controlProps.value.push({});
            //     }
    
            //     if (Boolean(model.hierarchical) &&
            //         model.parentIdField !== undefined && model.parentIdField !== '' &&
            //         model.idField !== undefined && model.idField !== '') {
            //         for (i = 1; i < 5; i++) {
            //             const parent = controlProps.value[i];
            //             if (parent[model.idField] === undefined) {
            //                 parent[model.idField] = i;
            //             }
    
            //             for (let j = 0; j < 2; j++) {
            //                 const child = {};
            //                 child[model.parentIdField] = parent[model.idField];
            //                 controlProps.value.push(child);
            //             }
            //         }
            //     }
            // }
    
            // if (extendedData !== undefined && extendedData.filters !== undefined && extendedData.filters[controlProps.key] !== undefined) {
            //     controlProps.filter = new FunctionalFilter(extendedData.filters[controlProps.key], controlProps.columns.map(c => c.key));
            // }

        return draw('collection-editor', {
            applyCollapseAll: this.applyCollapseAll,
            btnAdd: this.btnAdd,
            btnAddChild: this.btnAddChild,
            btnCopy: this.btnCopy,
            btnDelete: this.btnDelete,
            getFilteredItems: this.getFilteredItems,
            handleChange: this.handleChange,
            me: this,
            onExpand: this.onExpand,
            onDragStart: this.onDragStart,
            onDragEnd: this.onDragEnd,
            onDragOver: this.onDragOver,
            onDrop: this.onDrop,
            props: this.extendedProps,
            state: this.state,
            controlProps
        });
    }
}
