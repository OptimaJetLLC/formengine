import {observer} from "mobx-react";
import {useStore} from "../../../../utils/StoreContext";
import {ButtonToolbar, IconButton, SelectPicker} from "rsuite";
import {ToggleModeButton} from "./ToggleModeButton";
import MenuIcon from "@rsuite/icons/Menu";
import React from "react";

export const RightPart = observer(() => {
    const store = useStore()

    return (
        <div className="right panel">
            <ButtonToolbar>
                <ToggleModeButton/>
                <SelectPicker appearance="subtle" value={undefined /*TODO props.desktopMode*/}
                              data={[{value: "desktop", label: "Desktop"}, {value: "mobile", label: "Mobile"}]}
                              searchable={false} cleanable={false}
                              onSelect={undefined /*TODO props.onChangeDesktopMode*/}/>
                <IconButton onClick={() => store.showRightPanel = !store.showRightPanel}
                            icon={<MenuIcon
                                fill={store.showRightPanel ? "var(--rs-btn-primary-bg)" : "initial"}/>}/>
            </ButtonToolbar>
        </div>
    );
})