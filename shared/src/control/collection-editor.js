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
        if (!this.props.handleEvent && !this.props.onChange) {
            return;
        }

        if (rows === undefined) {
            rows = this.state.data;
        }

        const obj = rows[index];
        rows.splice(index, 1);

        if (this.props.handleEvent) {
            this.props.handleEvent({
                key: this.props.name,
                propertyName: this.props.propertyName,
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
        let obj = isUndefined(this.props.defaultrow) ? {} : { ...this.props.defaultrow };
        //set temporary id to the new row
        obj.__id = 'CLIENT_' + uuidv1();
        this.fillDefaultValues(obj, this.props.columns, this.props.placeholders);

        if (this.props.parentIdField) {
            obj[this.props.parentIdField] = objParent[this.props.idField] || objParent['__id'];
            rows.push(obj);
        }
        else {
            if (!Array.isArray(objParent[this.props.childrenField])) // parent has no child elements
            {
                objParent[this.props.childrenField] = [];
            }

            objParent[this.props.childrenField].push(obj);
        }

        if (this.props.handleEvent) {
            this.props.handleEvent({
                key: this.props.name,
                propertyName: this.props.propertyName,
                eventName: 'onAddChild',
                parameters: { rowIdx: rows.length - 1, row: obj }
            });
        }
        this.sendChangesToParent();
    }

    btnAdd = () => {
        let obj = isUndefined(this.props.defaultrow) ? {} : this.props.defaultrow;
        //set temporary id to the new row
        obj.__id = 'CLIENT_' + uuidv1();
        this.fillDefaultValues(obj, this.props.columns, this.props.placeholders);
        this.state.data.push(obj);

        if (this.props.handleEvent) {
            this.props.handleEvent({
                key: this.props.name,
                propertyName: this.props.propertyName,
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
        delete copied[this.props.idField];
        copied[this.props.parentIdField] = newParentId;

        rows.filter(r => r[this.props.parentIdField] === (sourceObj[this.props.idField] || sourceObj['__id']))
            .forEach(r => this.copyForParentId(rows, r, copied['__id']));

        rows.push(copied);

        return copied;
    }

    resetIdsRecursive(obj) {
        obj['__id'] = 'CLIENT_' + uuidv1();
        delete obj[this.props.idField];

        if (Array.isArray(obj[this.props.childrenField])) {
            obj[this.props.childrenField].forEach(c => this.resetIdsRecursive(c));
        }
    }

    btnCopy(index, rows) {
        if (!rows) {
            rows = this.state.data;
        }

        const sourceObj = rows[index];

        let copied;

        if (this.props.parentIdField && sourceObj.hasOwnProperty(this.props.parentIdField)) {
            copied = this.copyForParentId(rows, sourceObj, sourceObj[this.props.parentIdField]);
        }
        else {
            copied = clone(sourceObj);
            this.resetIdsRecursive(copied);
            rows.push(copied);
        }

        if (this.props.handleEvent) {
            this.props.handleEvent({
                key: this.props.name,
                propertyName: this.props.propertyName,
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
                if (this.props.parentIdField !== undefined && this.props.parentIdField !== '') {
                    rowsA[rowIndexA][this.props.parentIdField] = rowsB[rowIndexB][this.props.parentIdField];
                }
                rowsB.splice(rowIndexB, 0, rowsA.splice(rowIndexA, 1)[0]);
                this.sendChangesToParent();
            }
            e.preventDefault();
        }
        return false;
    }

    handleChange = (item, e, { name, propertyName, value, checked }) => {
        if (!this.props.handleEvent && !this.props.onChange) {
            return;
        }

        const pn = propertyName ? propertyName : name;
        if (isUndefined(value) && isDefined(checked)) {
            item[pn] = checked;
        }
        else {
            item[pn] = value;
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

        if (this.props.buildermode) {
            // do nothing, this.props.value is read only
            // this.props.value = res;
        }
        else {
            if (this.props.onChange) {
                this.props.onChange(null, { name: this.props.name, propertyName: this.props.propertyName, value: res });
            }
            else {
                this.props.handleEvent({
                    syntheticEvent: null,
                    key: this.props.name,
                    eventName: 'onChange',
                    name: this.props.name,
                    value: res,
                    propertyName: this.props.propertyName
                });
            }
        }
    }

    render() {

        // else if (control === CollectionEditor) {
        //     props.columns = model.columns;
        //     props.draggable = model.draggable;
        //     props.hierarchical = model.hierarchical;
        //     props.parentIdField = model.parentIdField;
        //     props.idField = model.idField;
        //     props.childrenField = model.childrenField;
        //     props.collapseAll = model.collapseAll;
        //     props.disableAdd = model.disableAdd;            
        //     props.disableCopy = model.disableCopy;
        //     props.disableDelete = model.disableDelete;
            
        //     props.placeholders = clone(model.placeholders);
    
        //     if (props.placeholders) {
    
        //         props.data = data;
        //         props.adaptiveViewType = adaptiveViewType;
    
        //         props.controlBarParams = {
        //             adaptiveViewType,
        //             eventOnDelete,
        //             eventOnEdit,
        //             eventOnCopy,
        //             parentComponent
        //         };
    
        //         props.getAdditionalDataForControl = getAdditionalDataForControl;
        //         props.createControl = this.createCollectionEditorControl.bind(this);
        //     }
        //     props.handleEvent = handleEvent;
        //     props.downloadUrl = downloadUrl;
        //     props.uploadUrl = uploadUrl;
    
        //     if (buildermode && props.value === undefined && props.columns !== undefined) {
        //         props.buildermode = buildermode;
        //         props.createBuilderDropzone = BaseControls.createBuilderDropzone;
    
        //         props.value = [];
        //         for (i = 0; i < 5; i++) {
        //             props.value.push({});
        //         }
    
        //         if (Boolean(model.hierarchical) &&
        //             model.parentIdField !== undefined && model.parentIdField !== '' &&
        //             model.idField !== undefined && model.idField !== '') {
        //             for (i = 1; i < 5; i++) {
        //                 const parent = props.value[i];
        //                 if (parent[model.idField] === undefined) {
        //                     parent[model.idField] = i;
        //                 }
    
        //                 for (let j = 0; j < 2; j++) {
        //                     const child = {};
        //                     child[model.parentIdField] = parent[model.idField];
        //                     props.value.push(child);
        //                 }
        //             }
        //         }
        //     }
    
        //     if (extendedData !== undefined && extendedData.filters !== undefined && extendedData.filters[props.key] !== undefined) {
        //         props.filter = new FunctionalFilter(extendedData.filters[props.key], props.columns.map(c => c.key));
        //     }
    
        //     res = (<CollectionEditor {...props} />);

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
            props: this.props,
            state: this.state,
        });
    }
}
