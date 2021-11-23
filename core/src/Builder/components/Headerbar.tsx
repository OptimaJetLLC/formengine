import React from 'react';
import {observer} from "mobx-react";
import styled from '@emotion/styled'
import 'tippy.js/dist/tippy.css';
import {ButtonToolbar, Dropdown, IconButton, SelectPicker} from 'rsuite';
import {FaIcon} from "../../components/Icons";
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
import * as faSitemap from '@fortawesome/free-solid-svg-icons/faSitemap';

import {store} from "../../stores/Store";
import AddButton from "./AddButton";
import upload from "../utils/upload";
import download from "../utils/download";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";

const HeaderBar = observer(() => {

    const fileActions = () => {
        //TODO
        //const {onClear, onPrint} = props;
        //const local = props.localization ? props.localization : {};
        const local: any = {}

        return <Dropdown title="Form">
            <Dropdown.Item onSelect={download} icon={<FileDownloadIcon/>}>
                {local.download ?? "Download"}
            </Dropdown.Item>
            <Dropdown.Item onSelect={upload} icon={<FileUploadIcon/>}>
                {local.upload ?? "Upload"}
            </Dropdown.Item>
            <Dropdown.Item /*onSelect={onPrint}*/ icon={<FaIcon icon={faPrint as unknown as IconDefinition}/>}>
                {local.print ?? "Print"}
            </Dropdown.Item >
            <Dropdown.Item onSelect={() => {
            }} icon={<SettingIcon/>}>
                {local.settings ?? "Settings"}
            </Dropdown.Item>
            <Dropdown.Item /*onSelect={onClear}*/ icon={<FaIcon icon={faTrash as unknown as IconDefinition}/>}>
                {local.clear ?? "Clear"}
            </Dropdown.Item>
        </Dropdown>
    }

    const leftPanel = () => <div className="left panel">
        {/*<IconButton onClick={props.onToggleLeftPanel} style={{marginRight: 20}}*/}
        {/*            icon={<TreeIcon/>} appearance={props.isShowLeftPanel ? "primary" : "subtle"}/>*/}
        <ButtonToolbar>
            <IconButton onClick={() => store.showLeftPanel = !store.showLeftPanel}
                        style={{marginRight: 20}}
                        icon={<FaIcon icon={faSitemap as unknown as IconDefinition}
                                      color={store.showLeftPanel ? "var(--rs-btn-primary-bg)" : "initial"}/>}/>
            {fileActions()}
            <IconButton onClick={_ => {
            }} disabled={true /*TODO !!store.canUndo*/}
                        icon={<FaIcon icon={faUndo as unknown as IconDefinition}/>}>
                Undo
            </IconButton>
            <IconButton onClick={_ => {
            }} disabled={true /*TODO !store.canRedo*/}
                        icon={<FaIcon icon={faRedo as unknown as IconDefinition}/>}/>
            {/* <IconButton onClick={this.onLibrary.bind(this)} icon={<Icon icon="info" />}>{local.library ? local.library : "Library"}</IconButton> */}
        </ButtonToolbar>
    </div>

    const rightPanel = () => {
        return (
            <div className="right panel">
                <ButtonToolbar>
                    {toggleModeButton()}
                    <SelectPicker appearance="subtle" value={undefined /*TODO props.desktopMode*/}
                                  style={{marginLeft: 10}}
                                  data={[{value: "desktop", label: "Desktop"}, {value: "mobile", label: "Mobile"}]}
                                  searchable={false} cleanable={false}
                                  onSelect={undefined /*TODO props.onChangeDesktopMode*/}/>
                    <IconButton onClick={() => store.showRightPanel = !store.showRightPanel}
                                style={{marginLeft: 20}} icon={<MenuIcon
                        fill={store.showRightPanel ? "var(--rs-btn-primary-bg)" : "initial"}/>}/>
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
            icon={<FaIcon icon={icon as unknown as IconDefinition}/>}>
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
  //box-shadow: 0 15px 15px -15px rgb(0 0 0 / 25%);

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