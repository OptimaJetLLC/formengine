import { Button, Dropdown, Form, Modal } from 'semantic-ui-react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { StructureConverter, TreePickerHeader } from 'optimajet-builder-shared';

export default class TreePicker extends Component {

    static defaultProps = {
        hidden: (_node) => {
            return false;
        },
        disabledClause: (_node) => {
            return false;
        },
        childrenKey: 'nodes',
        multiple: false,
        minSearchQueryLength: 3,
        pageSize: 100
    };

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            value: this.props.value
        };

        this.converter = new StructureConverter({
            children: this.props.childrenKey
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.dataModel !== prevState.dataModel) {

            return {
                getAdditionalDataForControl: nextProps.getAdditionalDataForControl,
                dataModel: nextProps.dataModel,
                needFetch: true,
                needValueFetch: true
            };
        }

        if (nextProps.paging && nextProps.value !== prevState.value && nextProps.value !== undefined) {

            return {
                needValueFetch: true,
                value: nextProps.value
            };
        }

        return null;
    }

    componentDidMount() {
        this.widget = $(ReactDOM.findDOMNode(this));
        this.nodes = [];
        this.tabs = {};
        this.picked = [];
        this.opened = [];

        this.checkFetch();
    }

    componentDidUpdate(_prevProps, _prevState) {
        this.checkFetch();
    }

    checkFetch() {
        if (this.state.needFetch) {
            this.getAdditionalData(null);
        }
        else if (this.state.needValueFetch) {
            this.loadCurrentValue();
        }
    }

    getNodeById(id) {

        const nodes = this.recursiveNodeSearch(this.nodes, node => `${node.id}` === `${id}`);

        if (nodes.length) {
            return nodes[0];
        }

        return null;
    }

    getPicked() {

        var picked = [];

        if (!this.props.multiple) {
            if (this.props.value) {
                picked.push(this.props.value);
            }
        }
        else {
            return this.getArrayValues(this.props.value);
        }

        return picked;
    }

    updatePickedNodes(picked) {

        if (picked) {
            this.picked = [];

            const getComparator = id => node => `${node.id}` === `${id}`;

            for (var id of picked) {
                const searchResult = this.recursiveNodeSearch(this.nodes, getComparator(id));
                if (searchResult.length) {
                    this.picked.push(searchResult[0]);
                }
            }
        }
    }

    initializeNodes(nodes) {

        const tree = this.renderTree(nodes, this.state.rowsCount, null, 0, {
            height: '400px',
            overflowY: 'scroll'
        });
        this.tabs.tree.html(tree);
        return this.initializeNodeList(tree);
    }

    recursiveNodeSearch(nodes, comparator) {
        let results = [];

        if(!Array.isArray(nodes))
            return results;

        for (let node of Array.from(nodes)) {
            if (comparator(node)) {
                results.push(node);
            }
            if (node[this.props.childrenKey] && node[this.props.childrenKey].length) {
                results = results.concat(this.recursiveNodeSearch(node[this.props.childrenKey], comparator));
            }
        }

        return results;
    }

    renderTree(nodes, nodesCount, parentNodeId, startIndex, css) {
        var node, nodeElement, _i, _len;
        if (!css) {
            css = {};
        }
        const tree = $('<div class="ui tree-picker tree"></div>').css(css);

        for (_i = 0, _len = nodes.length; _i < _len; _i++) {
            node = nodes[_i];
            const openedStyle = this.opened.includes(node.id) ? ' opened' : '';

            if (this.props.hidden(node)) {
                continue;
            }
            nodeElement = $(
                `<div class="node${openedStyle}" data-id="${node.id}" data-name="${node.name}">
    <div class="head">
        <i class="add circle icon"></i>
        <i class="minus circle icon"></i>
        <i class="radio icon"></i>
        <a class="name">${node.name}</a>
        <i class="checkmark icon"></i>
    </div>
    <div class="content${openedStyle}"></div>
</div>`).appendTo(tree);

            if (this.props.disabledClause(node)) {
                nodeElement.addClass('disabled');
            }
            if (node[this.props.childrenKey] && node[this.props.childrenKey].length) {
                $('.content', nodeElement).append(this.renderTree(
                    node[this.props.childrenKey],
                    node.rowsCount,
                    node.id,
                    0
                ));
            }
            else if (!node.hasChild) {
                nodeElement.addClass('childless');
            }
        }

        if (this.props.paging && nodes.length + startIndex < nodesCount) {
            $(
                `<div class="node pager" data-parent-id="${parentNodeId}" data-start-index="${nodes.length + startIndex}">
    <div class="head">
        <a class="name">...</a>
    </div>
</div>`).appendTo(tree);
        }

        return tree;
    }

    initializeNodeList(tree) {
        $('.node', tree).each((_, domNode) => {

            const node = $(domNode);
            const head = $('>.head', node);
            const content = $('>.content', node);

            $('>.name', head).on('click', () => {

                if (node.hasClass('pager')) {
                    this.pagerClicked(node);
                }
                else {
                    this.nodeClicked(node);
                }
            });

            if (this.nodeIsPicked(node)) {
                node.addClass('picked');
            }
            if (!node.hasClass('childless')) {
                $('>.icon', head).on('click', () => {

                    const nodeObj = this.getNodeById(this.getNodeId(node));

                    if (nodeObj && nodeObj.hasChild && (!nodeObj[this.props.childrenKey] || !nodeObj[this.props.childrenKey].length)) {

                        this.getAdditionalData(nodeObj.id, node);

                    }
                    else {
                        content.slideToggle();
                    }

                    node.toggleClass('opened');

                    if (this.opened.includes(nodeObj.id)) {
                        this.opened = this.opened.filter(x => x !== nodeObj.id);
                    }
                    else {
                        this.opened.push(nodeObj.id);
                    }
                });
            }

        });
    }

    pagerClicked(node) {
        this.getAdditionalData(node.data('parent-id'), node, node.data('start-index'));
    }

    nodeClicked(node) {
        if (!node.hasClass('disabled')) {
            if (!this.props.multiple) {

                if (this.picked.length && this.props.clearable) {
                    if (this.picked[0].id === this.getNodeId(node)) {
                        return this.unpickNode(node); // not repick selected node if 'clearable' is on
                    }
                }

                $('.node.picked', this.modal).removeClass('picked');
                this.picked = [];
            }
            node.toggleClass('picked');
            if (node.hasClass('picked')) {
                return this.pickNode(node);
            }
            else {
                return this.unpickNode(node);
            }
        }
    }

    nodeIsPicked(node) {
        return this.picked.filter((n) => `${n.id}` === this.getNodeId(node)).length;
    }

    updatePickedCount() {

        if (this.picked.length) {
            this.count.closest('.item').addClass('highlighted');
            return this.count.html('(' + this.picked.length + ')');
        }
        else {
            this.count.closest('.item').removeClass('highlighted');
            return this.count.html('');
        }
    }

    getNodeId(node) {
        return node.attr('data-id');
    }

    pickNode(node) {
        const id = this.getNodeId(node);
        this.picked.push({
            id: id,
            name: node.attr('data-name')
        });
        this.updatePickedCount();
        return $('.node[data-id=' + id + ']', this.modal).addClass('picked');
    }

    unpickNode(node) {
        const id = this.getNodeId(node);
        this.picked = this.picked.filter((n) => `${n.id}` !== `${id}`);
        this.updatePickedCount();
        return $('.node[data-id=' + id + ']', this.modal).removeClass('picked');
    }

    showTree() {
        $('.menu .item', this.modal).removeClass('active');
        $('.menu .tree', this.modal).addClass('active');
        this.tabs.tree.show();
        this.tabs.search.hide();
        this.tabs.picked.hide();
        return this.modal.attr('data-mode', 'tree');
    }

    getColumnsForFilter() {
        var pattern = new RegExp(' asc', 'gi');
        var res = this.props.columns.replace(pattern, '');

        pattern = new RegExp(' desc', 'gi');
        res = res.replace(pattern, '');

        pattern = new RegExp(' ', 'gi');
        res = res.replace(pattern, '');

        return res;
    }

    showSearch(query) {

        if (query !== null && query.length >= this.props.minSearchQueryLength) {

            if (this.props.paging) {

                const settings = {
                    model: this.state.dataModel,
                    filters: [
                        {
                            column: this.getColumnsForFilter(),
                            term: 'like',
                            value: query
                        }
                    ]
                };

                this.setState({
                    isFetching: true
                }, () => {
                    this.state.getAdditionalDataForControl(this, settings, ({ items }) => { //TODO cancellation token from async request

                        this.setState({
                            isFetching: false
                        });

                        this.renderSearchResults(items, query);

                    });
                });


            }
            else {

                const foundNodes = this.recursiveNodeSearch(this.nodes, (node) => {
                    return node.name && node.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
                });

                this.renderSearchResults(foundNodes, query);
            }
        }
        else {
            this.showTree();
        }
    }

    renderSearchResults(foundNodes, query) {
        const list = this.renderList(foundNodes, {
            height: '400px',
            overflowY: 'scroll'
        });
        $('.menu .item', this.modal).removeClass('active');
        this.tabs.search.show().html(list);
        this.tabs.tree.hide();
        this.tabs.picked.hide();
        this.modal.attr('data-mode', 'search');
        this.initializeNodeList(list);
        $('.name', list).each(function () {
            let name = $(this).text();
            const regex = RegExp('(' + query + ')', 'gi');
            name = name.replace(regex, '<strong class=\'search-query\'>$1</strong>');
            $(this).html(name);
        });
    }

    showPicked() {
        var list;
        list = this.renderList(this.picked, {
            height: '400px',
            overflowY: 'scroll'
        });
        $('.menu .item', this.modal).removeClass('active');
        $('.menu .picked', this.modal).addClass('active');
        this.tabs.picked.show().html(list);
        this.tabs.tree.hide();
        this.tabs.search.hide();
        this.modal.attr('data-mode', 'picked');
        return this.initializeNodeList(list);
    }

    renderList(nodes, css) {
        var list, node, nodeElement, _i, _len;
        if (!css) {
            css = {};
        }
        list = $('<div class="ui tree-picker list"></div>').css(css);
        for (_i = 0, _len = nodes.length; _i < _len; _i++) {
            node = nodes[_i];
            if (this.props.hidden(node)) {
                continue;
            }
            nodeElement = $(
                `<div class="node" data-id="${node.id}" data-name="${node.name}">
    <div class="head">
        <a class="name">${node.name}</a>
        <i class="checkmark icon"></i>
    </div>
    <div class="content"></div>
</div>`).appendTo(list);
            if (this.props.disabledClause(node)) {
                nodeElement.addClass('disabled');
            }
        }
        return list;
    }

    onMount = (header) => {

        this.modal = $(ReactDOM.findDOMNode(header)).parent();

        this.count = $('.count', this.modal);
        this.tabs = {
            tree: $('.tree-tab', this.modal),
            search: $('.search-tab', this.modal),
            picked: $('.picked-tab', this.modal)
        };

        $('.menu .tree', this.modal).on('click', () => {
            return this.showTree();
        });
        $('.menu .picked', this.modal).on('click', () => {
            return this.showPicked();
        });
        $('.search input', this.modal).on('keyup', (e) => {
            return this.showSearch($(e.currentTarget).val());
        });

        if (this.nodes.length) {

            if (!this.props.paging) {
                this.updatePickedNodes(this.getPicked());
                this.updatePickedCount();
            }
            else {
                this.loadCurrentValue();
            }


            this.initializeNodes(this.nodes);
        }
    }

    pickSearch = () => {
        $('.search-tab .node:not(.picked) .name', this.modal).trigger('click');
    }

    unpickSearch = () => {
        $('.search-tab .node.picked .name', this.modal).trigger('click');
    }

    unpickPicked = () => {
        $('.picked-tab .node.picked .name', this.modal).trigger('click');
    }

    handleOpen = () => {
        if (!this.state.visible) {
            this.setState({ visible: true });
        }
    }

    handleClose = () => {
        this.setState({ visible: false });
    }

    handleSave = () => {

        var value;

        if (this.props.multiple) {
            value = this.picked.map(x => x.id);
        }
        else {
            value = this.picked.length ? this.picked[0].id : null;
        }

        const additionalValues = this.getAdditionalValues(value);

        this.onChange(value, additionalValues);

        this.setState({ visible: false });
    }

    getAdditionalData(parentIdToFetch, domElement, startIndex = 0) {
        if (!this.state.dataModel) {
            if (this.props.buildermode) {
                console.log('TreePicker: Set DataModel label!');
            }
        }
        else if (!this.state.getAdditionalDataForControl) {
            if (this.props.buildermode) {
                console.log('TreePicker: For paging on server need to set getAdditionalDataForControl func!');
            }
        }
        else {

            const settings = { model: this.state.dataModel };

            if (this.props.paging) {
                settings.startIndex = startIndex;
                settings.pageSize = this.props.pageSize;
            }

            this.setState({
                isFetching: true,
                needFetch: false,
                parentIdToFetch: parentIdToFetch
            }, () => {
                this.state.getAdditionalDataForControl(this, settings, ({ items, rowsCount }) => { //TODO cancellation token from async request

                    const nodes = this.converter.toNested(items, parentIdToFetch);

                    this.setData({ items: nodes, rowsCount, parentIdToFetch }, !startIndex);

                    if (!this.props.paging) {

                        this.updatePickedNodes(this.getPicked());

                        if (this.modal) {
                            this.initializeNodes(this.nodes);
                        }

                    }
                    else {

                        const tree = this.renderTree(nodes, rowsCount, parentIdToFetch, startIndex);
                        this.initializeNodeList(tree);

                        if (!startIndex) {

                            $('.content', domElement).append(tree);

                            $('>.content', domElement).slideToggle();
                        }
                        else {
                            domElement.replaceWith(tree.children());
                        }

                    }

                    if (this.state.needValueFetch) {
                        this.loadCurrentValue();
                    }

                });
            });
        }
    }

    loadCurrentValue() {

        this.picked = [];

        if (this.props.value !== undefined && this.props.value !== null) {
            if (this.props.multiple) {

                const values = this.getArrayValues(this.props.value);

                let unfindedValues = [];

                for (let i = 0; i < values.length; i++) {
                    const value = values[i];

                    const searchResult = this.getNodeById(value);

                    if (!searchResult) {
                        unfindedValues.push(value);
                    }
                    else {
                        this.picked.push(searchResult);
                    }
                }

                if (unfindedValues.length > 0) {
                    let settings = { model: this.state.dataModel };
                    settings.filters = [
                        {
                            column: '__id',
                            term: 'in',
                            value: unfindedValues
                        }
                    ];

                    this.setState({ isFetching: true }, () => {
                        this.state.getAdditionalDataForControl(this, settings, ({ items }) => {
                            this.addSelectedNodes(items);
                        });
                    });
                }
                else {
                    if (this.modal) {
                        this.updatePickedCount();
                    }
                }
            }
            else {

                const searchResult = this.getNodeById(this.props.value);

                if (!searchResult) {
                    let settings = { model: this.state.dataModel };
                    settings.filters = [
                        {
                            column: '__id',
                            term: '=',
                            value: this.props.value
                        }
                    ];

                    this.setState({ isFetching: true }, () => {
                        this.state.getAdditionalDataForControl(this, settings, ({ items }) => {

                            this.addSelectedNodes(items);
                        });
                    });

                }
                else {
                    this.picked.push(searchResult);
                    if (this.modal) {
                        this.updatePickedCount();
                    }
                }
            }
        }

        if (this.state.needValueFetch) {
            this.setState({ needValueFetch: false });
        }
    }

    setData({ items, rowsCount, parentIdToFetch }, reset) {

        if (reset) {

            if (!parentIdToFetch) {
                this.nodes = items;

                this.setState({
                    rowsCount: rowsCount
                });
            }
            else {

                const parent = this.getNodeById(parentIdToFetch);

                if (parent) {
                    parent[this.props.childrenKey] = items;
                    parent.rowsCount = rowsCount;
                }
            }
        }
        else {

            if (!parentIdToFetch) {
                this.nodes = this.nodes.concat(items);
            }
            else {

                const parent = this.getNodeById(parentIdToFetch);

                if (parent) {
                    parent[this.props.childrenKey] = parent[this.props.childrenKey].concat(items);
                }
            }
        }

        this.setState({
            needFetch: false,
            isFetching: false
        });
    }

    getArrayValues(value) {

        let res = value;

        if (res === undefined || res === null) {
            return [];
        }

        if (!Array.isArray(res)) {
            let valueArray;
            try {
                valueArray = JSON.parse(res);
            }
            catch (e) {
                console.log(e);
            }

            if (!Array.isArray(valueArray)) {
                valueArray = [res];
            }

            res = valueArray;
        }
        return res;
    }

    addSelectedNodes(items) {

        if (!Array.isArray(items) || !items.length) {
            return;
        }

        this.picked = this.picked.concat(items);

        if (this.modal) {
            this.updatePickedCount();
        }

        this.setState({
            isFetching: false
        });
    }

    getLocalized(key, defaultValue) {

        if (window.DWKitAdminLang && window.DWKitAdminLang.treepicker) {
            return window.DWKitAdminLang.treepicker[key];
        }

        return defaultValue;
    }

    onChange(value, additionalValues) {

        if (this.props.handleEvent) {
            this.props.handleEvent({
                syntheticEvent: null,
                key: this.props.name,
                propertyName: this.props.propertyName,
                eventName: 'onChange',
                name: this.props.name,
                value, additionalValues
            });
        }
    }

    getAdditionalValues(value) {

        var additionalValues;

        if (this.nodes.length) {

            if (Array.isArray(value)) {

                const stringValues = value.map(v => `${v}`);

                additionalValues = this.recursiveNodeSearch(this.nodes, n => stringValues.includes(`${n.id}`))
                    .map(n => n.values);

            }
            else {

                if (value) {
                    const searchResult = this.recursiveNodeSearch(this.nodes, n => `${n.id}` === `${value}`);

                    if (searchResult.length) {
                        additionalValues = searchResult[0].values;
                    }
                }
                else {

                    const columnsList = this.getColumnsForFilter();

                    if (columnsList) {
                        additionalValues = {};
                        columnsList.split(',').forEach(k => {
                            additionalValues[k] = null;
                        });
                    }

                }
            }
        }

        return additionalValues;
    }

    onDropdownChange = (_, { value }) => {

        const additionalValues = this.getAdditionalValues(value);

        this.onChange(value, additionalValues);
    }

    triggerElement() {

        let value = this.props.value;
        const options = [];

        if (this.props.multiple) {
            if (!this.props.value) {
                value = [];
            }

            if (!Array.isArray(this.props.value)) {
                value = this.getArrayValues(this.props.value);
            }

            for (let v of value) {
                const node = this.getNodeById(v);
                if (node) {
                    options.push({ value: node.id, text: node.name });
                }
            }

        }
        else {
            if (value) {
                const node = this.getNodeById(value);
                if (node) {
                    options.push({ value: node.id, text: node.name });
                }
            }
        }

        const props = {
            fluid: this.props.fluid,
            disabled: this.props.disabled,
            multiple: this.props.multiple,
            value: value,
            className: this.props.className,
            options: options,
            selection: this.props.selection
        };

        //if (this.props.parentIsForm) {
            props.label = this.props.label;
            props.error = this.props.error;
            return <Form.Dropdown {...props} onClick={this.handleOpen} onChange={this.onDropdownChange}/>;
        // }

        // let divClass = 'ui labeled input';

        // if (this.props.fluid) {
        //     divClass += ' fluid';
        // }

        // if (this.props.error) {
        //     divClass += ' error';
        // }

        // return (<div className={divClass}>
        //     {this.props.label && <div className="ui label label">{this.props.label}</div>}
        //     <Dropdown {...props} onChange={this.onDropdownChange} onClick={this.handleOpen}/>
        // </div>);
    }

    render() {

        // else if (control === TreePicker) {
        //     props.label = model.label;
        //     props.defaultValue = model.defaultValue;
        //     props.placeholder = model.placeholder;
        //     props.selection = model.selection;
        //     props.multiple = model.multiple;
        //     props.search = model.search;
        //     props.dataModel = model.dataModel;
        //     props.clearable = model.clearable;
        //     props.columns = model.columns;
        //     props.paging = model.paging;
        //     props.pageSize = model.pageSize;
        //     props.parentIdField = model.parentIdField;
        //     props.getAdditionalDataForControl = getAdditionalDataForControl;
        //     props.modalCssClass = model['style-custommodalcss'];
        //     props.fluid = model.fluid;
        //     props.disabled = model.disabled;
        //     props.handleEvent = handleEvent;
    
        //     if (model['style-modalsource'] !== undefined) {
        //         let style = {};
        //         BaseControls.getCustomStyle(model['style-modalsource'], style);
        //         props.modalStyle = style;
        //     }
    
        //     if (errors && errors[model.key] !== undefined) {
        //         props.error = errors[model.key];
        //     }
    
        //     if (model.text) {
        //         props.textFunc = new Function('data', `return ${model.text};`);
        //     }
    
        //     props.parentIsForm = BaseControls.isForm(parentItem);
        //     res = <TreePicker {...props} />;

        const modalClass = `tree-picker ${this.props.modalCssClass}`;
        const dimmerClass = 'ui inverted dimmer' + this.state.isFetching ? ' active' : '';

        return (
            <Modal style={this.props.modalStyle} className={modalClass} open={this.state.visible}
                   trigger={this.triggerElement()}>
                <TreePickerHeader name={this.props.label} onMount={this.onMount}
                                  selected={this.getLocalized('selected', 'Selected')}/>
                <div className="ui search form">
                    <div className="field">
                        <div className="ui icon input">
                            <input type="text" placeholder={this.getLocalized('search', 'Search')}/>
                            <i className="search icon"/>
                        </div>
                    </div>
                </div>
                <Modal.Content>
                    <div className={dimmerClass}>
                        <div className="ui text loader">{this.getLocalized('loadingData', 'Loading data')}</div>
                    </div>
                    <div className="tree-tab">
                        <div style={{ height: '400px' }}/>
                    </div>
                    <div className="search-tab"/>
                    <div className="picked-tab"/>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.pickSearch} className="pick-search"><i
                        className="checkmark icon"/>{this.getLocalized('selectAll', 'Select all')}</Button>
                    <Button onClick={this.unpickSearch} className="unpick-search"><i
                        className="remove icon"/>{this.getLocalized('removeAll', 'Remove all')}</Button>
                    <Button onClick={this.unpickPicked} className="unpick-picked"><i
                        className="remove icon"/>{this.getLocalized("removeAll", "Remove all")}</Button>
                    <Button onClick={this.handleSave} className="blue">{this.getLocalized("ok", "Ok")}</Button>
                    <Button onClick={this.handleClose}>{this.getLocalized("cancel", "Cancel")}</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}
