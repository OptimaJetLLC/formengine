import _ from "lodash/fp";
import {CompactCell, LabelCell, Row} from "./List";
import {ComponentStore} from "../../../../../stores/ComponentStore";
import {StyleItem} from "../../../../style";

export const inPX = (cssName: string) => ({cssName, measure: "px"});

export type StandardStyleItem = Record<string, { cssName: string, measure: string | Function }>

export default ({
                    componentStore,
                    stylesDefinition
                }: { componentStore: ComponentStore, stylesDefinition: StandardStyleItem }) => {
    //TODO mobx.createViewModel (непонятно как заставить работать с массивами) https://github.com/mobxjs/mobx-utils/issues/209
    const styles = _.cloneDeep(componentStore.styles) || {};

    return <>
        {Object.entries(stylesDefinition).map((item, index) => {
            const cellProps = {
                rowData: styles, rowIndex: index, editable: true,
                onBlur: () => {
                    componentStore.styles = styles;
                    componentStore.cssStyles = [
                        ...(componentStore.cssStyles || []),
                        ...transformStylesToCSS(styles, stylesDefinition)
                    ]
                }
            }
            return (
                <Row key={index}>
                    <LabelCell label={item[0]}/>
                    <CompactCell dataKey={item[0]} placeholder={"default"} {...cellProps} />
                </Row>
            );
        })}
    </>
}

const transformStylesToCSS = (styles: Record<string, string>, stylesDefinition: StandardStyleItem) => {
    if (!Object.entries(styles).length) return [];
    let CSSStyles: StyleItem[] = [];
    Object.entries(styles).forEach((style) => {
        const definition = stylesDefinition[style[0]];
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

