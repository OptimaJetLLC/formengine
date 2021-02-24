import React, { Component } from 'react';
import DWKitFormBuilder from './dwkit/builder';
import { isUndefined, lang } from 'optimajet-builder-shared';
import registerDWKitEventListener from './dwkit-event-listener';

export default class FormBuilderDevBuilder extends Component {

    formBuilder;
    actions = [
        { text: 'validate', icon: 'browser' },
        { text: 'refresh', icon: 'browser' },
        { text: 'save', icon: 'browser' },
        { text: 'saveandexit', icon: 'browser' },
        { text: 'cancel', icon: 'browser' },
        { text: 'recalc', icon: 'browser' },
        { text: 'add', icon: 'browser' },
        { text: 'edit', icon: 'browser' },
        { text: 'delete', icon: 'browser' },
        { text: 'gridEdit', icon: 'browser' },
        { text: 'gridDelete', icon: 'browser' },
        { text: 'gridCopy', icon: 'browser' },
        { text: 'gridAdd', icon: 'browser' },
        { text: 'serverAction', icon: 'server' },
        { text: 'actionHandler', icon: 'lightning' },
    ];
    templates = ['contactform', 'toolbarbuttons'];
    localization = lang;

    openViewer = function () {
        this.props.parent.showViewer();
    };

    buttons = [
        { name: 'viewer', className: 'primary', onClick: this.openViewer.bind(this), text: 'Open in Viewer' }
    ];

    getForm(formUrl) {
        const httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', formUrl, false);
        httpRequest.send();
        const text = httpRequest.responseText;
        try {
            return JSON.parse(text);
        }
        catch (e) {
        }
        return null;
    }

    getAdditionalDataForControl(control,
                                { startIndex, pageSize, filters, sort, model },
                                callback) {
        if (control.props['data-buildertype'] === 'dictionary') {
            if (isUndefined(model)) {
                model = 'item';
            }
            let items = [];
            for (let i = 0; i < 3; i++) {
                let obj = {};
                obj.key = model + '_' + i;
                obj.text = model + '_' + i;
                obj.value = i;
                items.push(obj);
            }
            callback({ items });
            return;
        }

        const rowsCount = 5;
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
    }

    componentDidMount() {
        // bug workaround https://github.com/facebook/react/issues/17355        
        setTimeout(() => {
            if(this.props.data){
                this.formBuilder.loadData(this.props.data);
            }
            else{
                this.formBuilder.load('./form-data/application-form.json')
            }
            registerDWKitEventListener(this.formBuilder, this);
        });
    }

    render() {
        var controlProps = {
            actions: this.props.actions ? this.props.actions : this.actions,
            getFormFunc: this.props.getFormFunc ? this.props.getFormFunc : this.getForm,
            getFormList: this.props.getFormList,
            getAdditionalDataForControl: this.props.getAdditionalDataForControl ? this.props.getAdditionalDataForControl : this.getAdditionalDataForControl,
            localization: this.props.localization ? this.props.localization : this.localization,
            templates: this.props.templates ? this.props.templates : this.templates,
            externalControlList: this.props.externalControlList,
            externalControlRender: this.props.externalControlRender,
            externalControlsOnly: this.props.externalControlsOnly
        };

        return (
            <DWKitFormBuilder
                {...controlProps}
                showHeader={this.props.showHeader}
                ref={(builder) => {
                    this.formBuilder = builder;
                }}
                downloadUrl="download.html?file="
                uploadUrl="upload.html?file="
                extraHeaderButtons={this.buttons}
            />
        );
    }

    setCurrentLocalization(localization) {
        this.localization = localization;
        this.forceUpdate();
    }

}
