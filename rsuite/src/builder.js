import React from 'react';
import { Button, Icon, IconButton } from 'rsuite';
import { BaseFormBuilder, DropzoneContext, EditForm } from 'optimajet-builder-shared';
import Split from 'react-split'
import Preview from './preview';
import ToolBar from './toolbar';
import ControlTree from './control-tree';
import {dispatchWindowResize} from './utils';
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
        this.state.showControlTree = true;
        this.state.splitSizes = [77, 23];

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

    toggleControlTree = () => {
        const {showControlTree} = this.state;
        this.setState({showControlTree: !showControlTree}, () => dispatchWindowResize());
    }

    onDragSplit = (splitSizes) => {
        this.setState({splitSizes})
        this.forceUpdate()
    }

    renderBuilder(){
        const {showControlTree, splitSizes} = this.state;
        const localization = this.getCurrentLocalization();
        const style = this.state.viewerMode ? {display:"none"} : {};
        const editForm = <EditForm actions={this.props.actions} localization={localization.editforms}
                externalControlList={this.props.externalControlList}
                controls={this.controls}
        />

        return <div>
            {this.renderHeaderBar()}     
            <div style={style} className="formbuilder">                
                <Split style={{ display: 'flex', flex: 1 }}  sizes={splitSizes}  onDrag={this.onDragSplit}>
                    <div style={{ display: 'flex'}}>
                    {showControlTree && <ControlTree style={{ marginRight: 10, width: 180 }} onClose={this.toggleControlTree}/>}
                    <div className="formbuilder-content formbuilder-dropzoneactive" onDragOver={this.onDragOver}>
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
                    </div>
                    </div>
                    <div style={{ display: 'flex', flex: 1}}>
                        
                        <ToolBar localization={localization.toolbar} templates={this.props.templates} editForm={editForm}
                            externalControlList={this.props.externalControlList}
                            externalControlsOnly={this.props.externalControlsOnly}
                            controls={this.controls} editControl={CustomBlockEditControl} />    
                    </div>            
                </Split>            
            </div>
        </div>;
    }

    renderViewer(){
        const { getFormFunc, downloadUrl, uploadUrl, externalControlList, externalControlRender } = this.props;
        const localization = this.getCurrentLocalization();
        return <Viewer
            show={this.state.viewerMode}
            builder={this} splitSizes={this.state.splitSizes} onDrag={this.onDragSplit}
            localization={localization.viewer}
            getFormFunc={getFormFunc}
            downloadUrl={downloadUrl}
            uploadUrl={uploadUrl}
            externalControlList={externalControlList}
            externalControlRender={externalControlRender} 
            isShowControlTree={this.state.showControlTree}            
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
            onToggleControlTree={this.toggleControlTree}
            isShowControlTree={this.state.showControlTree}
        />;
    }

    onPrint(){
        if(this.viewer)
            this.viewer.print();
    }    
}
