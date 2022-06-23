import {observer} from 'mobx-react';
import {useStore} from '../../../../utils/contexts/StoreContext';
import {Dropdown} from 'rsuite';
import {FaIcon} from '../../../../features/ui/Icons';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import React from 'react';
import FileDownloadIcon from '@rsuite/icons/FileDownload';
import FileUploadIcon from '@rsuite/icons/FileUpload';
import * as faPrint from '@fortawesome/free-solid-svg-icons/faPrint';
import * as faTrash from '@fortawesome/free-solid-svg-icons/faTrash';
import {useTranslation} from 'react-i18next';
import {LangSwitch} from "../../../../features/localization";

export const Menu = observer(() => {
    const store = useStore()
    const {t} = useTranslation();
    const local: any = {}

    return <Dropdown title={t('leftMenu.menu')} size={"sm"}>
        <Dropdown.Item onSelect={store.download} icon={<FileDownloadIcon/>}>
            {local.download ?? t('leftMenu.download')}
        </Dropdown.Item>
        <Dropdown.Item onSelect={store.upload} icon={<FileUploadIcon/>}>
            {local.upload ?? t('leftMenu.upload')}
        </Dropdown.Item>
        <LangSwitch/>
        <Dropdown.Item /*onSelect={onPrint}*/ icon={<FaIcon icon={faPrint as unknown as IconDefinition}/>}>
            {local.print ?? t('leftMenu.print')}
        </Dropdown.Item>
        <Dropdown.Item onSelect={store.clear} icon={<FaIcon icon={faTrash as unknown as IconDefinition}/>}>
            {local.clear ?? t('leftMenu.clear')}
        </Dropdown.Item>
    </Dropdown>
})

