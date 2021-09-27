/* eslint-disable eqeqeq */

import { Component } from 'react';
import JSON5 from 'json5';
import { sendRequest } from './data-loader';
import { isDefined, isUndefined } from './helpers';
import { loadForm } from '../index';

export default class BaseFormViewer extends Component {

    constructor(props) {
        super(props);
        this.loadForm = loadForm(this.props);

        this.state = {
            adaptiveViewType: 'desktop',
            model: isDefined(props.model) ? props.model : [],
            data: isDefined(props.data) ? props.data : '{}',
            errors: isDefined(props.errors) ? props.errors : '{}',
            eventslog: ''
        };

        const me = this;
        if (isDefined(props.modelurl)) {
            sendRequest(props.modelurl, function (data) {
                me.setState({ model: data });
            }, null, this.props.fetchFunc);
        }

        if (isDefined(props.dataurl)) {
            sendRequest(props.dataurl, function (data) {
                var newData = data;
                try{
                  var initial = JSON5.parse(me.state.data);
                  for (var i in initial){
                    if(newData[i] == undefined){
                      newData[i] = initial[i];
                    }
                  }
                } catch(e){
                }

                me.setState({data: JSON5.stringify(newData, null, 4)});
              }, null, this.props.fetchFunc);
        }
    }

    setData(data) {
        this.setState({ data: JSON5.stringify(data, null, 4) });
    }

    getAdditionalDataForControl(control,
                                { startIndex, pageSize, filters, sort, model },
                                callback) {
        if (control.props['data-buildertype'] === 'dictionary') {
            setTimeout(function () {
                let items = [];
                for (let i = 0; i < 500; i++) {
                    let obj = {};
                    obj.key = 'Test_' + i;
                    obj.text = 'Test_' + i;
                    obj.value = i;
                    items.push(obj);
                }

                let res = [];
                let rowsCount = items.length;
                if (Array.isArray(filters) && filters.length > 0) {
                    let filter = filters[0];
                    if (filter.term === '=') {
                        for (let i = 0; i < items.length; i++) {
                            if (items[i].value == filter.value) {
                                res.push(items[i]);
                            }
                        }
                    }
                    else if (filter.term === 'in') {
                        for (let i = 0; i < items.length; i++) {
                            for (let j = 0; j < filter.value.length; j++) {
                                if (items[i].value == filter.value[j]) {
                                    res.push(items[i]);
                                    break;
                                }
                            }
                        }
                    }
                    else if (filter.term === 'like') {
                        let findIndex = 0;
                        for (let i = 0; i < items.length; i++) {
                            if (items[i].text.includes(filter.value)) {
                                findIndex++;
                                if (findIndex < startIndex) {
                                    continue;
                                }

                                if (res.length <= pageSize) {
                                    res.push(items[i]);
                                }
                            }
                        }

                        callback({ items: res, rowsCount: findIndex });
                        return;
                    }


                    callback({ items: res, rowsCount: res.length });
                    return;
                }
                else if (isUndefined(startIndex) || isUndefined(pageSize)) {
                    callback({ items, rowsCount });
                    return;
                }
                else {
                    for (let i = 0; i < pageSize; i++) {
                        res.push(items[startIndex + i]);
                    }
                }

                callback({ items: res, rowsCount });
            }, 100);
        }
        else if (control.props['data-buildertype'] === 'dictionarytree') {
            setTimeout(function () {
                let items = [];
                for (let i = 0; i < 10; i++) {
                    let obj = {};
                    obj.key = 'Test_' + i;
                    obj.text = 'Test_' + i;
                    obj.value = i;
                    obj.children = [];

                    for (let j = 0; j < 10; j++) {
                        let child = {};
                        child.key = obj.key + '_' + j;
                        child.text = obj.key + '_' + j;
                        child.value = j;
                        obj.children.push(child);
                    }

                    items.push(obj);
                }

                callback({ items: items, rowsCount: items.length });
            });
        }
        else if (control.props['data-buildertype'] === 'workflowbar') {
            callback({
                commands: [
                    { value: 'approve', type: '1', text: 'Approve' },
                    { value: 'back', type: '2', text: 'Back' }
                ],
                states: [
                    { value: 'draft', text: 'Draft' },
                    { value: 'state1', text: 'State 1' },
                    { value: 'state2', text: 'State 2' },
                    { value: 'final', text: 'Final' }
                ]
            });
        }
        else {
            setTimeout(function () {
                let rowsCount = 100;
                let items = [];
                for (let i = 0; i < pageSize; i++) {
                    let obj = {};
                    if (isUndefined(control.props.columns)) {
                        obj['col1'] = 'col1_' + (Number(startIndex) + Number(i));
                        obj['col2'] = 'col2_' + (Number(startIndex) + Number(i));
                        obj['col3'] = 'col3_' + (Number(startIndex) + Number(i));
                    }
                    else {
                        control.props.columns.forEach(function (c) {
                            obj[c.key] = c.key + '_' + (Number(startIndex) + Number(i));
                        });
                    }
                    items.push(obj);
                }
                callback({ startIndex, pageSize, rowsCount, items });
            }, 100);
        }
    }

    eventFunc(p) {
        p.syntheticEvent = undefined;
        p.component = undefined;
        p.controlRef = undefined;
        p.sourceEvent = undefined;
        let eventslog = this.state.eventslog;
        let sep = '';
        if (eventslog.length > 0) {
            sep = '\n';
        }

        eventslog = new Date().toLocaleTimeString() + ': ' + JSON5.stringify({
            ...p,
            e: undefined,
            sourceControlRef: undefined
        }) + sep + eventslog;

        this.setState({
            eventslog: eventslog
        });

        if(p.actions.includes("initSystem") && p.parameters && p.parameters["initialData"]){
            this.setState({data: JSON5.stringify(p.parameters["initialData"], null, 4)});
        }
    }

    eventErrProcess(obj, message){
        let eventslog = this.state.eventslog;
        let sep = '';
        if (eventslog.length > 0) {
            sep = '\n';
        }

        eventslog = new Date().toLocaleTimeString() + ': ' + message + sep + eventslog;

        this.setState({
            eventslog: eventslog
        });
    }

    getModel() {
        return this.state.model;
    }

    setModel(model) {
        this.setState({ model });
    }

    formDataChaged(form, { key, value }) {
        this.setState({
            data: JSON5.stringify(form.state.data, null, 4)
        });
    }

    handleChange(e, { value }) {
        this.setState({
            data: value
        });
    }

    handleChangeErrors(e, { value }) {
        this.setState({
            errors: value
        });
    }

    handleChangeModel(e, { value }) {
        this.setState({
            model: value
        });
    }

}
