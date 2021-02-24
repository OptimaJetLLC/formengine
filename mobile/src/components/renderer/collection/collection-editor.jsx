/* eslint-disable eqeqeq */

import React, { Component } from 'react';
import {
    CheckboxControl,
    CustomControl,
    DateTimeControl,
    DropdownControl,
    dwKitAdminLangCollectionEditor,
    InputControl,
    isDefined,
    isNotEmptyString,
    isUndefined,
    register,
    UploadControl
} from 'optimajet-builder-shared';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { Label } from '../label.jsx';
import Table from '../table.jsx';
import builderStyles from '../../../builder-styles';
import DragAndDropContext from '../../../builder/dnd/drag-and-drop-context';
import Draggable from './../../../builder/dnd/draggable.jsx';
import Droppable from './../../../builder/dnd/droppable.jsx';

class FakeEvent {

    dataTransfer = {
        setData() {
            // do nothing
        }
    }

    preventDefault() {
        // do nothing
    }

}

class DroppableColumn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            hover: false,
            visible: true,
        };
    }

    onBeginDrag() {
        this.setState({
            active: true,
            hovered: false,
        });
    }

    onEndDrag() {
        this.setState({
            active: false,
            hovered: false,
        });
    }

    onEnter() {
        this.setState({
            hovered: true,
        });
    }

    onLeave() {
        this.setState({
            hovered: false,
        });
    }

    render() {
        const activeStyle = this.state.active ? builderStyles.collectionEditor.droppable.activeStyle : {};
        const hoverStyle = this.state.hovered ? builderStyles.collectionEditor.droppable.hoverStyle : {};
        return (<Droppable context={this.props.context} onDrop={this.props.onDrop}
                           onBeginDrag={this.onBeginDrag.bind(this)} onEndDrag={this.onEndDrag.bind(this)}
                           onEnter={this.onEnter.bind(this)} onLeave={this.onLeave.bind(this)}
                           style={{marginBottom: 5, justifyContent: 'center'}}>
            <View style={[
                builderStyles.collectionEditor.droppable.defaultStyle,
                activeStyle,
                hoverStyle
            ]}>{this.props.children}</View>
        </Droppable>)
    }

}

class NativeCollectionEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            context: new DragAndDropContext(),
        };
        const columns = props.options.props.columns;
        this.defaultHeaderStyle = {maxWidth: 'calc(' + (100 / columns.length) + '% - ' + 30/columns.length + 'px)'};
        this.hasNestedCollectionEditor = columns.some(col => {
            return col.customControl && col.customControl.name == 'CollectionEditor'
        });
    }

    isDraggable() {
        const options = this.props.options;
        return !options.props.readOnly && Boolean(options.props.draggable);
    }

    getDragColumn(rows, i) {
        if (!this.isDraggable()) {
            return undefined;
        }
        const options = this.props.options;
        return (<DroppableColumn context={this.state.context}
                                 onDrop={options.onDrop.bind(options.me, i, rows, new FakeEvent())}>
            <View key="celldrag">
                <Draggable context={this.state.context}
                           onBeginDrag={options.onDragStart.bind(options.me, i, rows, new FakeEvent())}
                           onEndDrag={() => {
                               options.onDragEnd(i, rows);
                               this.forceUpdate();
                            }}>
                    <View style={builderStyles.collectionEditor.dragIcon}></View>
                </Draggable>
            </View>
        </DroppableColumn>);
    }

    renderHeaderRow(columns) {
        const options = this.props.options;
        const res = [];
        let index = 0;
        columns.forEach(c => {
            let title;
            let width;
            if (typeof c === 'object') {
                title = c.name;
                width = c.width;
            }
            else {
                title = c;
            }

            if (isDefined(title) && title.length >= 2) {
                title = title.charAt(0).toUpperCase() + title.slice(1);
            }

            const style = (index == 0 && this.isDraggable()) ? {paddingLeft: 15} : {};

            res.push(<Table.Td key={index} style={[this.defaultHeaderStyle, c.style, style]}>
                <Label style={{fontWeight: 700}}>{title}</Label>
            </Table.Td>);
            index++;
        });

        const showAddCopy = options.props.disableAdd !== true;
        const showDelete = options.props.disableDelete !== true;
        if (!options.props.readOnly && (showAddCopy || showDelete)) {
            let width =  (!!options.props.hierarchical * !options.props.disableAdd) * 15 + !options.props.disableCopy * 15 + !options.props.disableDelete * 15;
            let addContent = 'Add';
            const adminLangCollectionEditor = dwKitAdminLangCollectionEditor();
            if (isDefined(adminLangCollectionEditor)) {
                addContent = adminLangCollectionEditor.add;
            }
            res.push(<Table.Td style={{maxWidth: width}}>
                <TouchableOpacity onPress={(...args) => {
                    options.btnAdd(...args);
                    this.forceUpdate();
                }}>
                    <Label {...builderStyles.collectionEditor.addLinkProps} style={{fontWeight: 700}}>{addContent}</Label>
                </TouchableOpacity>
            </Table.Td>);
        }

        return <Table.Tr key="headertr">{res}</Table.Tr>;
    }

    renderRows(columns, data, errors, parentIdValue, level, prefix) {
        const options = this.props.options;
        let me = options.me;
        let res = [];

        if(data == undefined)
            return res;

        let rows = data;
        if (isUndefined(level)) {
            level = 0;
        }

        if (prefix === undefined) {
            prefix = '';
        }

        if (options.props.filter) {
            rows = options.getFilteredItems(rows, options.props.filter);
        }

        for (let i = 0; i < rows.length; i++) {
            if (options.props.childrenField === undefined && options.props.hierarchical) {
                if (rows[i][options.props.parentIdField] != parentIdValue) {
                    continue;
                }
            }

            let dragColumn = this.getDragColumn(rows, i);
            let expand = undefined;
            let children = undefined;
            if (options.props.hierarchical) {
                let icon;
                const parentPrefix = prefix + String(i + '_');
                if (isNotEmptyString(options.props.parentIdField)) {
                    let parentId = rows[i][options.props.idField] || rows[i]['__id'];
                    if (isNotEmptyString(parentId)) {
                        children = this.renderRows(columns, data, errors, parentId, level + 1, parentPrefix);
                        if (children.length > 0) {
                            const isExpanded = options.state.expanded[prefix + i];
                            if (isUndefined(isExpanded) || isExpanded) {
                                icon =
                                    (<TouchableOpacity onPress={options.onExpand.bind(options.me, prefix + i, false)}>
                                        <Image source={{ uri: '/images/collapse.svg' }}
                                               style={builderStyles.collectionEditor.image.style}/>
                                    </TouchableOpacity>);
                            }
                            else {
                                icon = (<TouchableOpacity onPress={options.onExpand.bind(options.me, prefix + i, true)}>
                                    <Image source={{ uri: '/images/expand.svg' }}
                                           style={builderStyles.collectionEditor.image.style}/>
                                </TouchableOpacity>);
                                children = undefined;
                            }
                        }
                    }
                }
                else if (Array.isArray(rows[i][options.props.childrenField]) && rows[i][options.props.childrenField].length > 0) {
                    children = this.renderRows(
                        columns,
                        rows[i][options.props.childrenField],
                        errors,
                        undefined,
                        level + 1,
                        parentPrefix
                    );
                    if (children.length > 0) {
                        const isExpanded = options.state.expanded[prefix + i];
                        if (isUndefined(isExpanded) || isExpanded) {
                            icon = (<TouchableOpacity onPress={options.onExpand.bind(options.me, prefix + i, false)}>
                                <Image source={{ uri: '/images/collapse.svg' }}
                                       style={builderStyles.collectionEditor.image.style}/>
                            </TouchableOpacity>);
                        }
                        else {
                            icon = (<TouchableOpacity onPress={options.onExpand.bind(options.me, prefix + i, true)}>
                                <Image source={{ uri: '/images/expand.svg' }}
                                       style={builderStyles.collectionEditor.image.style}/>
                            </TouchableOpacity>);
                            children = undefined;
                        }
                    }
                }
                else {
                    icon = (<Image source={{ uri: '/images/collapse.svg' }}
                                   style={builderStyles.collectionEditor.image.style}/>);
                }

                expand = (<View>{icon}</View>);
            }

            let row = [];
            let errorOnRow = undefined;
            if (Array.isArray(errors) && errors.length > 0) {
                //let check what kind of errors we have
                const errorsHaveId = errors[0].__id !== undefined && errors[0].__id !== null;
                if (errorsHaveId) {
                    //TODO id comparison
                    const rowId = rows[i].__id;
                    if (rowId !== undefined && rowId != null) {
                        errorOnRow = errors.find(e => e.__id === rowId);
                    }
                }
                else {
                    errorOnRow = errors[i];
                }
            }

            for (let j = 0; j < columns.length; j++) {
                let colName;
                let control = options.props.readOnly ? '' : 'input';
                let customControl = undefined;
                let opts = undefined;
                if (typeof columns[j] === 'object') {
                    colName = columns[j].key;
                    control = columns[j].control;
                    customControl = columns[j].customControl;

                    if (Array.isArray(columns[j].options)) {
                        opts = columns[j].options;
                    }
                }
                else {
                    colName = columns[j];
                }

                let errorFlag = undefined;
                if (isDefined(errorOnRow)) {
                    errorFlag = Boolean(errorOnRow[colName]);
                }

                const cellStyle = (j < columns.length - 1 || !options.props.readOnly) ? {...builderStyles.collectionEditor.column.notLast} : {};

                let element = undefined;
                if (control === 'checkbox') {
                    element = (<CheckboxControl key={i + '_' + j} row={rows[i]} handleChange={options.handleChange}
                                                colName={colName} checked={rows[i][colName]} errorFlag={errorFlag}
                                                disabled={options.props.readOnly}/>);
                }
                else if (control === 'span') {
                    cellStyle.verticalAlign = 'middle';
                    element = (<Text key={i + '_' + j} name={colName}>{rows[i][colName]}</Text>);
                }
                else if (control === 'number') {
                    let value = rows[i][colName] === null || rows[i][colName] === undefined ? '' : rows[i][colName];

                    const inputProps = {
                        name: colName,
                        keyboardType: 'numeric',
                        error: errorFlag,
                        value,
                        disabled: options.props.readOnly
                    };
                    element = (<InputControl key={i + '_' + j} row={rows[i]} inputProps={inputProps}
                                             handleChange={options.handleChange}/>);
                }
                else if (control === 'date') {
                    let value = rows[i][colName] === null || rows[i][colName] === undefined ? '' : rows[i][colName];
                    element = (<DateTimeControl key={i + '_' + j} row={rows[i]}
                                                colName={colName} value={value} errorFlag={errorFlag}
                                                disabled={options.props.readOnly}
                                                handleChange={options.handleChange} type="date"/>);
                }
                else if (control === 'datetime') {
                    let value = rows[i][colName] === null || rows[i][colName] === undefined ? '' : rows[i][colName];
                    element = (<DateTimeControl key={i + '_' + j} row={rows[i]}
                                                colName={colName} value={value} errorFlag={errorFlag}
                                                disabled={options.props.readOnly}
                                                handleChange={options.handleChange} type="datetime"/>);
                }
                else if (control === 'dropdown') {
                    let value = rows[i][colName] == null ?
                        (columns[j].multiple ? [] : '')
                        : rows[i][colName];
                    element = (<DropdownControl key={i + '_' + j} row={rows[i]}
                                                colName={colName} multiple={columns[j].multiple}
                                                placeholder={columns[j].placeholder}
                                                errorFlag={errorFlag} value={value} options={opts}
                                                disabled={options.props.readOnly}
                                                handleChange={options.handleChange}/>);
                }
                else if (control === 'file' || control === 'file2') {
                    let value = rows[i][colName] === null || rows[i][colName] === undefined ? '' : rows[i][colName];
                    element = (<UploadControl key={i + '_' + j} row={rows[i]} colName={colName}
                                              errorFlag={errorFlag} value={value} disabled={options.props.readOnly}
                                              handleChange={options.handleChange}
                                              downloadUrl={options.props.downloadUrl}
                                              uploadUrl={options.props.uploadUrl} control={control}
                                              additionalData={columns[j].additionalData}/>);
                }
                else if (control === 'custom') {
                    if (customControl) {
                        let value = rows[i][colName] ? rows[i][colName] : '';

                        let initProps = {};
                        if (columns[j].customControlGetPropsFunc) {
                            initProps = columns[j].customControlGetPropsFunc(rows[i]);
                        }
                        const customControlProps = {
                            ...initProps,
                            key: i + '_' + j,
                            name: colName,
                            error: errorFlag,
                            value,
                            colName: colName,
                            row: rows[i],
                            readOnly: options.props.readOnly,
                            onChange: (e, data) => {
                                me.handleChange(customControlProps.row, e, data = data || {name: colName, value: e});
                            }
                        };

                        element = React.createElement(customControl, customControlProps);
                    }
                    else if (isDefined(options.props.placeholders) &&
                        Array.isArray(options.props.placeholders[colName]) &&
                        options.props.placeholders[colName].length > 0) {
                        let model = options.props.placeholders[colName][0];
                        if (model) {
                            let row = rows[i];
                            if (model.propertyName === undefined || model.propertyName === '') {
                                model.propertyName = colName;
                            }

                            element = (<CustomControl model={model} parent={options.me} row={row}
                                                      errorOnRow={errorOnRow} name={options.props.name}
                                                      buildermode={options.props.buildermode}
                                                      handleChange={options.handleChange}
                                                      handleEvent={options.props.handleEvent}
                                                      getAdditionalDataForControl={options.props.getAdditionalDataForControl}
                                                      readOnly={options.props.readOnly}
                                                      uploadUrl={options.props.uploadUrl}
                                                      downloadUrl={options.props.downloadUrl} data={options.props.data}
                                                      adaptiveViewType={options.props.adaptiveViewType}
                                                      controlBarParams={options.props.controlBarParams}
                                                      createControl={options.props.createControl}/>);
                        }
                    }
                    else if (options.props.buildermode && options.props.createBuilderDropzone) {
                        element = options.props.createBuilderDropzone(
                            options.props.name,
                            options.props.name,
                            undefined,
                            colName,
                            colName
                        );
                    }
                }
                else {
                    let value = rows[i][colName] === null || rows[i][colName] === undefined ? '' : rows[i][colName];
                    const inputProps = {
                        name: colName,
                        dataList: columns[j].dataList,
                        error: errorFlag,
                        value,
                        disabled: options.props.readOnly
                    };
                    element = (<InputControl key={i + '_' + j} row={rows[i]} inputProps={inputProps}
                                             handleChange={options.handleChange}/>);
                };
                
                const columnStyle = columns[j].style;
                cellStyle.maxWidth = this.defaultHeaderStyle.maxWidth;
                if (this.hasNestedCollectionEditor) cellStyle.paddingTop = 40;

                if (j === 0) {
                    if (level) {
                        cellStyle.paddingLeft = String(level * 15 + 5) + 'px';
                    }

                    row.push(<Table.Td key={i + '_' + j + 'td'}
                                       style={[cellStyle, columnStyle]}>{expand}{dragColumn}{element}</Table.Td>);
                }
                else {
                    row.push(<Table.Td key={i + '_' + j + 'td'} style={[cellStyle, columnStyle]}>{element}</Table.Td>);
                }
            }

            if (!options.props.readOnly) {
                const showAdd = !options.props.disableAdd;
                const showCopy = !options.props.disableCopy;
                const showDelete = !options.props.disableDelete;
                const EditIcon = props => (
                    <TouchableOpacity onPress={() => {
                        props.handler();
                        this.forceUpdate();
                    }}>
                        <Icon {...props} style={builderStyles.collectionEditor.icon}/>
                    </TouchableOpacity>
                );
                    

                const editColumnStyle = [builderStyles.collectionEditor.editButtonsColumn, this.hasNestedCollectionEditor ? {paddingTop: 30} : {}];

                let width =  showCopy * 15 + showDelete * 15;
                if (options.props.hierarchical) {
                    width += showAdd * 15;
                    row.push(<Table.Td key="celldelete" style={{maxWidth: width}}>
                        <View style={editColumnStyle}>
                            {showAdd && <EditIcon key="addchild" name='plus-outline'
                                            handler={options.btnAddChild.bind(options.me, i, rows)}/>}
                            {showCopy && <EditIcon key="copy" name='copy-outline' 
                                            handler={options.btnCopy.bind(options.me, i, rows)}/>}
                            {showDelete && <EditIcon key="delete" name='close-outline' 
                                            handler={options.btnDelete.bind(options.me, i, rows)}/>}
                        </View>
                    </Table.Td>);
                }
                else {
                    row.push(<Table.Td key="celldelete" style={{maxWidth: width}}>
                        <View style={editColumnStyle}>
                            {showCopy && <EditIcon key="copy" name='copy-outline'
                                            handler={options.btnCopy.bind(options.me, i, undefined)}/>}
                            {showDelete && <EditIcon key="delete" name='close-outline'
                                            handler={options.btnDelete.bind(options.me, i, undefined)}/>}
                        </View>
                    </Table.Td>);
                }
            }

            res.push(<Table.Tr key={prefix + i} data-rowindex={i}>{row}</Table.Tr>);
            res = res.concat(children);
        }

        return res;
    }

    render() {
        const options = this.props.options;

        const columns = options.props.columns;
        const data = options.props.value;
        const error = options.props.error;

        if (options.props.collapseAll && Array.isArray(data)) {
            options.applyCollapseAll(data);
        }

        if (!columns || !columns.length) {
            return <View><Text>Fill columns property!</Text></View>;
        }

        let controlProps = {
            style: [builderStyles.collectionEditor.container, options.props.style],
            onBlur: options.props.onBlur,
            onClick: options.props.onClick,
            onFocus: options.props.onFocus,
            onMouseEnter: options.props.onMouseEnter,
            onMouseLeave: options.props.onMouseLeave
        };

        // todo remove class
        // if (options.props.error && typeof options.props.error !== 'object') {
        // controlProps.className += ' error';
        // }

        return (<View {...controlProps}>
            <Label>{options.props.label}</Label>
            <Table>
                <Table.THeader>
                    {this.renderHeaderRow(columns)}
                </Table.THeader>
                <Table.TBody>
                    {this.renderRows(columns, options.state.data, error)}
                </Table.TBody>
            </Table>
        </View>);
    }

}

register('collection-editor', options => {
    return (<NativeCollectionEditor options={options}/>);
});
