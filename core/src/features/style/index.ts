import {ComponentStore} from "../../stores/ComponentStore";
import {css} from "@emotion/css";

export function transformStyles(store: ComponentStore) {
    let transformedStyles = "";

    store.cssStyles?.forEach((style) => {
        if (style.name?.length && style.value?.length) {
            transformedStyles = (transformedStyles + `${style.name}:${style.value};`);
        }
    })

    return css`${transformedStyles}`;
}


export type StyleItem = {
    name?: string,
    value?: string
}