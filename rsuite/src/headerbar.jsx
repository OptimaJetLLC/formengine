import React from 'react';
import { Button, ButtonGroup, IconButton, ButtonToolbar, Icon, Dropdown, SelectPicker , Nav } from 'rsuite';
import { BuilderActions, FormBuilderStore } from 'optimajet-builder-shared';
import Window from './components/window'
import JSON5 from 'json5'
import drawcontrol from './components/drawcontrol'
export default class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settingsActiveTab: "parameters",
            canUndo: false,
            canRedo: false
        };

        this.onChange = this.onChange.bind(this);
        FormBuilderStore.listenTo(BuilderActions.dataChanged, () => {
            this.setState({
                canUndo: FormBuilderStore.canUndo(),
                canRedo: FormBuilderStore.canRedo()
            })
        });
    }

    toggleModeButtons = () => {
        const {viewerMode, onBuilderSwitch} = this.props;
        return <ButtonGroup style={{flex: 1, display: "flex", justifyContent: "center"}}>
            <Button
                onClick={_=>onBuilderSwitch(!viewerMode)}
                appearance={!viewerMode ? "primary" : "ghost"}>
                Builder
            </Button>
            <Button
                onClick={_=>onBuilderSwitch(!viewerMode)}
                appearance={viewerMode ? "primary" : "ghost"}>
                Viewer
            </Button>
        </ButtonGroup>;
    }

    fileActions = () => {
        const {
            onDownload,
            onChooseFileUpload,
            onClear,
            onPrint
        } = this.props;
        var local = this.props.localization ? this.props.localization : {}; 

        return <Dropdown appearance="default" title="Form">
            <Dropdown.Item onSelect={onDownload} icon={<Icon icon="download" />}>
                {local.download ?? "Download"}
            </Dropdown.Item>
            <Dropdown.Item onSelect={onChooseFileUpload} icon={<Icon icon="upload" />}>
                {local.upload ?? "Upload"}
            </Dropdown.Item>
            <Dropdown.Item onSelect={onPrint} icon={<Icon icon="print" />}>
                {local.print ?? "Print"}
            </Dropdown.Item>
            <Dropdown.Item onSelect={this.onSettings} icon={<Icon icon="setting" />}>
                {local.settings ?? "Settings"}
            </Dropdown.Item>
            <Dropdown.Item onSelect={onClear} icon={<Icon icon="file-o" />}>
                {local.clear ?? "Clear"}
            </Dropdown.Item>
        </Dropdown>
    }

    render() {
        const { canUndo, canRedo } = this.state;
        var local = this.props.localization ? this.props.localization : {}; 
        const {
            viewerMode,
            blockChangeViewerMode,
            isShowLeftPanel,
            isShowRightPanel,
            onToggleLeftPanel,
            onToggleRightPanel,
            onChangeDesktopMode,
            desktopMode
        } = this.props;
               
        return (
            <div className="formbuilder-headerbar" style={{display: "flex"}}>
            <div className="left panel" >            
                <IconButton onClick={onToggleLeftPanel} 
                        className="formbuilder-left-panel-button"
                        icon={<Icon icon="sitemap" size="lg"/>}
                        appearance={isShowLeftPanel ? "primary" : "subtle"}/>  
            </div>            
            <div className="toolbar">
                <div className="left">
                    <ButtonToolbar>
                        {this.fileActions()}
                        <IconButton onClick={BuilderActions.undo} disabled={!canUndo} icon={<Icon icon="undo" />}>Undo</IconButton>
                        <IconButton onClick={BuilderActions.redo} disabled={!canRedo} icon={<Icon icon="repeat" />}>Redo</IconButton>
                        {/* <IconButton onClick={this.onLibrary.bind(this)} icon={<Icon icon="info" />}>{local.library ? local.library : "Library"}</IconButton> */}
                    </ButtonToolbar>
                </div>            
                <div className="center">
                    {!blockChangeViewerMode && this.toggleModeButtons()}                    
                    <SelectPicker className={"desktop-mode-select"} appearance="subtle" value={desktopMode} data={[{value: "desktop", label: "Desktop"}, {value: "mobile", label: "Mobile"}]} 
                        searchable={false} cleanable={false} onSelect={onChangeDesktopMode}/>
                </div>            
                <div className="right"></div>
                <form action="/" method="post" style={{ display: 'none' }}
                    onSubmit={this.props.onUpload}>
                    <input id="builderUploadFile" type="file" onChange={this.props.onChangeFileUpload}/>
                    <input id="builderUploadSubmit" type="submit" />
                </form>
                {this.state.settingsOpen && this.renderSettings()}
            </div>
            <div className="right panel">
                <IconButton onClick={onToggleRightPanel} 
                        className="formbuilder-right-panel-button"
                        icon={<Icon icon="bars" size="lg"/>}
                        appearance={isShowRightPanel ? "primary" : "subtle"}/>  
            </div>   
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

    onSettings = () => {
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