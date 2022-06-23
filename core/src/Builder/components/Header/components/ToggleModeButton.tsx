import {observer} from "mobx-react";
import {useStore} from "../../../../utils/contexts/StoreContext";
import * as faPlay from "@fortawesome/free-solid-svg-icons/faPlay";
import * as faPaintBrush from "@fortawesome/free-solid-svg-icons/faPaintBrush";
import {Button} from "rsuite";
import {FaIcon} from "../../../../features/ui/Icons";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {useTranslation} from 'react-i18next';
import styled from "@emotion/styled";

export const ToggleModeButton = observer(() => {
    const store = useStore();
    const {t} = useTranslation();
    const icon = store.isBuilderMode ? faPlay : faPaintBrush;

    return <IconButton onClick={() => store.isBuilderMode = !store.isBuilderMode}>
        <FaIcon icon={icon as unknown as IconDefinition} color={"var(--rs-btn-primary-bg)"}/>
        {store.isBuilderMode ? t('rightMenu.previewMode') : t('rightMenu.editMode')}
    </IconButton>
})

const IconButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 6px;
  line-height: 14px;
  color: var(--rs-btn-primary-bg);
`
