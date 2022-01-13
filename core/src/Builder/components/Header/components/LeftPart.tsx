import {observer} from "mobx-react";
import {useStore} from "../../../../utils/StoreContext";
import {ButtonToolbar, Dropdown, IconButton} from "rsuite";
import {FaIcon} from "../../../../components/UI/Icons";
import * as faSitemap from "@fortawesome/free-solid-svg-icons/faSitemap";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import * as faUndo from "@fortawesome/free-solid-svg-icons/faUndo";
import * as faRedo from "@fortawesome/free-solid-svg-icons/faRedo";
import React from "react";
import FileDownloadIcon from "@rsuite/icons/FileDownload";
import FileUploadIcon from "@rsuite/icons/FileUpload";
import * as faPrint from "@fortawesome/free-solid-svg-icons/faPrint";
import SettingIcon from "@rsuite/icons/Setting";
import * as faTrash from "@fortawesome/free-solid-svg-icons/faTrash";

export const LeftPart = observer(() => {
    const store = useStore()

    return <div className="left panel">
        {/*<IconButton onClick={props.onToggleLeftPanel} style={{marginRight: 20}}*/}
        {/*            icon={<TreeIcon/>} appearance={props.isShowLeftPanel ? "primary" : "subtle"}/>*/}
        <ButtonToolbar>
            <IconButton onClick={() => store.showLeftPanel = !store.showLeftPanel}
                        icon={<FaIcon icon={faSitemap as unknown as IconDefinition}
                                      color={store.showLeftPanel ? "var(--rs-btn-primary-bg)" : "initial"}/>}/>
            <FileActions/>
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
    </div>;
})

const FileActions = observer(() => {
    const store = useStore()
    //TODO
    //const {onClear, onPrint} = props;
    //const local = props.localization ? props.localization : {};
    const local: any = {}

    return <Dropdown title="Form">
        <Dropdown.Item onSelect={store.download} icon={<FileDownloadIcon/>}>
            {local.download ?? "Download"}
        </Dropdown.Item>
        <Dropdown.Item onSelect={store.upload} icon={<FileUploadIcon/>}>
            {local.upload ?? "Upload"}
        </Dropdown.Item>
        <Dropdown.Item /*onSelect={onPrint}*/ icon={<FaIcon icon={faPrint as unknown as IconDefinition}/>}>
            {local.print ?? "Print"}
        </Dropdown.Item >
        <Dropdown.Item onSelect={() => {
        }} icon={<SettingIcon/>}>
            {local.settings ?? "Settings"}
        </Dropdown.Item>
        <Dropdown.Item onSelect={store.clear} icon={<FaIcon icon={faTrash as unknown as IconDefinition}/>}>
            {local.clear ?? "Clear"}
        </Dropdown.Item>
    </Dropdown>
})