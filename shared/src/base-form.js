/* eslint-disable eqeqeq */
/* eslint-disable react/no-direct-mutation-state */

import { Component } from 'react';
import Timeout from './timeout';
import Const from './const';
import JSON5 from 'json5';
import { sendRequest } from './data-loader';
import {initDefaultState, validate, checkConditions, updateEventsFormat} from "./formdata"
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'
import { vl, sle } from './license';
import { loadForm } from '../index';
export default class BaseForm extends Component {

    _asyncGetData = null;
    _asyncGetModel = null;

    constructor(props) {
        super(props);
        this.loadForm = loadForm(this.props);
        sle(vl());
        this.state = {
            data: props.data,
            model: props.model,
            extendedData: props.extendedData,
            controlsToReplace: null,
            adaptiveViewType: this.getAdaptiveViewType()
        };
        this.checkLoadedState(this.state.data, this.state.model, true);
        this.abortController = new AbortController();
        this.abortSignal = this.abortController.signal;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const stateDelta = {};

        if (nextProps.adaptiveViewType && prevState.adaptiveViewType !== nextProps.adaptiveViewType) {
            stateDelta.adaptiveViewType = nextProps.adaptiveViewType;
        }

        if (nextProps.modelurl !== undefined && nextProps.modelurl !== '' && nextProps.modelurl !== prevState.modelurl) {
            stateDelta.modelurl = nextProps.modelurl;
            stateDelta.needFetchModel = true;
        }
        //TODO add json equal?
        if (nextProps.model !== undefined && nextProps.model !== prevState.model) {
            stateDelta.controlsToReplace = null;
            stateDelta.model = nextProps.model;
        }

        if (nextProps.dataurl !== undefined && nextProps.dataurl !== '' && nextProps.dataurl !== prevState.dataurl) {
            stateDelta.dataurl = nextProps.dataurl;
            stateDelta.needFetchData = true;
        }
        if (nextProps.data !== undefined) {
            stateDelta.data = nextProps.data;

            if(nextProps.autoCheckConditions && prevState.enableCheckConditions){
                var res = checkConditions({
                    data: stateDelta.data,
                    model: stateDelta.model ? stateDelta.model : prevState.model
                });

                stateDelta.hideControls = res.hideControls;
                stateDelta.readOnlyControls = res.readOnlyControls;
            }

            if(nextProps.autoValidate){
                var res = validate({
                    data: stateDelta.data,
                    model: stateDelta.model ? stateDelta.model : prevState.model
                });

                if(!res.valid){
                    stateDelta.errors = res.errors;
                    if(nextProps.errors){
                        for(var filed in nextProps.errors){
                            stateDelta.errors[filed] = nextProps.errors[filed];
                        }
                    }
                }
                else{
                    stateDelta.errors = undefined;
                }
            }
        }

        if (nextProps.objectId !== prevState.objectId) {
            stateDelta.objectId = nextProps.objectId;
            stateDelta.isLoaded = false;
        }

        return stateDelta;
    }

    createControls() {
        throw new Error('Function createControls must be implemented in ancestor!')
    };

    componentDidMount() {
        this.PrepareState();
    }

    componentDidUpdate(prevProps, prevState) {
        this.PrepareState();
    }

    componentWillUnmount() {
        if (this._asyncGetData || this._asyncGetModel) {
            this.abortController.abort();
        }
    }

    PrepareState() {
        let me = this;
        if (this.state.needFetchModel) {
            me.setState({ needFetchModel: false });
            this._asyncGetModel = sendRequest(
                this.state.modelurl,
                data => {
                    me._asyncGetModel = null;
                    me.modelChanged(data);
                },
                err => {
                    me._asyncGetModel = null;
                    me.handleErrEvent(err);
                },
                this.props.fetchFunc,
                { signal: this.abortSignal },
            );
        }

        if (this.state.needFetchData) {
            me.setState({ needFetchData: false });
            this._asyncGetData = sendRequest(
                this.state.modelurl,
                data => {
                    me._asyncGetData = null;
                    me.dataChanged(data);
                },
                err => {
                    me._asyncGetData = null;
                    me.handleErrEvent(err);
                },
                this.props.fetchFunc,
                { signal: this.abortSignal },
            );
        }

        this.checkConditions(this.state.model);
        this.checkLoadedState(this.state.data, this.state.model);
    }

