import React from 'react';
import { BaseFormBuilder, DropzoneContext, EditForm } from 'optimajet-builder-shared';
import Preview from './preview';
import ToolBar from './toolbar';
import ControlTree from './control-tree';
import { dispatchWindowResize } from './utils';
import HeaderBar from './headerbar';
import controls from './builder/controls-for-builder';
import CustomBlockEditControl from './components/edit-control/custom-block-edit-control';
import Viewer from './viewer';
import 'rsuite/lib/styles/index.less';
import ToolbarNew from "./toolbar-new";
import extractEditorControls from './builder-util';

export default class FormBuilder extends BaseFormBuilder {

    constructor(props) {
        super(props);
        this._editorControls = extractEditorControls(this.props.builderControls);
        this.controls = controls;
        this.state = {
            ...this.state,
            viewerMode: props.viewerMode == "viewer",
            desktopMode: "desktop",
            showControlTree: true,
            showRightPanel: true,
        };

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
        const { showControlTree, desktopMode } = this.state;
        const viewClassName = "view" + " " + desktopMode;
        const showIf = (condition, child) => <div style={condition ? {} : { display: 'none' }}
                                                  className={viewClassName}>{child}</div>;
        return (<DropzoneContext.Provider value={this.state.dropzoneContext}>
            <div className="formbuilder">
                {this.renderHeaderBar()}
                <div className="formbuilder-content formbuilder-dropzoneactive" style={{ display: 'flex', flex: 1 }}
                     onDragOver={this.onDragOver}>
                    {showControlTree &&
                    <ControlTree show={!this.state.viewerMode} style={{ marginRight: 10, width: 180 }}
                                 onClose={this.toggleLeftPanel}/>}
                    {showIf(!this.state.viewerMode, this.renderBuilder())}
                    {showIf(this.state.viewerMode, this.renderViewer())}
                </div>
            </div>
        </DropzoneContext.Provider>);
    }

    getCurrentLocalization() {
        return {};
    }

    toggleLeftPanel = () => {
        const { showControlTree } = this.state;
        this.setState({ showControlTree: !showControlTree }, () => dispatchWindowResize());
    };

    toggleRightPanel = () => {
        const { showRightPanel } = this.state;
        this.setState({ showRightPanel: !showRightPanel }, () => dispatchWindowResize());
    };

    onChangeDesktopMode = desktopMode => {
        this.setState({ desktopMode }, () => dispatchWindowResize());
    };

    renderBuilder() {
        const localization = this.getCurrentLocalization();
        const editForm = <EditForm actions={this.props.actions} localization={localization.editforms}
                                   externalControlList={this.props.externalControlList}
                                   controls={this.controls}
        />;

        return <>
            <Preview
                buildermode={true} show={!this.state.viewerMode}
                getFormFunc={this.loadForm}
                getFormFist={this.props.getFormFist}
                getAdditionalDataForControl={this.props.getAdditionalDataForControl}
                localization={localization.preview}
                downloadUrl={this.props.downloadUrl}
                uploadUrl={this.props.uploadUrl}
                externalControlRender={this.props.externalControlRender}
                externalControlList={this.props.externalControlList}
                controls={this.controls}
                editorControls={this._editorControls}
            />
            <ToolbarNew localization={localization.toolbar} templates={this.props.templates} editForm={editForm}
                        externalControlList={this.props.externalControlList}
                        style={this.state.showRightPanel ? {} : { display: "none" }}
                        externalControlsOnly={this.props.externalControlsOnly}
                        builderControls={this.props.builderControls} editControl={CustomBlockEditControl}
            />
            {/*todo remove*/}
            {/*   <ToolBar localization={localization.toolbar} templates={this.props.templates} editForm={editForm}*/}
            {/*                externalControlList={this.props.externalControlList} style={this.state.showRightPanel ? {} : {display:"none"}}*/}
            {/*                externalControlsOnly={this.props.externalControlsOnly}*/}
            {/*                controls={this.controls} editControl={CustomBlockEditControl}*/}
            {/*   />*/}
        </>;
    }

    renderViewer() {
        const { downloadUrl, uploadUrl, externalControlList, externalControlRender } = this.props;
        const localization = this.getCurrentLocalization();
        return <Viewer
            show={this.state.viewerMode}
            builder={this}
            localization={localization.viewer}
            getFormFunc={this.loadForm}
            downloadUrl={downloadUrl}
            uploadUrl={uploadUrl}
            externalControlList={externalControlList}
            externalControlRender={externalControlRender}
            isShowControlTree={this.state.showControlTree}
            isShowRightPanel={this.state.showRightPanel}
            ref={(viewer) => {
                this.viewer = viewer;
            }}
        />;
    }

    renderHeaderBar() {
        if (this.props.showHeader == false) {
            return <div></div>;
        }
        const localization = this.getCurrentLocalization();
        return <HeaderBar
            builder={this}
            viewerMode={this.state.viewerMode}
            desktopMode={this.state.desktopMode}
            onChangeDesktopMode={this.onChangeDesktopMode}
            blockChangeViewerMode={this.props.blockChangeViewerMode}
            localization={localization.headerbar}
            onDownload={this.onDownload}
            onClear={this.create}
            onPrint={this.onPrint}
            onBuilderSwitch={this.onBuilderSwitch}
            onChooseFileUpload={this.onChooseFileUpload}
            onUpload={this.onUpload}
            onChangeFileUpload={this.onChangeFileUpload}
            onToggleLeftPanel={this.toggleLeftPanel}
            isShowLeftPanel={this.state.showControlTree}
            onToggleRightPanel={this.toggleRightPanel}
            isShowRightPanel={this.state.showRightPanel}
        />;
    }

    onPrint() {
        if (this.viewer)
            this.viewer.print();
    }
}
