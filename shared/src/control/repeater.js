/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable eqeqeq */

import { Component } from 'react';
import JSON5 from 'json5';
import { isDefined, isUndefined } from '../helpers';
import { draw } from '../component-render-registry';

const isEqual = require('react-fast-compare');
const clone = require('clone');

export default class Repeater extends Component {
    constructor(props) {
        super(props);
        this.psTemplate = 'template';

        this.state = {
            items: [],
            sort: '',
            filter: props.filter,
            firstLoad: !props.controlProps.buildermode && Repeater.staticIsServerMode(props),
            pageSize: props.pageSize ? props.pageSize : 20
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const newState = {
            needUpdate: false
        };
        if (!isEqual(prevState.filter, nextProps.filter)) {
            newState.filter = nextProps.filter;
            newState.needUpdate = true;
            if (!Repeater.staticIsServerMode(nextProps)) {
                const newItems = Repeater.staticGetSortedAndFilteredItems(nextProps.value, nextProps.filter,
                    prevState.sort, nextProps.defaultSort
                );
                newState.items = newItems;
                newState.selectedIndexes = [];
                newState.rowsCount = newItems.length;
            }
            else {
                newState.items = [];
                newState.firstLoad = true;
                newState.rowsCount = undefined;
            }
        }
        else {
            if (!Repeater.staticIsServerMode(nextProps) &&
                !isEqual(prevState.originalItems, nextProps.value)) {

                const newItems = Repeater.staticGetSortedAndFilteredItems(nextProps.value, prevState.filter,
                    prevState.sort, nextProps.defaultSort
                );

                newState.items = newItems;
                newState.rowsCount = newItems.length;
                newState.selectedIndexes = [];
                newState.originalItems = Repeater.copyObj(nextProps.value);
                newState.needUpdate = true;
            }
        }
        return newState;
    }

    static staticIsServerMode(props) {
        return props.pagerType && props.pagerType.toLowerCase() === 'server';
    }

    static staticCheckData(data) {
        let rows = !data ? [] : data;

        if (!Array.isArray(rows)) {
            try {
                rows = JSON5.parse(rows);
            }
            catch (e) {
            }
        }
        else {
            rows = clone(rows);
        }

        return rows;
    }

    static staticGetSortedAndFilteredItems(array, filter, sort, defaultSort) {
        let items = Repeater.staticCheckData(array);
        if (items === undefined) {
            return items;
        }

        if(Array.isArray(items) && items.length > 0){
            for(let i in items){
                items[i].__originalIndex = i;
                i++;
            }
        }

        if (filter !== undefined) {
            items = items.filter((r) => filter.IsRowMatched(r));
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
        return items.sort(comparer);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.needUpdate) {
            return true;
        }
        return !isEqual(this.props, nextProps);
    }

    render() {
        let model = this.props.additionalParams.model;

        // else if (control === Repeater) {
        //     props.slider = model.slider;
    
        //     props['item-visibleCondition'] = model['item-visibleCondition'];
        //     props.pageSize = model.pageSize;
        //     props.pagerType = model.pagerType;
        //     props.loadButtonLabel = model.loadButtonLabel;
        //     props.noRecordsLabel = model.noRecordsLabel;
        //     props.defaultSort = model.defaultSort;
        //     if (extendedData !== undefined && extendedData.filters !== undefined && extendedData.filters[props.key] !== undefined) {
        //         props.filter = new FunctionalFilter(extendedData.filters[props.key], ['*']);
        //     }
    
        //     props.placeholders = clone(model.placeholders);
    
        //     //TODO Set read-only for all controls in server pager mode
        //     props.controlProps = {
        //         readOnly: model.pagerType === 'server' ? true : readOnly
        //     };
    
        //     props.model = model;
        //     props.data = data;
        //     const controlProps = props.controlProps;
    
        //     this.setCreateControlsProps(controlProps, {
        //         children, getAdditionalDataForControl, disableRefs, uploadUrl,
        //         downloadUrl, extendedData, controlsToReplace, eventOnEdit, eventOnDelete, eventOnCopy,
        //         adaptiveViewType, handleEvent, externalControlList, externalControlRender,
        //         hideControls, readOnlyControls, buildermode
        //     });
    
        //     if(model["childrenView"]){
        //         props.className = (props.className ? props.className + " " : "") + "formbuilder-container-" + model["childrenView"];
        //     }
    
        //     res = (<Repeater {...props} />);
        //     }

        return draw('repeater', {
            isServerMode: this.isServerMode(),
            loadNextPage: this.loadNextPage,
            me: this,
            props: this.props,
            psTemplate: this.psTemplate,
            state: this.state,
            handleChange: this.handleChange,
            model
        });
    }

    handleChange = (item, e, { name, propertyName, value, checked, parameters }) => {
        if (!this.props.controlProps.handleEvent && !this.props.controlProps.buildermode) {
            return;
        }

        let pn = propertyName;
        if (pn === undefined) {
            pn = name;
        }

        if (parameters && parameters.index !== undefined) {
            const items = this.state.items;
            items[parameters.index] = { ...item };
            item = items[parameters.index];
        }

        if (isUndefined(value) && isDefined(checked)) {
            item[pn] = checked;
        }
        else {
            item[pn] = value;
        }

        if (this.isServerMode()) {
            this.forceUpdate();
            return;
        }

        this.sendChangesToParent();

        if (e) {
            e.preventDefault();
        }
        else {
            this.forceUpdate();
        }
    };

    sendChangesToParent() {
        let rows = Repeater.copyObj(this.state.items);

        if(Array.isArray(rows) && rows.length > 0){        
            for(let i in rows){
                delete rows[i].__originalIndex;
            }
        }


        const stringmode = typeof this.props.value === 'string';
        const res = stringmode ? JSON5.stringify(rows) : rows;

        if (this.props.controlProps.buildermode) {
            this.props.value = res;
        }
        else {
            this.props.controlProps.handleEvent({
                syntheticEvent: null,
                key: this.props.name,
                propertyName: this.props.propertyName,
                eventName: 'onChange', name: this.name, value: res
            });
        }
    }

    loadNextPage = () => {
        const pageSize = this.state.pageSize;
        let startIndex = 0;
        if (isDefined(this.state.items)) {
            startIndex = this.state.items.length;
        }
        this.loadPage(startIndex, pageSize);
    };

    loadPage(startIndex, pageSize) {
        const me = this;
        if (!this.props.controlProps || this.props.controlProps.getAdditionalDataForControl === undefined) {
            if (console !== undefined) {
                console.log('Repeater: For paging on server need to set getAdditionalDataForControl func!');
            }
        }
        else {
            let sortString = this.state.sort;
            if (sortString === '' && this.props.defaultSort !== undefined) {
                sortString = this.props.defaultSort;
            }

            this.state.loading = true;
            this.forceUpdate();

            this.props.controlProps.getAdditionalDataForControl(this, {
                    startIndex,
                    pageSize,
                    filters: this.state.filter !== undefined ? this.state.filter.GetFilterAsObjects() : [],
                    sort: sortString
                },
                function ({ sIndex, pageSize, rowsCount, items }) {
                    if (rowsCount === undefined || items === undefined) {

                    }
                    else {
                        me.state.rowsCount = rowsCount;
                        if (me.state.items.length == startIndex) {
                            for (let i = 0; i < items.length; i++) {
                                me.state.items.push(items[i]);
                            }
                        }
                    }

                    me.state.loading = false;
                    me.forceUpdate();
                }
            );
        }
    }

    isServerMode() {
        return Repeater.staticIsServerMode(this.props);
    }

    static copyObj(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = this.copyObj(obj[attr]);
        }
        return copy;
    }
}
