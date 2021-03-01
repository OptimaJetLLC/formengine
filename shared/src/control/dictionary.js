/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable eqeqeq */

import { Component } from 'react';
import { isDefined } from '../helpers';
import { draw } from '../component-render-registry';

const isEqual = require('react-fast-compare');
const clone = require('clone');

export default class Dictionary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [],
            value: this.props.value
        };

        this.pageSize = props.pageSize;
        if (!this.pageSize) {
            this.pageSize = 100;
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.dataModel !== prevState.dataModel) {
            return {
                getAdditionalDataForControl: nextProps.getAdditionalDataForControl,
                dataModel: nextProps.dataModel,
                needFetch: true,
                needValueFetch: true,
                filters: nextProps.filters
            };
        }

        if (nextProps.paging && nextProps.value !== prevState.value && nextProps.value !== undefined) {
            return {
                needValueFetch: true,
                value: nextProps.value
            };
        }

        if (nextProps.filters != prevState.filters) {
            return {
                needFetch: true,
                filters: nextProps.filters
            };
        }

        return null;
    }

    componentDidMount() {
        this.GetAdditionalData();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!isEqual(this.state, nextState)) {
            return true;
        }
        return !isEqual(this.props, nextProps);
    }

    componentDidUpdate(prevProps, prevState) {
        this.GetAdditionalData();
    }

    GetAdditionalData() {
        if (this.state.dataModel === undefined) {
            if (console !== undefined && this.props.buildermode === true) {
                console.log('Dictionary: Set DataModel label!');
            }
        }
        else if (this.state.getAdditionalDataForControl === undefined) {
            if (console !== undefined && this.props.buildermode === true) {
                console.log('Dictionary: For paging on server need to set getAdditionalDataForControl func!');
            }
        }
        else {
            if (this.state.needFetch) {
                let me = this;
                let settings = {
                    model: this.state.dataModel,
                    filters: this.state.filters
                };
                const lastLoadPage = 0;
                if (this.props.paging) {
                    settings.startIndex = 0;
                    settings.pageSize = this.pageSize;
                }

                this.state.isFetching = true;
                this.state.needFetch = false;
                this.state.getAdditionalDataForControl(this, settings, ({ items, rowsCount }) => { //TODO cancellation token from async request
                    me.setData({ items, rowsCount, page: lastLoadPage }, true);

                    if (this.state.needValueFetch) {
                        this.state.needValueFetch = false;
                        this.loadCurrentValue();
                    }
                });
            }
            else if (this.state.needValueFetch) {
                this.state.needValueFetch = false;
                this.loadCurrentValue();
            }
        }
    }

    render() {

        // else if (control === Dictionary) {
        //     props.label = model.label;
        //     props.defaultValue = model.defaultValue;
        //     props.placeholder = model.placeholder;
        //     props.disabled = model.disabled;
        //     props.fluid = model.fluid;
        //     props.selection = model.selection;
        //     props.multiple = model.multiple;
        //     props.search = model.search;
        //     props.dataModel = model.dataModel;
        //     props.clearable = model.clearable;
        //     props.columns = model.columns;
        //     props.paging = model.paging;
        //     props.pageSize = model.pageSize;
        //     props.getAdditionalDataForControl = getAdditionalDataForControl;
        //     props.filters = replaceControlValue(model.filters);
        //     props.textAsValue = model.textAsValue;
    
        //     if (model.text) {
        //         props.textFunc = new Function('data', `return ${model.text};`);
        //     }
    
        //     if (errors && errors[model.key] !== undefined) {
        //         props.error = errors[model.key];
        //     }
    
        //     props.handleEvent = handleEvent;
        //     props.parentIsForm = BaseControls.isForm(parentItem);
        //     res = (<Dictionary {...props} />);
        //     }

        var me = this;
        let model = this.props.additionalParams.model;
        let controlProps = {};
        for (const p in this.props) {
            if (p === 'parentIsForm' ||
                p === 'getAdditionalDataForControl' ||
                p === 'dataModel' ||
                p === 'clearable' ||
                p === 'columns' ||
                p === 'paging' ||
                p === 'pageSize' ||
                p === 'handleEvent' ||
                p === 'propertyName' ||
                p === 'textAsValue') {
                continue;
            }
            controlProps[p] = this.props[p];
        }

        if (this.props.readOnly) {
            controlProps.disabled = true;
        }

        controlProps.options = this.state.options;
        controlProps.onChange = this.onChange.bind(this);
        if (this.props.paging) {
            controlProps.onSearchChange = this.handleSearchChange.bind(this);
            controlProps.onClose = this.onClose.bind(this);
            if(this.state.open != undefined){
                if(this.state.open){
                    controlProps.open = true;
                }
                else{
                    controlProps.open = false;
                    this.state.open = undefined;
                    setTimeout(function(){
                        me.forceUpdate();
                    })
                }
            }
        }

        if (controlProps.multiple) {
            if (controlProps.value === undefined || controlProps.value === null) {
                controlProps.value = [];
            }

            if (!Array.isArray(controlProps.value)) {
                controlProps.value = this.getArrayValues(controlProps.value);
            }
        }

        controlProps.loading = this.state.isFetching;
        controlProps.searchQuery = this.state.searchQuery;

        return draw('dictionary', {
            propsControl: controlProps,
            props: this.props,
            model
        });
    }

    onChange(e, { name, value }) {
        let loadFlag = false;

        if (this.props.multiple) {
            if (Array.isArray(value)) {
                let isFind = false;

                value.forEach(function (v) {
                    if(typeof v === "string" && v.lastIndexOf("__load", 0) === 0){
                        isFind = true;
                    }
                });

                if (isFind) {
                    loadFlag = true;
                }
            }
        }
        else if(typeof value === "string" && value.lastIndexOf("__load", 0) === 0){
            loadFlag = true;
        }

        if (loadFlag) {
            this.state.open = true;
            this.setState({ isFetching: true });
            this.loadNextPage();
            value = this.props.value;
        }
        else if (isDefined(this.state.open)) {
            this.state.open = false;      
        }

        let additionalValues = null;        

        if(!this.props.textAsValue){
            if (Array.isArray(value)) {
                additionalValues = new Array();

                value.forEach((v) => {

                    if(typeof v === "string" && v.lastIndexOf("__load", 0) === 0){
                        const filtered = this.state.options.filter(o => o.key === v);

                        if (filtered.length > 0) {
                            additionalValues.push(filtered[0].values);
                        }
                    }
                });
            } else {
                const filtered = this.state.options.filter(o => o.key === value);

                if (filtered.length > 0) {
                    additionalValues = filtered[0].values;
                } else {

                    const columnsList = this.getCollumnsForFilter();

                    if (columnsList) {
                        additionalValues = {};
                        columnsList.split(",").forEach(k => {
                            additionalValues[k] = null;
                        });
                    }
                }
            }
        }

        if (this.props.handleEvent) {
            this.props.handleEvent({
                syntheticEvent: e,
                key: this.props.name,
                eventName: 'onChange',
                name: this.props.name,
                propertyName: this.props.propertyName,
                value,
                additionalValues
            });
        }

    }

    onClose() {
        if (this.state.open != true && this.state.searchQuery) {
            this.state.isFetching = true;
            this.state.searchQuery = '';
            this.state.lastLoadPage = -1;

            this.loadNextPage(true);
        }
        else if(this.state.open === false){
            this.forceUpdate();
        }
    }

    handleSearchChange(e, { searchQuery }) {
        let me = this;
        if(me.searchTimeout){
            clearTimeout(me.searchTimeout);
        }

        me.searchTimeout = setTimeout(function () {
            me.searchTimeout = undefined;
            me.setState({
                isFetching: true,
                searchQuery: searchQuery,
                lastLoadPage: -1
            });

            me.loadNextPage(true);
        }, 100);
    }

    loadNextPage(reset) {
        const me = this;
        let settings = { model: this.state.dataModel };
        const page = this.state.lastLoadPage + 1;

        if (me.state.searchQuery) {
            settings.filters = [
                {
                    column: this.getCollumnsForFilter(),
                    term: 'like',
                    value: me.state.searchQuery
                }
            ];
        }

        settings.startIndex = page * this.pageSize;
        settings.pageSize = this.pageSize;

        this.state.getAdditionalDataForControl(this, settings, function ({ items, rowsCount }) {
            me.setData({ items, rowsCount, page: page }, reset);
            if (reset) {
                me.loadCurrentValue();
            }
        });
    }

    setData({ items, rowsCount, page }, reset) {
        let options;
        if (reset) {
            options = clone(items);
            if (rowsCount > options.length) {
                let text = (this.state.searchQuery != undefined ? this.state.searchQuery : '') + '...';
                options.push({ key: '__load', value: '__load', text });
            }

            if (this.props.clearable && !this.props.multiple) {
                options.unshift({ key: '__reset', value: '', text: '   ' });
            }

            if (this.props.multiple) {
                let values = this.getArrayValues(this.props.value);
                for (let i = 0; i < values.length; i++) {
                    let value = values[i];
                    for (let j = 0; j < this.state.options.length; j++) {
                        let option = this.state.options[j];
                        if (value == option.value) {
                            options.unshift(option);
                        }
                    }
                }
            }
        }
        else {
            options = this.state.options;
            let loadingItem = undefined;
            if (options.length > 0 && options[options.length - 1].key === '__load') {
                loadingItem = options.pop();
                loadingItem.value = "__load_" + page;
            }

            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                for (let j = 0; j < options.length; j++) {
                    let option = options[j];
                    if (option.key === item.key) {
                        options.splice(j, 1);
                        break;
                    }
                }
                options.push(item);
            }

            if (loadingItem !== undefined && rowsCount > options.length) {
                options.push(loadingItem);
            }
        }

        if(this.props.textAsValue){
            options.forEach(function(o){
                if(o.key != "__load"){
                    o.value = o.text;
                }
            });
        }

        this.setState({
            needFetch: false,
            options: options,
            rowsCount,
            isFetching: false,
            lastLoadPage: page
        });
    }

    getArrayValues(value) {
        let res = value;
        if (!Array.isArray(res)) {
            let valueArray;
            try {
                valueArray = JSON.parse(res);
            }
            catch (e) {
            }

            if (!Array.isArray(valueArray)) {
                valueArray = [res];
            }

            res = valueArray;
        }
        return res;
    }

    loadCurrentValue() {
        const me = this;
        if(this.props.value){
            if (this.props.multiple) {
                let values = this.getArrayValues(this.props.value);
                let unfindedValues = [];
                for (let i = 0; i < values.length; i++) {
                    let value = values[i];
                    let isFind = false;
                    for (let j = 0; j < this.state.options.length; j++) {
                        let option = this.state.options[j];
                        if (option.value == value) {
                            isFind = true;
                            break;
                        }
                    }

                    if (!isFind) {
                        unfindedValues.push(value);
                    }
                }

                if(unfindedValues.length > 0){
                    if(this.props.textAsValue){
                        let options = this.state.options;
                        unfindedValues.forEach(function(value){
                            options.push({value: value, text: value});
                        });
                    }
                    else{
                        let settings = {model: this.state.dataModel};
                        settings.filters = [{
                            column: "__id",
                            term: 'in',
                            value: unfindedValues
                        }];
                        this.state.isFetching = true;

                        this.state.getAdditionalDataForControl(this, settings, function ({items}) {
                            me.addAdditionalOptions(items);
                        });
                    }
                }
            }
            else {
                let isFind = false;
                for (let i = 0; i < this.state.options.length; i++) {
                    let option = this.state.options[i];
                    if (option.value == this.props.value) {
                        isFind = true;
                        break;
                    }
                }

                if(!isFind){
                    if(this.props.textAsValue){
                        this.state.options.push({value: me.props.value, text: me.props.value});
                    }
                    else{
                        let settings = {model: this.state.dataModel};
                        settings.filters = [{
                            column: "__id",
                            term: '=',
                            value: me.props.value
                        }];
                        this.state.isFetching = true;

                        this.state.getAdditionalDataForControl(this, settings, function ({items}) {
                            me.addAdditionalOptions(items);
                        });
                    }
                }
            }
        }
    }

    addAdditionalOptions(items) {
        this.state.isFetching = false;

        if (!Array.isArray(items) || !items.length) {
            return;
        }

        const options = this.state.options;

        for (let i = items.length - 1; i >= 0; i--) {
            let isFind = false;
            for (let j = 0; j < options.length; j++) {
                if (options[j].key == items[i].key) {
                    isFind = true;
                    break;
                }
            }

            if (!isFind) {
                options.unshift(items[i]);
            }
        }

        this.forceUpdate();
    }

    getCollumnsForFilter() {
        if(!this.props.columns){
            return undefined;
        }

        let pattern = new RegExp(' asc', 'gi');
        let res = this.props.columns.replace(pattern, '');

        pattern = new RegExp(' desc', 'gi');
        res = res.replace(pattern, '');

        pattern = new RegExp(' ', 'gi');
        res = res.replace(pattern, '');

        return res;
    }
}
