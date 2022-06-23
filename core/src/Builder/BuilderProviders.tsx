import React, {useMemo} from "react";
import {Store} from "../stores/Store";
import {Localization} from "../features/localization";
import {StoreProvider} from "../utils/contexts/StoreContext";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {CustomDragLayer} from "../features/dnd/components/CustomDragLayer";
import {Styles} from "../styles";


export const BuilderProviders = ({children, view}: any) => {
    const store = useMemo(() => new Store(view), []);
    return (
        <Localization store={store}>
            <StoreProvider value={store}>
                <Styles>
                    <DndProvider backend={HTML5Backend}>
                        {children}
                        <CustomDragLayer/>
                    </DndProvider>
                </Styles>
            </StoreProvider>
        </Localization>
    );
}
