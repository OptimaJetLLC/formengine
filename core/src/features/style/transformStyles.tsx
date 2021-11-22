import {ComponentStore} from "../../stores/ComponentStore";

const {getPropertyName, getStylesForProperty} = require('css-to-react-native');

export enum StyleItem {
    Name = 0,
    Value = 1
}

export function transformStyles(store: ComponentStore) {
    let transformedStyles = {};
    store.styles.forEach((style) => {
        try {
            const styleName = getPropertyName(style[StyleItem.Name]);
            transformedStyles = {
                ...transformedStyles,
                ...getStylesForProperty(styleName, style[StyleItem.Value])
            };
        } catch (e) {
            console.log(e);
        }
    })

    return transformedStyles
}