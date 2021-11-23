import {ComponentStore} from "../../stores/ComponentStore";
import styled from "@emotion/styled";
import {FunctionComponent} from "react";

export const makeStyled = (store: ComponentStore, view: FunctionComponent) => {
    if (!store.styles) return view;

    const transformedStyles = transformStyles(store);
    return styled(view)`${transformedStyles}`
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
