import {observer} from "mobx-react";
import {useStore} from "../../../../utils/StoreContext";
import {ButtonToolbar, IconButton, SelectPicker} from "rsuite";
import {ToggleModeButton} from "./ToggleModeButton";
import MenuIcon from "@rsuite/icons/Menu";
import React from "react";
import { useTranslation } from 'react-i18next';

export const RightPart = observer(() => {
    const store = useStore();
    const { t } = useTranslation();

    return (
        <div className="right panel">
            <ButtonToolbar>
                <ToggleModeButton/>
                <SelectPicker appearance="subtle" value={undefined /*TODO props.desktopMode*/}
                              data={[{value: "desktop", label: t('rightMenu.desktop')},
                                  {value: "mobile", label: t('rightMenu.mobile')}]}
                              searchable={false} cleanable={false} placeholder={t('rightMenu.resolution')}
                              onSelect={undefined /*TODO props.onChangeDesktopMode*/}/>
                <IconButton onClick={() => store.showRightPanel = !store.showRightPanel}
                            icon={<MenuIcon
                                fill={store.showRightPanel ? "var(--rs-btn-primary-bg)" : "initial"}/>}/>
            </ButtonToolbar>
        </div>
    );
})
