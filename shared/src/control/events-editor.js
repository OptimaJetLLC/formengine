import { Component } from 'react';
import { isDefined, isNotEmptyString, isUndefined } from '../helpers';
import { draw } from '../component-render-registry';

export default class EventsEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        const isOldData = event => !!(event.actions || event.parameters || event.targets);
        this.props.events.forEach(eventName => {
            let event = this.props.data[eventName] || {triggers: []};
            if (isUndefined(event) || isOldData(event) || isUndefined(event.triggers[0])) {
                event = this.props.data[eventName] = {
                    active: event.active || false,
                    triggers: [{
                        actions: event.actions || [],
                        parameters: event.parameters || [{name: '', value: ''}],
                        targets: event.targets|| []}]
                };
                this.handleChange(eventName, {}, {name: 'triggers', checked: event.active || false, value: event.triggers});
            };
        });      

    }

    render() {
        let actionOptions = [];

        if (Array.isArray(this.props.actions)) {
            this.props.actions.forEach(a => {
                if (typeof (a) == 'string') {
                    actionOptions.push({ text: a, value: a });
                }
                else {
                    actionOptions.push({ ...a, value: a.text });
                }
            });
        }

        
        const data = this.props.data;
        const events = this.props.events;        
        let targetOptions = [...this.props.targets];

        events.forEach(function (e) {
            let event;
            if (isDefined(data) && (event = data[e])) 
                if (event.triggers && Array.isArray(event.triggers)) event.triggers.forEach(tr => {
                    if (tr.actions)
                        tr.actions.forEach(a => {
                            let isFind = false;
                            for (let i = 0; i < actionOptions.length; i++) {
                                if (a == actionOptions[i].value) {
                                    isFind = true;
                                    break;
                                }
                            }
        
                            if (!isFind) {
                                actionOptions.push({ text: a, value: a });
                            }
                        });
        
                    if (tr.targets)
                        tr.targets.forEach(a => {
                            let isFind = false;
                            for (let i = 0; i < targetOptions.length; i++) {
                                if (a === targetOptions[i].value) {
                                    isFind = true;
                                    break;
                                }
                            }
        
                            if (!isFind) {
                                targetOptions.push({ text: a, value: a });
                            }
                        });
                });
        });

        return draw('events-editor', {
            actionOptions: [...actionOptions],
            targetOptions: [...targetOptions],
            items: this.items,
            me: this,
            props: this.props,
        });
    }

    initNewTrigger(eventName) {
        let event;
        const data = this.props.data;     
        if (data) {
            if (!data[eventName]) data[eventName] = {};
                event = data[eventName];             
            if (isUndefined(event.triggers)) event.triggers = [];
                event.triggers.push({actions: [], targets: [], parameters: [{name: '', value: ''}]});
            this.handleChange(eventName, {}, {name: 'triggers', checked: event.active || false, value: event.triggers});
        }
    }

    handleChange(eventName, e, { name, value, checked }) {
        let event = this.props.data[eventName];
        if (isUndefined(event)) {
            event = {
                triggers: [],
            };
            this.props.data[eventName] = event;
        }

        if (isUndefined(value) && isDefined(checked)) {
            event[name] = checked;
        }
        else {
            event[name] = value;
        }
        if (isDefined(this.props.onChange)) {
            this.props.onChange(e, { name: this.props.name, value: this.props.data });
        }
    }

    actionsOnAddItem(e, { value }) {
        if (isDefined(this.props.onAdditionActions)) {
            this.props.onAdditionActions(e, { value });
        }
    }
}
