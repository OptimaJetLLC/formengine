import React from 'react';
import { BaseFormBuilder, DropzoneContext, EditForm } from 'optimajet-builder-shared';
import Preview from './preview';
import ToolBar from './toolbar';
import HeaderBar from './headerbar';
import controls from './builder/controls-for-builder';
import CustomBlockEditControl from './components/edit-control/custom-block-edit-control';
import Viewer from "./viewer";
import 'rsuite/lib/styles/index.less';

export default class FormBuilder extends BaseFormBuilder {

    constructor(props) {
        super(props);
        this.controls = controls;
        this.state.viewerMode = props.viewerMode == "viewer";

        this.onDownload = this.onDownload.bind(this);
        this.onClear = this.create.bind(this);
        this.onPrint = this.onPrint.bind(this);
        this.onBuilderSwitch = this.onBuilderSwitch.bind(this);
        this.onChooseFileUpload = this.onChooseFileUpload.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.onChangeFileUpload = this.onChangeFileUpload.bind(this);
    }

    onBuilderSwitch(checked, e) {
        this.state.viewerMode = checked;
        this.forceUpdate();
    }

    render() {
        return (<div className="formbuilder-container">
            <DropzoneContext.Provider value={this.state.dropzoneContext}>
                {this.renderBuilder()}
                {this.renderViewer()}
            </DropzoneContext.Provider>
        </div>);
    }

    getCurrentLocalization(){
        return {};
    }

    renderBuilder(){
        const localization = this.getCurrentLocalization();
        const style = this.state.viewerMode ? {display:"none"} : {};

        return <div style={style} className="formbuilder formbuilder-dropzoneactive" onDragOver={this.onDragOver}>
            <div className="formbuilder-content">
                {this.renderHeaderBar()}
                <Preview
                    buildermode={true}
                    getFormFunc={this.props.getFormFunc}
                    getFormFist={this.props.getFormFist}
                    getAdditionalDataForControl={this.props.getAdditionalDataForControl}
                    localization={localization.preview}
                    downloadUrl={this.props.downloadUrl}
                    uploadUrl={this.props.uploadUrl}
                    externalControlRender={this.props.externalControlRender}
                    externalControlList={this.props.externalControlList}
                    controls={this.controls}
                />
                <EditForm actions={this.props.actions} localization={localization.editforms}
                        externalControlList={this.props.externalControlList}
                        controls={this.controls}
                />
            </div>
            <ToolBar localization={localization.toolbar} templates={this.props.templates}
                    externalControlList={this.props.externalControlList}
                    externalControlsOnly={this.props.externalControlsOnly}
                    controls={this.controls} editControl={CustomBlockEditControl}
            />
        </div>;
    }

    renderViewer(){
        const localization = this.getCurrentLocalization();
        return <Viewer
            show={this.state.viewerMode}
            builder={this}
            localization={localization.viewer}
            header={this.renderHeaderBar()}
            getFormFunc={this.props.getFormFunc}
            downloadUrl={this.props.downloadUrl}
            uploadUrl={this.props.uploadUrl}
            externalControlList={this.props.externalControlList}
            externalControlRender={this.props.externalControlRender} 
            
            ref={(viewer) => { this.viewer = viewer; }}
        />;
    }

    renderHeaderBar(){
        if(this.props.showHeader == false){
            return <div></div>;
        }
        const localization = this.getCurrentLocalization();
        return <HeaderBar 
            builder={this}
            viewerMode={this.state.viewerMode}
            blockChangeViewerMode={this.props.blockChangeViewerMode}
            localization={localization.headerbar}
            onDownload={this.onDownload}
            onClear={this.create}
            onPrint={this.onPrint}
            onBuilderSwitch={this.onBuilderSwitch}
            onChooseFileUpload={this.onChooseFileUpload}
            onUpload={this.onUpload}
            onChangeFileUpload={this.onChangeFileUpload}
        />;
    }

    onPrint(){
        if(this.viewer)
            this.viewer.print();
    }    
}
