import {ComponentStore} from "../../stores/ComponentStore";
import {mapper} from "../../views";


export const isCombineEnabled = (componentStore: ComponentStore) => {
    const componentDefinition = mapper[componentStore.type];
    return !!componentDefinition.isContainer && !componentStore.children?.length;
}