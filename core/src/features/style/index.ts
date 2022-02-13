import {ComponentStore} from "../../stores/ComponentStore";
import {css} from "@emotion/css";
import {useComponentData} from "../../utils/ComponenDataContext";

export function useTransformStyles() {
    const {componentStore} = useComponentData()

    let transformedStyles = "";
    const mergedStyles = [
        ...(componentStore.cssStyles ?? []),
        ...transformStylesToCSS(componentStore.styles)
    ];

    mergedStyles?.forEach(
        ({name, value}) => transformedStyles += styleToString(name, value)
    )

    transformedStyles += componentStore.cssBlock;

    return css`${transformedStyles}`;
}

const styleToString = (name?: string, value?: string) => {
    return (name?.length && value?.length)
        ? `${name}:${value};`
        : "";
}

const transformStylesToCSS = (styles?: Record<string, string>) => {
    if (!styles) return [];
    let CSSStyles: StyleItem[] = [];
    Object.entries(styles).forEach((style) => {
        const definition = StandardStylesDefinitions[style[0]];
        if (!definition) return;

        const value = (typeof definition.measure == "string")
            ? `${style[1]}${definition.measure}`
            : definition.measure(style[1]);
        CSSStyles.push({
            name: definition.cssName,
            value
        })
    })
    return CSSStyles;
}

export function inPX(cssName: string) {
    return {cssName, measure: "px"}
}

export type StandardStyleItem = Record<string, { cssName: string, measure: string | Function }>

export const StandardStylesDefinitions: StandardStyleItem = {
    "Width": inPX("width"),
    "Height": inPX("height"),
    "Left": inPX("margin-left"),
    "Right": inPX("margin-right"),
    "Top": inPX("margin-top"),
    "Bottom": inPX("margin-bottom"),
    "Corner radius": inPX("border-radius"),
    "Rotation": {
        cssName: "transform",
        measure: (val: string) => `rotate(${val}deg)`
    }
}

export type StyleItem = {
    name?: string,
    value?: string
}