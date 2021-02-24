/*
Filter object structure:
let filter = [
{column: "Name" | "Name1,Name2,Name3" | "*",
value: value,
term: ">" | "<" | "=" | ">=" | "<=" | "!=" | "like" | "like*" | "*like" | "*like*"
]
"*like*" === "like"
 */

import React, { Component } from 'react';
import { FilterTerms, FunctionalFilter } from '../functional-filter';
import moment from 'moment';
import { draw } from '../component-render-registry';
import { isDefined, isUndefined } from '../helpers';
import { dwKitDateFormat, dwKitTimeFormat } from '../dwkit-util';
import CustomControl from './collection-editor/custom-control'

class CheckBoxFormatter extends Component {
    render() {
        return draw('checkbox-formatter', {
            props: this.props,
        });
    }
}

class NumberFormatter extends Component {
    render() {
        return draw('number-formatter', {
            props: this.props,
        });
    }
}

class DateFormatter extends Component {
    render() {
        const value = moment(this.props.value);
        let strValue = '';
        if (value.isValid()) {
            let format = dwKitDateFormat('L');
            strValue = value.format(format);
        }
        return draw('date-formatter', {
            props: this.props,
            strValue: strValue,
        });
    }
}

class DateTimeFormatter extends Component {
    render() {
        const value = moment(this.props.value);
        let strValue = '';
        if (value.isValid()) {
            let dateTimeFormat = 'DD.MM.YYYY HH:mm';
            const dateFormat = dwKitDateFormat();
            if (dateFormat) {
                const timeFormat = dwKitTimeFormat('HH:mm');
                dateTimeFormat = `${dateFormat} ${timeFormat}`;
            }
            strValue = value.format(dateTimeFormat);
        }
        return draw('datetime-formatter', {
            props: this.props,
            strValue: strValue,
        });
    }
}

class TimeFormatter extends Component {
    render() {
        const value = moment(this.props.value);
        let strValue = '';
        if (value.isValid()) {
            let format = (isDefined(window.DWKitLang) && isDefined(window.DWKitLang.common) && isDefined(window.DWKitLang.common.timeFormat))
                ? window.DWKitLang.common.timeFormat
                : 'HH:mm';
            strValue = value.format(format);
        }
        return draw('time-formatter', {
            props: this.props,
            strValue: strValue,
        });
    }
}

const jsonEqual =
    function (a, b) {
        return JSON.stringify(a) === JSON.stringify(b);
    };

