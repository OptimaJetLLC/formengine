import {ComponentStore} from "../../stores/ComponentStore";
import {ComponentDefinition} from "../annotation/types";
import styled from "@emotion/styled";

export const makeStyled = (store: ComponentStore, definition: ComponentDefinition<any>) => {
    const transformedStyles = transformStyles(store);
    return styled(definition.view)`${transformedStyles}`
}

function transformStyles(store: ComponentStore) {
    let transformedStyles = "";

    store.styles?.forEach((style) => {
        if (style.name?.length && style.value?.length) {
            transformedStyles = (transformedStyles + `${style.name}:${style.value};`);
        }
    })

    return transformedStyles
}
