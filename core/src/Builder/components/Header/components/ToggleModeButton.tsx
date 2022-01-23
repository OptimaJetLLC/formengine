import {observer} from "mobx-react";
import {useStore} from "../../../../utils/StoreContext";
import * as faPlay from "@fortawesome/free-solid-svg-icons/faPlay";
import * as faPaintBrush from "@fortawesome/free-solid-svg-icons/faPaintBrush";
import {IconButton} from "rsuite";
import {FaIcon} from "../../../../components/UI/Icons";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import { useTranslation } from 'react-i18next';

export const ToggleModeButton = observer(() => {
    const store = useStore();
    const { t } = useTranslation();
    const icon = store.isBuilderMode ? faPlay : faPaintBrush;

    return <IconButton
        onClick={() => store.isBuilderMode = !store.isBuilderMode}
        appearance={"primary"}
        icon={<FaIcon icon={icon as unknown as IconDefinition}/>}>
        {store.isBuilderMode ? t('rightMenu.previewMode') : t('rightMenu.editMode')}
    </IconButton>
})
