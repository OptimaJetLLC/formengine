import {observer} from "mobx-react";
import {WeakActionData} from "../../../../types";
import {ChoosenTarget} from "./components/ChoosenTarget";
import {ChoosenAction} from "./components/ChoosenAction";
import {ComponentStore} from "../../../../../../stores/ComponentStore";
import {useSyncActionData} from "../../../hooks/useSyncActionData";
import {ArgumentList} from "./components/ArgumentList";
import { ActionDataProvider } from "./contexts/ActionDataContext";

interface ActionItemProps {
    weakData: WeakActionData,
    componentStore: ComponentStore
    eventName: string
    index: number
}

export const ActionItem = observer(({weakData, componentStore, eventName, index}: ActionItemProps) => {
    const data = useSyncActionData(weakData)

    return (
        <ActionDataProvider value={data}>
            <div style={{
                backgroundColor: "rgb(247, 247, 250)",
                borderRadius: 10, padding: "10px 5px 0"
            }}>
                <ChoosenTarget/>
                <ChoosenAction/>
                <ArgumentList/>
            </div>
        </ActionDataProvider>
    )
})