    modelChanged(model) {
        this.setState({
            model: model,
            controlsToReplace: null
        });

        this.checkConditions(model);
    }

    dataChanged(data) {
        this.setState({
            data: data
        });

        this.checkLoadedState(data, this.state.model);
    }

    checkLoadedState(data, model, blockSetState) {
        // if(this.state.filter !== this.props.filter){
        //     this.state.isLoaded = false;
        // }

        if (!this.state.isLoaded && data !== undefined && data !== null && model !== undefined && model !== null) {
            if (blockSetState) {
                this.state.isLoaded = true;
                //this.state.filter = this.props.filter;
            }
            else {
                this.setState({ isLoaded: true });
                //filter: this.props.filter
            }

            var initialData = {...data};
            initDefaultState({ model, data: initialData });

            this.props.eventFunc({
                key: undefined,
                controlRef: this,
                formName: this.props.formName,
                component: this,
                eventName: 'init',
                actions: ['initSystem', 'init'],
                parameters: {
                    initialData
                }
            });
        }
    }

    //handle event must be arrow function, otherwise 'this' won't work correctly
    handleEvent = ({ e, key, propertyName, eventName, parameters, name, value, additionalValues }) => {
        const me = this;
        const isOnchange = eventName === 'onChange';
        if (isOnchange) {
            if (!this.props.onlyExternalDataChanged) {
                if (this.state.data === undefined) {
                    this.state.data = {};
                }

                var pn = propertyName ? propertyName : key;
                var data = this.state.data;
                data[pn] = value;
                this.setState({ data: data });
            }

            if (this.props.dataChanged !== undefined) {
                this.props.dataChanged(this, { key, propertyName, value, additionalValues });
            }

            this.onConditions(key, eventName, parameters, name, value);
        }

        if (this.props.eventFunc === undefined) {
            return;
        }

        var item = this.findModelItembyKey(key);
        if (item === undefined) {
            return;
        }

        if (item.events !== undefined &&
            item.events[eventName] !== undefined &&
            item.events[eventName].active) {

            item.events = updateEventsFormat(item.events);
            var event = item.events[eventName];

            var eventParameters = { ...parameters };
            if (Array.isArray(event.triggers) && event.triggers.length > 0) {
                event.triggers.forEach(trigger => {
                    if (Array.isArray(trigger.parameters) && trigger.parameters.length > 0) {
                        trigger.parameters.forEach(function (p) {
                            if(p & p.name){
                                if (typeof (p.value) === 'string') {
                                    eventParameters[p.name] = p.value.replace(
                                        Const.regexForReplace,
                                        (m) => me.applySubstitution(m, (parameters ? parameters.row : undefined), me.state.data)
                                    );
                                }
                                else {
                                    eventParameters[p.name] = p.value;
                                }
                            }
                        });
                    }
                    const sourceControl = me.findRefs(key);
                    const sourceControlValue = value;
                    let fireEvent;
                    if (Array.isArray(trigger.targets) && trigger.targets.length > 0) {
                        fireEvent = () => trigger.targets.forEach(function (t) {
                            me.props.eventFunc({
                                key: t,
                                sourceControlRef: sourceControl,
                                sourceControlValue: sourceControlValue,
                                controlRef: me.findRefs(t),
                                formName: me.props.formName,
                                component: me,
                                eventName: eventName,
                                actions: trigger.actions,
                                parameters: eventParameters
                            });
                        });
                    }
                    else {
                        fireEvent = () => me.props.eventFunc({
                            key: key,
                            sourceControlRef: sourceControl,
                            sourceControlValue: sourceControlValue,
                            controlRef: sourceControl,
                            formName: me.props.formName,
                            component: me,
                            eventName: eventName,
                            actions: trigger.actions,
                            parameters: eventParameters
                        });
                    }

                    if (!isOnchange
                        || item.onChangeTimeout === undefined || item.onChangeTimeout === ''
                        || Number(item.onChangeTimeout) < 1) {
                        fireEvent();
                    }
                    else {
                        Timeout.Set(key, fireEvent, Number(item.onChangeTimeout));
                    }
                });
            }

        }
    };

