import React from 'react';
import JSON5 from 'json5';
import Split from 'react-split'
import Form from './form';
import { Checkbox, Input, RadioGroup, Radio } from 'rsuite';
import { BaseFormViewer, isNotEmptyString } from 'optimajet-builder-shared';

export default class Viewer extends BaseFormViewer {

    static getDerivedStateFromProps(props, state){
        let res = {};
        if(props.builder){
            res.model = props.builder.getData();
            let settings = props.builder.getSettings(); 
            res.values = settings && settings.testvalues ? settings.testvalues : ""
        };
        
        return res;
    }

    render() {
        let data = {};
        const {isShowControlTree} = this.props;
        let errors = undefined;
        try {
            data = JSON5.parse(this.state.values);
            if (isNotEmptyString(this.state.errors)) {
                errors = JSON5.parse(this.state.errors);
            }
        }
        catch (e) {
        }

        const style = this.props.show ? {} : {display:"none"};
        var local = this.props.localization ? this.props.localization : {}; 

        return (<div style={style} className={("formbuilder-viewer" + (isShowControlTree ? " with-control-tree" : ""))}>
            <Split style={{ display: 'flex' }} sizes={[80, 20]} onDrag={() => this.forceUpdate()}>
                <div>
                    <div className="formbuilder-viewer-form" style={{ overflow: 'auto' }}>                    
                        <Form
                            model={this.state.model}
                            data={data}
                            errors={errors}
                            eventFunc={this.eventFunc.bind(this)}
                            eventErrFunc={this.eventErrProcess.bind(this)}
                            getFormFunc={this.props.getFormFunc}
                            dataChanged={this.formDataChaged.bind(this)}
                            getAdditionalDataForControl={this.getAdditionalDataForControl.bind(this)}
                            downloadUrl={this.props.downloadUrl}
                            uploadUrl={this.props.uploadUrl}
                            externalControlList={this.props.externalControlList}
                            externalControlRender={this.props.externalControlRender}
                            adaptiveViewType={this.state.adaptiveViewType}
                            autoCheckConditions={true}
                            autoValidate={true}
                            ref={(form) => { this.form = form; }}      
                        />
                    </div>
                </div>
                <div className="formbuilder-viewer-info">
                    <div>
                        <RadioGroup inline name="adaptiveViewTypeDesktop" value={this.state.adaptiveViewType}
                            onChange={(value) => {this.setState({ adaptiveViewType: value })}}>
                            <Radio value="desktop">{local.desktop ? local.desktop : "Desktop"}</Radio>
                            <Radio value="mobile">{local.mobile ? local.mobile : "Mobile"}</Radio>
                        </RadioGroup>
                    </div>
                    <h3>{local.values ? local.values : "Values"}</h3>
                    <Input rows={20} onChange={this.handleChange.bind(this)} value={this.state.values} componentClass="textarea"/>
                    <h3>{local.errors ? local.errors : "Errors"}</h3>
                    <Input rows={6} onChange={this.handleChangeErrors.bind(this)}
                            value={this.state.errors} componentClass="textarea"/>
                </div>
            </Split>
            <div className="formbuilder-viewer-footer">
                <h3>{local.events ? local.events : "Events"}</h3>
                <Input rows={5} readOnly={true} value={this.state.eventslog} componentClass="textarea"/>
            </div>
        </div>);
    }

    formDataChaged(form, { key, value }) {
        this.state.values = JSON5.stringify(form.state.data, null, 4);
        this.updateBuilderSettings();
        this.forceUpdate();
    }

    handleChange(value, e) {
        this.state.values = value;
        this.updateBuilderSettings();
        this.forceUpdate();
    }

    updateBuilderSettings(){
        let settings = this.props.builder.getSettings(); 
        settings.testvalues = this.state.values;
        settings.errors = this.state.errors;
        this.props.builder.setSettings(settings); 
    }

    handleChangeErrors(value, e) {
        this.state.errors = value;
        this.updateBuilderSettings();
        this.forceUpdate();
    }

    print(){
        this.form.print();
    }
}