export default class GridView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            sort: '',
            defaultSort: props.defaultSort,
            filter: props.filter,
            pageSize: 20,
            selectedIndexes: [],
            rowsCount: GridView.staticIsServerMode(props) ? undefined : 0
        };

        try {
            this.state.isrtl = getComputedStyle(document.getElementsByTagName('html')[0]).direction == 'rtl';
        }
        catch (e) {
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let newState = null;
        if (!jsonEqual(prevState.filter, nextProps.filter)) {
            newState = { filter: nextProps.filter };
            if (!GridView.staticIsServerMode(nextProps)) {
                const newItems = Array.isArray(nextProps.value) ? GridView.staticGetSortedAndFilteredItems(
                    nextProps.value,
                    nextProps.filter,
                    prevState.sort,
                    nextProps.defaultSort
                ) : [];
                newState.items = newItems;
                newState.selectedIndexes = [];
                newState.rowsCount = newItems.length;
            }
            else {
                newState.items = [];
                newState.selectedIndexes = [];
                newState.rowsCount = undefined;
            }
        }
        else {
            if (!GridView.staticIsServerMode(nextProps) && prevState.originalItems !== nextProps.value) {
                newState = {};
                const newItems = Array.isArray(nextProps.value) ? GridView.staticGetSortedAndFilteredItems(
                    nextProps.value,
                    prevState.filter,
                    prevState.sort,
                    nextProps.defaultSort
                ) : [];

                newState.items = newItems;
                newState.rowsCount = newItems.length;
                newState.selectedIndexes = [];
                newState.originalItems = nextProps.value;
            }
        }
        return newState;
    }

    static staticIsServerMode(props) {
        return props.pagerType === 'server';
    }

    static staticGetSortedAndFilteredItems(array, filter, sort, defaultSort) {
        let items = [];
        if (array === undefined) {
            return items;
        }
        if (filter !== undefined) {
            items = array.filter((r) => filter.IsRowMatched(r));
        }
        else {
            items = array;
        }

        let currentSort = sort;
        if (sort === 'NONE' || sort === '') {
            if (defaultSort === undefined) {
                return items;
            }
            currentSort = defaultSort;
        }

        const indexSpace = currentSort.indexOf(' ');
        const sortColumn = currentSort.substring(0, indexSpace);
        const sortDirection = currentSort.substring(indexSpace + 1, currentSort.length);

        //Sorting
        const comparer = (a, b) => {
            let aValue = (a[sortColumn] !== undefined && a[sortColumn] !== null && a[sortColumn].toLowerCase !== undefined)
                ? a[sortColumn].toLowerCase()
                : a[sortColumn];
            let bValue = (b[sortColumn] !== undefined && b[sortColumn] !== null && b[sortColumn].toLowerCase !== undefined)
                ? b[sortColumn].toLowerCase()
                : b[sortColumn];

            if (aValue === bValue) {
                return 0;
            }
            if (aValue === null || aValue === undefined) {
                return 1;
            }
            if (bValue === null || bValue === undefined) {
                return -1;
            }
            if (sortDirection === 'ASC') {
                return (aValue > bValue) ? 1 : -1;
            }
            else if (sortDirection === 'DESC') {
                return (aValue < bValue) ? 1 : -1;
            }
        };
        return items.slice(0).sort(comparer);
    }

    isEditFormModal() {
        return this.props.editFormShowType === 'modal';
    }

    isEditFormSidebar() {
        return this.props.editFormShowType === 'sidebar';
    }

    isServerMode() {
        return GridView.staticIsServerMode(this.props);
    }

    refresh() {
        if (this.isServerMode()) {
            this.setState({
                items: [],
                selectedIndexes: [],
                rowsCount: undefined
            });
        }
        else {
            const newItems = Array.isArray(this.props.value) ? GridView.staticGetSortedAndFilteredItems(
                this.props.value,
                this.state.filter,
                this.state.sort,
                this.props.defaultSort
            ) : [];
            this.setState({
                items: newItems,
                rowsCount: newItems.length,
                selectedIndexes: [],
                originalItems: this.props.value
            });
        }
    }

    resetSelection() {
        this.setState({
            selectedIndexes: []
        });
    }

    render() {
        // else if (control === GridView) {
        //     props.columns = model.columns;
        //     props.multiselect = model.multiselect;
        //     props.rowKey = model.rowKey;
        //     props.editForm = model.editForm;
        //     props.editFlow = model.editFlow;
        //     props.editType = model.editType;
        //     props.pagerType = model.pagerType;
        //     props.pageSize = model.pageSize;
        //     props.rowHeight = model.rowHeight;
        //     props.headerRowHeight = model.headerRowHeight;
        //     props.minHeight = model.minHeight;
        //     props.autoHeight = model.autoHeight;
        //     props.offSet = model.offSet;
        //     props.disableSort = model.disableSort;
        //     props.resizeColumns = model.resizeColumns;
        //     props.editFormShowType = model.editFormShowType;
        //     props.sidebarDirection = model.sidebarDirection;
        //     props.getAdditionalDataForControl = getAdditionalDataForControl;
        //     props.handleEvent = handleEvent;
        //     props.defaultSort = model.defaultSort;
            
        //     if (errors && errors[model.key] !== undefined) {
        //         props.error = errors[model.key];
        //     }
    
        //     if (buildermode && props.value === undefined) {
        //         props.buildermode = buildermode;
        //         props.createBuilderDropzone = BaseControls.createBuilderDropzone;
        //         props.value = [];
        //         for (i = 0; i < 30; i++) {
        //             let obj = {};
        //             props.columns.forEach(function (c) {
        //                 obj[c.key] = c.key + '_' + i;
        //             });
        //             props.value.push(obj);
        //         }
        //     }
        //     if (extendedData !== undefined && extendedData.filters !== undefined && extendedData.filters[props.key] !== undefined) {
        //         props.filter = new FunctionalFilter(extendedData.filters[props.key], props.columns.map(c => c.key));
        //     }
            
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
    
        //         props.createControl = this.createCollectionEditorControl.bind(this);
        //     }
    
        //     res = (<GridView {...props} />);
        


        return draw('grid-view', {
            gridColumns: this.getColumns(),
            gridProps: this.getGridPropsByPagerType(this.props.pagerType),
            me: this,
            onRowsSelected: this.onRowsSelected.bind(this),
            onRowsDeselected: this.onRowsDeselected.bind(this),
            selectBy: {
                indexes: this.state.selectedIndexes
            },
            gridRowGetter: this.gridRowGetter.bind(this),
            gridOnRowClick: this.gridOnRowClick.bind(this),
            handleGridSort: this.handleGridSort.bind(this),
            state: this.state,
            props: this.props,
        });
    }

    getColumns() {
        const me = this;
        let columns;
        if (this.props.columns === undefined) {
            columns = [];
        }
        else if (Array.isArray(this.props.columns)) {
            columns = this.props.columns;
        }
        else {
            columns = JSON.parse(this.props.columns);
        }

        columns.forEach(function (item) {
            if (item.width !== null && item.width !== '' && item.width !== undefined) {
                item.width = Number(item.width);
            }

            if (item.sortable !== false) {
                item.sortable = !me.props.disableSort;
            }
            item.filterable = Boolean(me.props.filterRow);
            item.resizable = Boolean(item.resizable);

            if (item.type === 'number') {
                item.formatter = NumberFormatter;
            }
            else if (item.type === 'checkbox') {
                item.formatter = CheckBoxFormatter;
            }
            else if (item.type === 'date') {
                item.formatter = DateFormatter;
            }
            else if (item.type === 'time') {
                item.formatter = TimeFormatter;
            }
            else if (item.type === 'datetime') {
                item.formatter = DateTimeFormatter;
            }
            else if (item.type === 'custom') {
                item.getRowMetaData = (row) => row;
                item.formatter = (args) => {
                    if ((isUndefined(item.customFormatter) || typeof (item.customFormatter) != 'function')) {
                        if(me.props.placeholders && Array.isArray(me.props.placeholders[item.key]) && me.props.placeholders[item.key].length > 0){
                            let model = me.props.placeholders[item.key][0];
                            if (model.propertyName === undefined || model.propertyName === '') {
                                model.propertyName = item.key;
                            }

                            return (<CustomControl key={item.key + "_" + args.dependentValues.__id} model={model} parent={me} row={args.dependentValues}
                                            errorOnRow={{}} name={me.props.name}
                                            buildermode={me.props.buildermode}
                                            handleChange={function(){}}
                                            handleEvent={me.props.handleEvent}
                                            getAdditionalDataForControl={me.props.getAdditionalDataForControl}
                                            readOnly={me.props.readOnly}
                                            uploadUrl={me.props.uploadUrl}
                                            downloadUrl={me.props.downloadUrl} data={me.props.data}
                                            adaptiveViewType={me.props.adaptiveViewType}
                                            controlBarParams={me.props.controlBarParams}
                                            createControl={me.props.createControl}
                                />);
                        }
                        else if(me.props.buildermode){
                            return me.props.createBuilderDropzone(
                                me.props.name,
                                me.props.name,
                                undefined,
                                item.key,
                                item.key
                            );
                        }
                        else{
                            return '';
                        }
                    }
                    return item.customFormatter({
                        row: args.dependentValues,
                        value: args.value,
                        column: item
                    });
                };
            }
        });

        if (this.state.isrtl) {
            return columns.reverse();
        }
        return columns;
    }

    getGridPropsByPagerType() {
        let gridProps = {};

        const pagerType = this.props.pagerType;
        if (pagerType === 'server') {
            var size = parseInt(this.props.pageSize);
            if (size) {
                this.state.pageSize = size;
            }

            gridProps.rowRenderer = <RowLoadingRenderer error={this.props.error}/>;
            if (isUndefined(this.state.rowsCount)) {
                this.state.rowsCount = 1;
            }
        }
        else {
            // if (Array.isArray(this.props.value)) {
            //     this.state.items = this.getSortedAndFilteredItems(this.props.value);
            // }
            //this.state.rowsCount = this.state.items.length;
        }
        return gridProps;
    }

    getSeletedRowKeys() {
        const me = this;
        let selectedKeys = [];

        this.state.selectedIndexes.forEach(function (index) {
            const obj = me.gridRowGetter(index);
            if (obj !== undefined) {
                let key;
                if (me.props.rowKey !== null && me.props.rowKey !== undefined && obj.hasOwnProperty(me.props.rowKey)) {
                    key = obj[me.props.rowKey];
                }
                if (key == null || isUndefined(key)) {
                    key = obj['__id'];
                }
                if (key !== null && key !== undefined) {
                    selectedKeys.push(key);
                }
            }
        });
        return selectedKeys;
    }

    gridRowGetter(index) {
        if (index < 0) {
            return undefined;
        }

        const pagerType = this.props.pagerType;
        if (pagerType === 'server') {
            if (this.state.items[index] === undefined) {
                const pageSize = this.state.pageSize;
                this.loadPage(index, pageSize);
            }
        }

        if (pagerType === 'server') {
            return this.state.items[index];
        }
        return { ...this.state.items[index] };
    }

    getSort() {
        let sortString = this.state.sort;
        if (sortString === '' && this.props.defaultSort !== undefined) {
            sortString = this.props.defaultSort;
        }
        return sortString;
    }

    getFilters() {
        return this.state.filter !== undefined ? this.state.filter.GetFilterAsObjects() : [];
    }

    loadPage(startIndex, pageSize) {
        const me = this;
        for (let i = 0; i < pageSize; i++) {
            this.state.items[i + startIndex] = { __loading: true };
        }

        if (this.props.getAdditionalDataForControl === undefined) {
            if (console !== undefined) {
                console.log('GridView: For paging on server need to set getAdditionalDataForControl func!');
            }
        }
        else {
            let sortString = this.getSort();
            this.props.getAdditionalDataForControl(
                this,
                {
                    startIndex,
                    pageSize,
                    filters: this.getFilters(),
                    sort: sortString
                },
                function ({ sIndex, pSize, rowsCount, items }) {
                    if (rowsCount === undefined || items === undefined) {
                        me.state.rowsCount = 0;
                        me.setState({
                            rowsCount: 0,
                            items: []
                        });
                    }
                    else {
                        me.state.rowsCount = rowsCount;
                        for (let i = 0; i < pSize; i++) {
                            if (i < items.length) {
                                me.state.items[sIndex + i] = items[i];
                            }
                            else {
                                me.state.items[sIndex + i] = undefined;
                            }
                        }
                        me.forceUpdate();
                    }
                }
            );
        }
    }

    gridOnRowClick(rowIdx, row) {
        if (row === undefined) {
            return;
        }

        const timenow = Date.now();
        if (this.rowClickTime !== undefined && this.rowClickTime.rowIdx === rowIdx && (timenow - this.rowClickTime.time) <= 1000) {
            this.rowClickTime = undefined;
            this.onRowDblClick(rowIdx, row);
        }
        else {
            this.rowClickTime = {
                rowIdx: rowIdx,
                time: timenow
            };

            if (this.props.handleEvent !== undefined) {
                this.props.handleEvent({ key: this.props.name, propertyName: this.props.propertyName, eventName: 'onRowClick', parameters: { rowIdx, row } });
            }
        }
    }

    onRowDblClick(rowIdx, row) {
        if (this.props.handleEvent !== undefined) {
            this.props.handleEvent({ key: this.props.name, propertyName: this.props.propertyName, eventName: 'onRowDblClick', parameters: { rowIdx, row } });
        }
    }

    onRowsSelected(rows) {
        this.state.selectedIndexes = this.state.selectedIndexes.concat(rows.map(r => r.rowIdx));
        if (this.props.handleEvent !== undefined) {
            this.props.handleEvent({
                key: this.props.name,
                eventName: 'onSelectionChanged',
                propertyName: this.props.propertyName,
                parameters: { selectedIndexes: this.state.selectedIndexes }
            });
        }
        this.forceUpdate();
    }

    onRowsDeselected(rows) {
        let rowIndexes = rows.map(r => r.rowIdx);
        this.state.selectedIndexes = this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1);
        if (this.props.handleEvent !== undefined) {
            this.props.handleEvent({
                key: this.props.name,
                eventName: 'onSelectionChanged',
                propertyName: this.props.propertyName,
                parameters: { selectedIndexes: this.state.selectedIndexes }
            });
        }
        this.forceUpdate();
    }

    handleGridSort(sortColumn, sortDirection) {
        const stateDelta = {};
        if (sortDirection === 'NONE') {
            stateDelta.sort = '';
        }
        else {
            stateDelta.sort = sortColumn + ' ' + sortDirection;
        }

        const pagerType = this.props.pagerType;
        if (pagerType === 'server') {
            stateDelta.items = [];
        }
        else {
            stateDelta.items = GridView.staticGetSortedAndFilteredItems(this.props.value,
                this.state.filter, stateDelta.sort, this.props.defaultSort
            );
        }

        stateDelta.selectedIndexes = [];
        this.setState(stateDelta);
    };

    handleFilterChange(filter) {
        const stateDelta = {};
        let key = filter.column.key;
        let id = 'columnfilter_' + key;
        stateDelta.filter = this.state.filter !== undefined ? this.state.filter : new FunctionalFilter(
            [],
            this.props.columns.map(c => c.key)
        );
        stateDelta.filter.RemoveFilter({ name: key, id: id });
        if (filter.filterTerm !== '') {
            stateDelta.filter.AddFilter({ names: [key], expected: filter.filterTerm, term: FilterTerms.Like, id: id });
        }
        if (GridView.staticIsServerMode(this.props)) {
            stateDelta.items = [];
            stateDelta.selectedIndexes = [];
            stateDelta.rowsCount = undefined;
        }
        else {
            stateDelta.items = GridView.staticGetSortedAndFilteredItems(this.props.value,
                stateDelta.filter, this.state.sort, this.props.defaultSort
            );
            stateDelta.selectedIndexes = [];
            stateDelta.rowsCount = stateDelta.items.length;
        }
        this.setState(stateDelta);
    };

    onClearFilters() {
        this.setState({ filter: this.props.filter });
    };

    ///----------
    ///Resize
    ///----------
    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        this.recalcSizeParams();
    }

    recalcSizeParams() {
        if (!this._isMounted) {
            return;
        }

        if (this.props.autoHeight) {
            const h = window.innerHeight;

            this.setState({
                gridHeight: h - this.props.deltaHeight
            });
        }
    }
}

class RowLoadingRenderer extends Component {
    setScrollLeft(scrollBy) {
        this.row.setScrollLeft(scrollBy);
    };

    getClassName() {
        if (this.props.row.__loading) {
            return 'formbuilder-gridview-rowloading';
        }
        if (this.props.row.__id !== undefined && this.props.row.__id !== null && this.props.error !== undefined
            && this.props.error !== null && Array.isArray(this.props.error)) {
            const errorForRow = this.props.error.find(e => e.__id === this.props.row.__id);
            if (errorForRow !== undefined) {
                return 'formbuilder-gridview-rowerror';
            }
        }

        return '';
    };

    render() {
        return draw('row-loading-renderer', {
            className: this.getClassName(),
            me: this,
            props: this.props,
            row: this.row,
        });
    }
}
