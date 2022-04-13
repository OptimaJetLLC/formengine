import {css} from "@emotion/css";
import {useComponentData} from "../../utils/contexts/ComponenDataContext";
import {styleToString, transformStylesToCSS} from "./utils";

export const useStyles = () => {
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