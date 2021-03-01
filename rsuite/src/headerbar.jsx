import React from 'react';
import { Button, IconButton, ButtonToolbar, Icon, Toggle, Input, Nav } from 'rsuite';
import Window from './components/window'

export default class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settingsActiveTab: "defaultvalues"
        };
    }

    render() {
        var local = this.props.localization ? this.props.localization : {}; 
               
        return (
            <div className="formbuilder-headerbar">
                <ButtonToolbar>
                    <IconButton onClick={this.props.onDownload} icon={<Icon icon="download" />}>{local.download ? local.download : "Download"}</IconButton>
                    <IconButton onClick={this.props.onChooseFileUpload} icon={<Icon icon="upload" />}>{local.upload ? local.upload : "Upload"}</IconButton>
                    <IconButton onClick={this.onSettings.bind(this)} icon={<Icon icon="setting" />}>{local.settings ? local.settings : "Settings"}</IconButton>
                    {/* <IconButton onClick={this.onLibrary.bind(this)} icon={<Icon icon="info" />}>{local.library ? local.library : "Library"}</IconButton> */}
                    <Toggle checked={this.props.viewerMode} onChange={this.props.onBuilderSwitch} checkedChildren={local.viewer ? local.viewer : "Viewer"} unCheckedChildren={local.builder ? local.builder : "Builder"} />
                    {this.props.viewerMode && <IconButton onClick={this.props.onPrint} icon={<Icon icon="print" />}>{local.print ? local.print : "Print"}</IconButton>}
                    {!this.props.viewerMode && <IconButton onClick={this.props.onClear} style={{ float: "right", marginRight: "15px"}} icon={<Icon icon="file-o" />}>{local.clear ? local.clear : "Clear"}</IconButton>}
                </ButtonToolbar>
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
                    {/*<Nav.Item eventKey="parameters">{local.parameters ? local.parameters : "Parameters"}</Nav.Item>*/}
                    <Nav.Item eventKey="defaultvalues">{local.defaultvalues ? local.defaultvalues : "Default Values"}</Nav.Item> 
                    <Nav.Item eventKey="testvalues">{local.testvalues ? local.testvalues : "Test Values"}</Nav.Item>
                    {/* <Nav.Item eventKey="css">{local.css ? local.css : "CSS"}</Nav.Item>
                    <Nav.Item eventKey="javascript">{local.javascript ? local.javascript : "JavaScript"}</Nav.Item> */}
                </Nav>
                {this.state.settingsActiveTab == "parameters" && 
                    <Input style={fullHeightStyle} name="parameters" value={data.parameters} onChange={this.onChange.bind(this, "parameters")} componentClass="textarea" placeholder={testdata_ps} />
                }
                {this.state.settingsActiveTab == "defaultvalues" && 
                    <Input style={fullHeightStyle} name="defaultvalues" value={data.defaultvalues} onChange={this.onChange.bind(this, "defaultvalues")} componentClass="textarea" placeholder={testdata_ps} />
                }
                {this.state.settingsActiveTab == "testvalues" && 
                    <Input style={fullHeightStyle} name="testvalues" value={data.testvalues} onChange={this.onChange.bind(this, "testvalues")} componentClass="textarea" placeholder={testdata_ps} />
                }
                {this.state.settingsActiveTab == "css" && 
                    <Input style={fullHeightStyle} name="css" value={data.css} onChange={this.onChange.bind(this, "css")} componentClass="textarea" placeholder={css_ps} />
                }
                {this.state.settingsActiveTab == "javascript" && 
                    <Input style={fullHeightStyle} name="javascript" value={data.javascript} onChange={this.onChange.bind(this, "javascript")} componentClass="textarea" placeholder={js_ps} />
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

    onChange(name, value){
        this.state.data[name] = value;
        this.forceUpdate();
    }

    onSettings(){
        if(this.state.settingsOpen){
            this.setState({settingsOpen: false});
        }
        else{
            this.state.data = this.props.builder.getSettings();            
            this.setState({settingsOpen: true});
        }
    }

    onSaveSettings(){
        this.props.builder.setSettings(this.state.data);  
        this.setState({settingsOpen: false});
        this.props.builder.forceUpdate();
    }
}