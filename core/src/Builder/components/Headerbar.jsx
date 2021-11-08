import React from 'react';
import {observer} from "mobx-react";
import styled from '@emotion/styled'
import 'tippy.js/dist/tippy.css';
import {ButtonToolbar, Dropdown, IconButton, SelectPicker} from 'rsuite';
import FaSvgIcon from "../../components/FaSvgIcon";

import {Icon} from '@rsuite/icons';
import MenuIcon from '@rsuite/icons/Menu';
import FileDownloadIcon from '@rsuite/icons/FileDownload';
import FileUploadIcon from '@rsuite/icons/FileUpload';
import SettingIcon from '@rsuite/icons/Setting';
import * as faPaintBrush from '@fortawesome/free-solid-svg-icons/faPaintBrush';
import * as faPlay from '@fortawesome/free-solid-svg-icons/faPlay';
import * as faPrint from '@fortawesome/free-solid-svg-icons/faPrint';
import * as faTrash from '@fortawesome/free-solid-svg-icons/faTrash';
import * as faUndo from '@fortawesome/free-solid-svg-icons/faUndo';
import * as faRedo from '@fortawesome/free-solid-svg-icons/faRedo';

import {store} from "../../stores/Store";
import AddButton from "./AddButton";
import upload from "../utils/upload";
import download from "../utils/download";

const HeaderBar = observer((props = {}) => {

    const fileActions = () => {
        const {
            onClear,
            onPrint
        } = props;
        const local = props.localization ? props.localization : {};

        return <Dropdown appearance="default" title="Form">
            <Dropdown.Item onSelect={download} icon={<FileDownloadIcon/>}>
                {local.download ?? "Download"}
            </Dropdown.Item>
            <Dropdown.Item onSelect={upload} icon={<FileUploadIcon/>}>
                {local.upload ?? "Upload"}
            </Dropdown.Item>
            <Dropdown.Item onSelect={onPrint} icon={<Icon as={FaSvgIcon} faIcon={faPrint}/>}>
                {local.print ?? "Print"}
            </Dropdown.Item>
            <Dropdown.Item onSelect={() => {
            }} icon={<SettingIcon/>}>
                {local.settings ?? "Settings"}
            </Dropdown.Item>
            <Dropdown.Item onSelect={onClear} icon={<Icon as={FaSvgIcon} faIcon={faTrash}/>}>
                {local.clear ?? "Clear"}
            </Dropdown.Item>
        </Dropdown>
    }

    const leftPanel = () => <div className="left panel">
        {/*<IconButton onClick={props.onToggleLeftPanel} style={{marginRight: 20}}*/}
        {/*            icon={<TreeIcon/>} appearance={props.isShowLeftPanel ? "primary" : "subtle"}/>*/}
        <ButtonToolbar>
            {fileActions()}
            <IconButton onClick={_ => {
            }} disabled={!!store.canUndo}
                        icon={<Icon as={FaSvgIcon} faIcon={faUndo}/>}>
                Undo
            </IconButton>
            <IconButton onClick={_ => {
            }} disabled={!store.canRedo} size="xs"
                        icon={<Icon as={FaSvgIcon} faIcon={faRedo}/>}/>
            {/* <IconButton onClick={this.onLibrary.bind(this)} icon={<Icon icon="info" />}>{local.library ? local.library : "Library"}</IconButton> */}
        </ButtonToolbar>
    </div>

    const rightPanel = () => {
        return (
            <div className="right panel">
                <ButtonToolbar>
                    {toggleModeButton()}
                    <SelectPicker appearance="subtle" value={props.desktopMode} style={{marginLeft: 10}}
                                  data={[{value: "desktop", label: "Desktop"}, {value: "mobile", label: "Mobile"}]}
                                  searchable={false} cleanable={false} onSelect={props.onChangeDesktopMode}/>
                    <IconButton onClick={props.onToggleRightPanel} style={{marginLeft: 20}}
                                icon={<MenuIcon size="lg"/>}
                                appearance={props.isShowRightPanel ? "primary" : "subtle"}/>
                </ButtonToolbar>
            </div>
        );
    }

    const toggleModeButton = () => {
        const onClick = () => {
            store.toggleBuilderMode();
        }
        const icon = store.isBuilderMode ? faPlay : faPaintBrush;
        return <IconButton
            onClick={onClick}
            appearance={"primary"}
            icon={<Icon as={FaSvgIcon} faIcon={icon}/>}>
            {store.isBuilderMode ? "Preview" : "Edit"}
        </IconButton>;
    }

    return (
        <Container>
            {leftPanel()}
            <div className="center">
                <StyledAddButton/>
            </div>
            {rightPanel()}
        </Container>
    );
});

const StyledAddButton = styled(AddButton)`
  position: absolute;
  transform: translateX(-18px);
`

const Container = styled.div`
  display: flex;
  flex: 1;
  box-shadow: 0 15px 15px -15px rgb(0 0 0 / 25%);

  & > * {
    display: flex;
    padding: 10px;
  }

  & .right.panel {
    justify-content: flex-end;
  }

  & .center {
    flex: 1;
    justify-content: center;
    display: flex;
  }
`

export default HeaderBar;