    findRefs(key, targetRefs){
        if(!targetRefs)
            targetRefs = this.refs;

        if(!targetRefs)
            return undefined;

        let control = targetRefs[key];
        if(!control){
            for(let r in targetRefs){
                if(targetRefs[r].refs)
                    control = this.findRefs(key, targetRefs[r].refs);

                if(control)
                    break;
            }
        }
        return control;
    };

    checkConditions(model, child) {
        var enableCheckConditions = false;
        if (Array.isArray(model)) {
            for (var i = 0; i < model.length; i++) {
                if ((model[i]['other-visibleConition'] !== undefined && model[i]['other-visibleConition'] !== '') ||
                    (model[i]['other-readOnlyConition'] !== undefined && model[i]['other-readOnlyConition'] !== '')) {
                    enableCheckConditions = true;
                }
                else if (Array.isArray(model[i].children)) {
                    enableCheckConditions = this.checkConditions(model[i].children, true);
                }
                else if (typeof(model[i].placeholders) == "object") {
                    for (let ph in model[i].placeholders) {
                        enableCheckConditions = this.checkConditions(model[i].placeholders[ph], true);
                    }
                }

                if (enableCheckConditions) {
                    break;
                }
            }
        }

        if (child) {
            return enableCheckConditions;
        }

        this.state.enableCheckConditions = enableCheckConditions;
    }

    onConditions(key, eventName, parameters, name, value) {
        if (this.state.enableCheckConditions) {
            if(this.props.autoCheckConditions && this.state.enableCheckConditions){
                var res = checkConditions({
                    data: this.state.data,
                    model: this.state.model
                });

                this.setState({
                    hideControls: res.hideControls,
                    readOnlyControls: res.readOnlyControls
                });
            }
            else{
                this.props.eventFunc({
                    key: key,
                    controlRef: this.findRefs(key),
                    formName: this.props.formName,
                    component: this,
                    eventName: eventName,
                    actions: ["checkConditions"],
                    parameters: parameters
                });
            }
        }
    }

    handleErrEvent(message) {
        if (this.props.eventErrFunc) {
            this.props.eventErrFunc(this, message);
        }
    }

    findModelItembyKey(key, array) {
        if (array === undefined) {
            array = this.state.model;
        }

        for (var i = 0; i < array.length; i++) {
            if (array[i].key === key) {
                return array[i];
            }

            if (array[i].children !== undefined) {
                const item = this.findModelItembyKey(key, array[i].children);
                if (item !== undefined) {
                    return item;
                }
            }

            if (array[i].placeholders !== undefined) {
                for (let ph in array[i].placeholders) {
                    const item = this.findModelItembyKey(key, array[i].placeholders[ph]);
                    if (item !== undefined) {
                        return item;
                    }
                }
            }

            if (array[i]['data-buildertype'] === 'customblock' && array[i].sourceType === 'source' && array[i].source != undefined) {
                const children = JSON5.parse(array[i].source);
                const item = this.findModelItembyKey(key, children);
                if (item !== undefined) {
                    return item;
                }
            }

            if (array[i]['data-buildertype'] === 'customblock' && array[i].sourceType === 'form' &&
                array[i].formname !== undefined && array[i].formname !== '') {

                const children = array[i].children ? array[i].children : this.loadForm(array[i].formname);

                const item = this.findModelItembyKey(key, children);
                if (item !== undefined) {
                    return item;
                }
            }
        }

        return undefined;
    }

    getAdaptiveViewType() {
        // mobile first
        return 'mobile';
    }

    handleResize() {
        var viewType = this.getAdaptiveViewType();
        if (this.state.adaptiveViewType !== viewType) {
            this.setState({
                adaptiveViewType: viewType
            });
        }
    }

    applySubstitution(m, row, data) {
        let value = m;
        if (row !== undefined && row !== null) {
            if (m.slice(1, 5) == 'row.') {
                value = row[m.slice(5, m.length - 1)];
                if (value === null || value === undefined) {
                    return '';
                }
                else {
                    return value;
                }
            }
        }

        if (data !== undefined && data !== null) {
            value = data[m.slice(1, m.length - 1)];
            if (value === null || value === undefined) {
                return '';
            }
        }

        return value;
    }
}
