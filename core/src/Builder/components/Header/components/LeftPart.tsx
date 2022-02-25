import { observer } from 'mobx-react';
import { useStore } from '../../../../utils/contexts/StoreContext';
import { ButtonToolbar, Dropdown, IconButton } from 'rsuite';
import { FaIcon } from '../../../../components/UI/Icons';
import * as faSitemap from '@fortawesome/free-solid-svg-icons/faSitemap';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import * as faUndo from '@fortawesome/free-solid-svg-icons/faUndo';
import * as faRedo from '@fortawesome/free-solid-svg-icons/faRedo';
import React from 'react';
import FileDownloadIcon from '@rsuite/icons/FileDownload';
import FileUploadIcon from '@rsuite/icons/FileUpload';
import * as faPrint from '@fortawesome/free-solid-svg-icons/faPrint';
import SettingIcon from '@rsuite/icons/Setting';
import * as faTrash from '@fortawesome/free-solid-svg-icons/faTrash';
import { useTranslation } from 'react-i18next';
import {LangSwitch} from "../../../../features/localization";

export const LeftPart = observer(() => {
    const store = useStore();
    const { t } = useTranslation();

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
                {t('leftMenu.undo')}
            </IconButton>
            <IconButton onClick={_ => {
            }} disabled={true /*TODO !store.canRedo*/}
                        icon={<FaIcon icon={faRedo as unknown as IconDefinition}/>}/>
            {/* <IconButton onClick={this.onLibrary.bind(this)} icon={<Icon icon="info" />}>{local.library ? local.library : "Library"}</IconButton> */}
            <LangSwitch/>
        </ButtonToolbar>
    </div>;
})

const FileActions = observer(() => {
    const store = useStore()
    const { t } = useTranslation();
    //TODO
    //const {onClear, onPrint} = props;
    //const local = props.localization ? props.localization : {};
    const local: any = {}

    return <Dropdown title={t('leftMenu.formMenu')}>
        <Dropdown.Item onSelect={store.download} icon={<FileDownloadIcon/>}>
            {local.download ?? t('leftMenu.download')}
        </Dropdown.Item>
        <Dropdown.Item onSelect={store.upload} icon={<FileUploadIcon/>}>
            {local.upload ?? t('leftMenu.upload')}
        </Dropdown.Item>
        <Dropdown.Item /*onSelect={onPrint}*/ icon={<FaIcon icon={faPrint as unknown as IconDefinition}/>}>
            {local.print ?? t('leftMenu.print')}
        </Dropdown.Item >
        <Dropdown.Item onSelect={() => {
        }} icon={<SettingIcon/>}>
            {local.settings ?? t('leftMenu.settings')}
        </Dropdown.Item>
        <Dropdown.Item onSelect={store.clear} icon={<FaIcon icon={faTrash as unknown as IconDefinition}/>}>
            {local.clear ?? t('leftMenu.clear')}
        </Dropdown.Item>
    </Dropdown>
})

