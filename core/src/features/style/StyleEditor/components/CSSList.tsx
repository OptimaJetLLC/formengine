import {useState} from "react";
import _ from "lodash/fp";
import {CompactCell, Row} from "./List";
import {ComponentStore} from "../../../../stores/ComponentStore";

const properties: any = require('known-css-properties').all.map((value: any) => {
    return {label: value, value}
})

export const CSSList = ({componentStore}: { componentStore: ComponentStore }) => {
    //TODO mobx.createViewModel (непонятно как заставить работать с массивами) https://github.com/mobxjs/mobx-utils/issues/209
    const [styles, setStyles] = useState([
        ...(_.cloneDeep(componentStore.cssStyles || [])),
        {}
    ]);

    return <>
        {styles.map((item, index) => {
            const cellProps = {
                rowData: item, rowIndex: index,
                onBlur: () => {
                    if (styles[styles.length - 1].name || styles[styles.length - 1].value) {
                        setStyles([...styles, {}])
                    }
                    componentStore.cssStyles = styles.filter(style => style.name || style.value)
                }
            }
            return (
                <Row key={index}>
                    <CompactCell dataKey={"name"} placeholder={"style"}
                                 options={properties} {...cellProps} />
                    <CompactCell dataKey={"value"} placeholder={"value"} editable={true} {...cellProps} />
                </Row>
            );
        })}
    </>
}

