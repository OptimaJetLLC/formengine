import { Component } from 'react';
import FormBuilderStore from './store.jsx';
import BuilderActions from './actions';
import { isDefined, isUndefined } from './helpers';
import { draw } from './component-render-registry';

export default class EditForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'general',
            key: undefined,
            item: undefined,
            open: false
        };
    }

    setActiveItem = (activeItem) => {
        this.setState({activeItem});
    }

    componentDidMount() {
        FormBuilderStore.listenTo(BuilderActions.changeItem, this.onChangeItem);
        FormBuilderStore.listenTo(BuilderActions.showEditForm, this.onShow);
    }

    componentWillUnmount() {
        FormBuilderStore.stopListeningTo(BuilderActions.changeItem);
        FormBuilderStore.stopListeningTo(BuilderActions.showEditForm);
    }

    onChangeItem = () => {
        this.onShow(this.state.key);
    }

    handleChange(e, { name, value, checked }) {
        let data = this.state.item;
        let initData = Object.assign({}, data);
        if (isUndefined(value)) {
            data[name] = checked;
        }
        else if (typeof value === 'object') {
            for (const key in value)
                data[key] = value[key];
        } else {
            data[name] = value;
        }

        // For Tab and CollectionEditor controls
        // Remove unused placeholders if bounded pane or column was deleted
        if ((data["data-buildertype"] === 'tab' && data.placeholders != null) ||
            (data["data-buildertype"] === 'collectioneditor' && data.placeholders != null)) {

            for (let placeholder in data.placeholders) {
                if (Object.prototype.hasOwnProperty.call(data.placeholders, placeholder)) {
                    let shouldBeDeleted = true;

                    // Condition for Tab-control
                    if (data.panes != null) {
                        data.panes.forEach(pane => {
                            if (placeholder === pane.psid) {
                                shouldBeDeleted = false;
                            }
                        });
                    }

                    //Condition for CollectionEditor-control
                    if (data.columns != null) {
                        data.columns.forEach(column => {
                            if (placeholder === column.key && column.control === 'custom') {
                                shouldBeDeleted = false;
                            }
                        });
                    }

                    if (shouldBeDeleted) {
                        delete data.placeholders[placeholder];
                    }
                }
            }
        }

        this.setState({ item: data });
        this.onSave();
    }

    onShow = (key) => {
        const data = FormBuilderStore.getByKey(key);
        let item = {};
        for (let i in data) {
            if (typeof (data[i]) === 'object') {
                item[i] = JSON.parse(JSON.stringify(data[i]));
            }
            else {
                item[i] = data[i];
            }
        }

        this.setState({
            key: key,
            item: item,
            open: true
        });
    }

    isChangedItem() {
        const data = FormBuilderStore.getByKey(this.state.key);
        const item = this.state.item;

        for (let i in item) {
            if (JSON.stringify(item[i]) !== JSON.stringify(data[i])) {
                if (i === 'events' &&
                    (isUndefined(item[i]) || JSON.stringify(item[i]) === '{}') &&
                    (isUndefined(data[i]) || JSON.stringify(data[i]) === '{}')) {
                    continue;
                }
                else {
                    return true;
                }
            }
        }
        return false;
    }

    getControlsList() {
        return FormBuilderStore.getAllKeys(FormBuilderStore.getData());
    }

    showConfirm(text, confirmHandle) {
        this.setState({ confirm: true, confirmtext: text, confirmHandle: confirmHandle });
    }

    onClose() {
        const ischanged = this.isChangedItem();
        if (ischanged) {
            let msg = 'Close without save?';
            if (isDefined(this.props.localization)) {
                msg = this.props.localization.base.closewithoutsavequestion;
            }

            this.showConfirm(msg, this.onCloseConfirmed.bind(this));
        }
        else {
            this.onCloseConfirmed();
        }
    }

    onSave() {
        FormBuilderStore.updateItemByKey(this.state.key, this.state.item);
        // this.onCloseConfirmed();

        // if (this.state.item['data-buildertype'] === 'gridlayout') {
        //     setTimeout(function () {
        //         if (typeof (Event) === 'function') {
        //             window.dispatchEvent(new Event('resize'));
        //         }
        //         else {
        //             const evt = window.document.createEvent('UIEvents');
        //             evt.initUIEvent('resize', true, false, window, 0);
        //             window.dispatchEvent(evt);
        //         }
        //     }, 100);
        // }

    }

    onCloseConfirmed() {
        this.setState({ open: false, confirm: false });
    }

    render() {
        return draw('edit-form', {
            confirmHandleCancel: () => this.setState({ confirm: false }),
            controls: this.props.controls,
            parent: this,
            props: this.props,
            onClose: this.onClose.bind(this),
            onSave: this.onSave.bind(this),
            state: this.state,
        });
    }
}
