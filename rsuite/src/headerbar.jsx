import React from 'react';
import { Button, IconButton, ButtonToolbar, Icon, Toggle, Input, Nav } from 'rsuite';
import { BuilderActions } from 'optimajet-builder-shared';
import Window from './components/window'
import JSON5 from 'json5'
import drawcontrol from './components/drawcontrol'
export default class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settingsActiveTab: "parameters"
        };

        this.onChange = this.onChange.bind(this);
    }

    render() {
        var local = this.props.localization ? this.props.localization : {}; 
               
        return (
            <div className="formbuilder-headerbar">
                <div style={{display: "flex"}}>
                    <a href="/"><img src="/images/logo.svg"/></a>
                    <ButtonToolbar style={{marginLeft: 20}}>
                        <IconButton onClick={this.props.onDownload} icon={<Icon icon="download" />}>{local.download ? local.download : "Download"}</IconButton>
                        <IconButton onClick={this.props.onChooseFileUpload} icon={<Icon icon="upload" />}>{local.upload ? local.upload : "Upload"}</IconButton>
                        <IconButton onClick={this.onSettings.bind(this)} icon={<Icon icon="setting" />}>{local.settings ? local.settings : "Settings"}</IconButton>
                        <IconButton onClick={BuilderActions.undo} icon={<Icon icon="undo" />}>Undo</IconButton>
                        {/* <IconButton onClick={this.onLibrary.bind(this)} icon={<Icon icon="info" />}>{local.library ? local.library : "Library"}</IconButton> */}
                        {!this.props.blockChangeViewerMode && <Toggle checked={this.props.viewerMode} onChange={this.props.onBuilderSwitch} checkedChildren={local.viewer ? local.viewer : "Viewer"} unCheckedChildren={local.builder ? local.builder : "Builder"} />}
                        {this.props.viewerMode && <IconButton onClick={this.props.onPrint} icon={<Icon icon="print" />}>{local.print ? local.print : "Print"}</IconButton>}
                    </ButtonToolbar>
                </div>
                {!this.props.viewerMode && <IconButton onClick={this.props.onClear} style={{ float: "right", marginRight: "15px"}} appearance="ghost" icon={<Icon icon="file-o" />}>{local.clear ? local.clear : "Clear"}</IconButton>}
                <form action="/" method="post" style={{ display: 'none' }}
                      onSubmit={this.props.onUpload}>
                    <input id="builderUploadFile" type="file" onChange={this.props.onChangeFileUpload}/>
                    <input id="builderUploadSubmit" type="submit" />
                </form>
                {this.state.settingsOpen && this.renderSettings()}
            </div>
        );
    }

    renderSettings(){
        let local = this.props.localization ? this.props.localization : {}; 
        let data = this.state.data;
        let fullHeightStyle = { height: "calc(100% - 40px)"};

        let testdata_ps = '{\n    name: "Test",\n    type: 5,\n    valid: true\n}'; 
        let css_ps = '.mystyle {\n    float: right;\n    background-color: #1262E2;\n    color: white;\n    width: 200px;\n}'; 
        let js_ps = '{\n    action1: {\n        alert("action1");\n    }\n    action2: {\n        alert("action2");\n    }\n}'; 
        
        return <Window 
            className="formbuilder-editform-settings"
            onClose={this.onSettings.bind(this)}
            open={true} savePosition={true} name="settings">
            <h2>{local.settings ? local.settings : "Settings"}</h2>

            <div className="formbuilder-editform-form">
                <Nav appearance="subtle" activeKey={this.state.settingsActiveTab} onSelect={this.onSettingsSelect.bind(this)} >               
                    <Nav.Item eventKey="parameters">{local.settings ? local.parameters : "Parameters"}</Nav.Item>
                    <Nav.Item eventKey="defaultvalues">{local.defaultvalues ? local.defaultvalues : "Default Values"}</Nav.Item> 
                    <Nav.Item eventKey="testvalues">{local.testvalues ? local.testvalues : "Test Values"}</Nav.Item>                    
                </Nav>
                {this.state.settingsActiveTab == "parameters" && 
                    this.renderParameters(data, local)
                }
                {this.state.settingsActiveTab == "defaultvalues" && 
                    drawcontrol('textarea', {
                        name: "defaultvalues", 
                        value: data.defaultvalues, 
                        onChange: this.onChange, 
                        placeholder: testdata_ps, 
                        style: fullHeightStyle})
                }
                {this.state.settingsActiveTab == "testvalues" && 
                    drawcontrol('textarea', {
                        name: "testvalues", 
                        value: data.testvalues, 
                        onChange: this.onChange, 
                        placeholder: testdata_ps, 
                        style: fullHeightStyle})
                }
            </div>            
            <div className="formbuilder-editform-buttons">
                <ButtonToolbar>
                    <Button appearance="primary"
                        onClick={this.onSaveSettings.bind(this)}>{local.settings ? local.savebutton : "Save"}</Button>
                    <Button onClick={this.onSettings.bind(this)}>{local.settings ? local.cancelbutton : "Cancel"}</Button>
                </ButtonToolbar>
            </div>
        </Window>;
    }

    onSettingsSelect(activeKey){
        this.setState({
            settingsActiveTab: activeKey
        })
    }

    onChange(e, {name, value}){
        this.state.data[name] = value;
        this.forceUpdate();
    }

    onSettings(){
        if(this.state.settingsOpen){
            this.setState({settingsOpen: false});
        }
        else{
            this.state.data = this.props.builder.getSettings();

            //depricated. it will be removed in the next version
            if(this.state.data.defaultvalues == undefined){
                let tmp = {};
                let model = this.props.builder.getData();
                this.getOldDefaultState({model, data: tmp});
                this.state.data.defaultvalues = JSON5.stringify(tmp, null, 4);
            }
            //depricated - end.
            
            this.setState({settingsOpen: true});
        }
    }

    onSaveSettings(){
        this.props.builder.setSettings(this.state.data);  
        this.setState({settingsOpen: false});
        this.props.builder.forceUpdate();
    }

    //depricated. it will be removed in the next version
    getOldDefaultState({model, data}){
        for(let i=0; i < model.length; i++){
            var key = model[i].propertyName ? model[i].propertyName : model[i].key;
            if(model[i]["defaultValue"] && !data[key]){
                data[key] = model[i]["defaultValue"];
            }

            if(Array.isArray(model[i].children)){
                this.getOldDefaultState({model: model[i].children, data});
            }

            if(model[i].placeholders !== undefined){
                for(let ps in model[i].placeholders){
                    this.getOldDefaultState({model: model[i].placeholders[ps], data});
                }
            }

            if(model[i]["data-buildertype"] === "customblock" && model[i].sourceType === "source" && model[i].source != undefined){
                var children = JSON5.parse(model[i].source);
                this.getOldDefaultState({model: children, data});
            }
        }
    }

    renderParameters(data, local){
        return <div>
            {drawcontrol('checkbox', {name: "pinned", value: data.pinned, label: local.pinned ? local.pinned : "Pinned", onChange: this.onChange })}
        </div>
    }
}