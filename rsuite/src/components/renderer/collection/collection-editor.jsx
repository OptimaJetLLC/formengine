import React from 'react';
import {
    CheckboxControl,
    CustomControl,
    DateTimeControl,
    DropdownControl,
    InputControl,
    isDefined,
    isNotEmptyString,
    isUndefined,
    register,
    UploadControl,
    CameraControl,
    SignatureControl
} from 'optimajet-builder-shared';
import { Icon } from 'semantic-ui-react';

register('collection-editor', options => {

    function getDragColumn(rows, i) {
        let draggable = !options.props.readOnly && Boolean(options.props.draggable);
        if (draggable) {
            return (<div
                draggable={draggable}
                onDragStart={options.onDragStart.bind(options.me, i, rows)}
                onDragEnd={options.onDragEnd.bind(options.me, i, rows)}
                onDragOver={options.onDragOver.bind(options.me)}
                onDrop={options.onDrop.bind(options.me, i, rows)}
                key="celldrag" className="formbuilder-collectioneditor-action">
                <Icon onClick={options.onExpand.bind(options.me, i, false)} name='ellipsis vertical'/>
            </div>);
        }
        return undefined;
    }

    function renderHeaderRow(columns) {
        const res = [];
        let index = 0;
        columns.forEach(function (c) {
            let key;
            let title;
            let width;
            let dataListOptions = undefined;
            if (typeof c === 'object') {
                key = c.key;
                title = c.name;
                width = c.width;
                if (Array.isArray(c.dataList)) {
                    dataListOptions = c.dataList;
                }
            }
            else {
                key = c;
                title = c;
            }

            if (isDefined(title) && title.length >= 2) {
                title = title.charAt(0).toUpperCase() + title.slice(1);
            }

            let dataListControl;
            let dataListId = undefined;
            if (isDefined(dataListOptions) && dataListOptions != null) {
                dataListId = key + '_datalist';
                let optValue = [];
                dataListOptions.forEach(function (o) {
                    optValue.push(<option key={o} value={o}/>);
                });
                dataListControl = <datalist key={dataListId} id={dataListId}>{optValue}</datalist>;
            }

            const display = index == 0 ? {display: 'flex'} : {};

            res.push(<td key={index} style={{ width, ...display }}>{title}{dataListControl}</td>);
            index++;
        });

        const showAddCopy = options.props.disableAdd !== true;
        const showDelete = options.props.disableDelete !== true;
        if (!options.props.readOnly && (showAddCopy || showDelete)) {
            let addContent = 'Add';
            // const adminLangCollectionEditor = dwKitAdminLangCollectionEditor();
            // if (isDefined(adminLangCollectionEditor)) {
            //     addContent = adminLangCollectionEditor.add;
            // }
            res.push(<td key="btntd" className="formbuilder-collectioneditor-buttoncol"><a key="btnadd" className="dwkit-btn"
                                                                                     onClick={options.btnAdd}>{addContent}</a>
            </td>);
        }

        return <tr key="headertr" className="formbuilder-collectioneditor-header">{res}</tr>;
    }

    function renderRows(columns, data, errors, parentIdValue, level, prefix) {
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

            let dragcol = getDragColumn(rows, i);
            let expand = undefined;
            let children = undefined;
            let rowKey = rows[i][options.props.idField] || rows[i]["__id"] || i;
            if (options.props.hierarchical) {
                let icon;
                var parentPrefix = prefix + String(i + '_');
                if (isNotEmptyString(options.props.parentIdField)) {
                    let parentId = rows[i][options.props.idField] || rows[i]['__id'];
                    if (isNotEmptyString(parentId)) {
                        children = renderRows(columns, data, errors, parentId, level + 1, parentPrefix);
                        if (children.length > 0) {
                            const isexpanded = options.state.expanded[prefix + i];
                            if (isUndefined(isexpanded) || isexpanded) {
                                icon = <img onClick={options.onExpand.bind(options.me, prefix + i, false)}
                                            className="formbuilder-collectioneditor-imgbutton-collapse" />;
                            }
                            else {
                                icon = <img onClick={options.onExpand.bind(options.me, prefix + i, true)}
                                            className="formbuilder-collectioneditor-imgbutton-expand" />;
                                children = undefined;
                            }
                        }
                    }
                }
                else if (Array.isArray(rows[i][options.props.childrenField]) && rows[i][options.props.childrenField].length > 0) {
                    children = renderRows(
                        columns,
                        rows[i][options.props.childrenField],
                        errors,
                        undefined,
                        level + 1,
                        parentPrefix
                    );
                    if (children.length > 0) {
                        const isexpanded = options.state.expanded[prefix + i];
                        if (isUndefined(isexpanded) || isexpanded) {
                            icon = <img onClick={options.onExpand.bind(options.me, prefix + i, false)}
                                        className="formbuilder-collectioneditor-imgbutton-collapse"/>;
                        }
                        else {
                            icon = <img onClick={options.onExpand.bind(options.me, prefix + i, true)}
                                        className="formbuilder-collectioneditor-imgbutton-expand"/>;
                            children = undefined;
                        }
                    }
                }
                else {
                    icon = <img style={{ opacity: 0 }} className="formbuilder-collectioneditor-imgbutton-collapse" />;
                }

                expand = <div className="formbuilder-collectioneditor-action">{icon}</div>;
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
                let dataListId = undefined;
                let customControl = undefined;
                let opts = undefined;
                if (typeof columns[j] === 'object') {
                    colName = columns[j].key;
                    control = columns[j].control;
                    customControl = columns[j].customControl;
                    if (Array.isArray(columns[j].dataList)) {
                        dataListId = colName + '_datalist';
                    }

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

                let cellStyle = {};
                if (j === 0 && (dragcol || options.props.hierarchical)) {
                    cellStyle.display = 'flex';
                }

                let element = undefined;
                if (control === 'checkbox') {
                    element = (<CheckboxControl key={rowKey + '_' + j} row={rows[i]} handleChange={options.handleChange}
                                                colName={colName} checked={rows[i][colName]} errorFlag={errorFlag}
                                                readOnly={options.props.readOnly}
                    />);
                }
                else if (control === 'span') {
                    cellStyle.verticalAlign = 'middle';
                    element = <span key={rowKey + '_' + j} name={colName}>{rows[i][colName]}</span>;
                }
                else if (control === 'number') {
                    let value = rows[i][colName] === null || rows[i][colName] === undefined ? '' : rows[i][colName];

                    const inputProps = {
                        name: colName,
                        type: 'number',
                        error: errorFlag,
                        value,
                        readOnly: options.props.readOnly
                    };
                    element = <InputControl key={rowKey + '_' + j} row={rows[i]} inputProps={inputProps}
                                            handleChange={options.handleChange}/>;
                }
                else if (control === 'date') {
                    let value = rows[i][colName] === null || rows[i][colName] === undefined ? '' : rows[i][colName];
                    element = (<DateTimeControl key={rowKey + '_' + j} row={rows[i]}
                                                colName={colName} value={value} errorFlag={errorFlag}
                                                readOnly={options.props.readOnly}
                                                handleChange={options.handleChange} type="date"
                    />);
                }
                else if (control === 'datetime') {
                    let value = rows[i][colName] === null || rows[i][colName] === undefined ? '' : rows[i][colName];
                    element = (<DateTimeControl key={rowKey + '_' + j} row={rows[i]}
                                                colName={colName} value={value} errorFlag={errorFlag}
                                                readOnly={options.props.readOnly}
                                                handleChange={options.handleChange} type="datetime"
                    />);
                }
                else if (control === 'dropdown') {
                    let value = rows[i][colName] == null ?
                        (columns[j].multiple ? [] : '')
                        : rows[i][colName];
                    element = (<DropdownControl key={rowKey + '_' + j} row={rows[i]}
                                                colName={colName} multiple={columns[j].multiple}
                                                placeholder={columns[j].placeholder}
                                                errorFlag={errorFlag} value={value} options={opts}
                                                readOnly={options.props.readOnly}
                                                handleChange={options.handleChange}
                    />);
                }
                else if (control === 'file' || control === 'file2') {
                    let value = rows[i][colName] === null || rows[i][colName] === undefined ? '' : rows[i][colName];
                    element = (<UploadControl key={rowKey + '_' + j} row={rows[i]} colName={colName}
                                              errorFlag={errorFlag} value={value} readOnly={options.props.readOnly}
                                              handleChange={options.handleChange}
                                              downloadUrl={options.props.downloadUrl}
                                              uploadUrl={options.props.uploadUrl} control={control}
                                              additionalData={columns[j].additionalData}
                    />);
                }
                else if (control === 'camera') {
                    let value = rows[i][colName] === null || rows[i][colName] === undefined ? '' : rows[i][colName];
                    element = (<CameraControl key={rowKey + '_' + j} row={rows[i]} colName={colName}
                                              errorFlag={errorFlag} value={value} readOnly={options.props.readOnly}
                                              handleChange={options.handleChange}
                                              downloadUrl={options.props.downloadUrl}
                                              uploadUrl={options.props.uploadUrl} control={control}
                                              additionalData={columns[j].additionalData}
                    />);
                }
                else if (control === 'signature') {
                    let value = rows[i][colName] === null || rows[i][colName] === undefined ? '' : rows[i][colName];
                    element = (<SignatureControl key={rowKey + '_' + j} row={rows[i]} colName={colName}
                                              errorFlag={errorFlag} value={value} readOnly={options.props.readOnly}
                                              handleChange={options.handleChange}
                                              downloadUrl={options.props.downloadUrl}
                                              uploadUrl={options.props.uploadUrl} control={control}
                                              additionalData={columns[j].additionalData}
                    />);
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
                            key: rowKey + '_' + j,
                            name: colName,
                            error: errorFlag,
                            value,
                            colName: colName,
                            row: rows[i],
                            readOnly: options.props.readOnly,
                            onChange: (e, data) => {
                                me.handleChange(customControlProps.row, e, data);
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

                            element = (<CustomControl key={rowKey + "_" + j} model={model} parent={options.me} row={row}
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
                                                      createControl={options.props.createControl}
                            />);
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
                        list: dataListId,
                        error: errorFlag,
                        value,
                        readOnly: options.props.readOnly
                    };
                    element = <InputControl key={rowKey + '_' + j} row={rows[i]} inputProps={inputProps}
                                            handleChange={options.handleChange}/>;
                }

                if (j === 0) {
                    if (level) {
                        cellStyle.paddingLeft = String(level * 15 + 5) + 'px';
                    }

                    row.push(<td key={rowKey + '_' + j + 'td'} style={cellStyle}>{expand}{dragcol}{element}</td>);
                }
                else {
                    row.push(<td key={rowKey + '_' + j + 'td'} style={cellStyle}>{element}</td>);
                }
            }

            if (!options.props.readOnly) {
                const showAdd = !options.props.disableAdd;
                const showCopy = !options.props.disableCopy;
                const showDelete = !options.props.disableDelete;

                if (options.props.hierarchical) {
                    row.push(<td key="celldelete" className="formbuilder-collectioneditor-cellbtn">
                        <div className="field">
                            {showAdd &&
                            <Icon key="addchild" onClick={options.btnAddChild.bind(options.me, i, rows)} link
                                  name='add'/>}
                            {showCopy &&
                            <Icon key="copy" onClick={options.btnCopy.bind(options.me, i, rows)} link name='copy'/>}
                            {showDelete &&
                            <Icon key="delete" onClick={options.btnDelete.bind(options.me, i, rows)} link
                                  name='delete'/>}
                        </div>
                    </td>);
                }
                else {
                    row.push(<td key="celldelete" className="formbuilder-collectioneditor-cellbtn">
                        <div className="field">
                            {showCopy &&
                            <Icon key="copy" onClick={options.btnCopy.bind(options.me, i, undefined)} link
                                  name='copy'/>}
                            {showDelete &&
                            <Icon key="delete" onClick={options.btnDelete.bind(options.me, i, undefined)} link
                                  name='delete'/>}
                        </div>
                    </td>);
                }
            }

            res.push(<tr key={prefix + rowKey} className="formbuilder-collectioneditor-row" data-rowindex={i}>{row}</tr>);
            res = res.concat(children);
        }

        return res;
    }

    const columns = options.props.columns;
    const data = options.props.value;
    const error = options.props.error;

    if (options.props.collapseAll && Array.isArray(data)) {
        options.applyCollapseAll(data);
    }

    if (!columns || !columns.length) {
        return <div>Fill columns property!</div>;
    }

    let controlProps = {
        style: options.props.style,
        className: options.props.className,
        onBlur: options.props.onBlur,
        onClick: options.props.onClick,
        onFocus: options.props.onFocus,
        onMouseEnter: options.props.onMouseEnter,
        onMouseLeave: options.props.onMouseLeave
    };

    if (controlProps.className) {
        controlProps.className += ' field';
    }
    else {
        controlProps.className = 'field';
    }

    if (options.props.error && typeof options.props.error !== 'object') {
        controlProps.className += ' error';
    }

    controlProps.className += ' formbuilder-collectioneditor-control';

    return (<div {...controlProps}>
        <label>{options.props.label}</label>
        <table className="formbuilder-collectioneditor">
            <tbody>
            {renderHeaderRow(columns)}
            {renderRows(columns, options.state.data, error)}
            </tbody>
        </table>
    </div>);
});
