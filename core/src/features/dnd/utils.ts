import {ComponentStore} from "../../stores/ComponentStore";
import {Store} from "../../stores/Store";


export const isCombineEnabled = (componentStore: ComponentStore, store: Store) => {
    const componentDefinition = store.view.get(componentStore.type);
    return !!componentDefinition.isContainer && !componentStore.children?.length;
}