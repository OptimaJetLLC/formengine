import {PropertyEditorProps} from "../../types";
import {useState} from "react";
import {StyleItem} from "../../../style";
import _ from "lodash/fp";
import {CompactCell, Row} from "./components/List";
import {Rows} from "../../../../components/GroupItems";

const properties: any = require('known-css-properties').all.map((value: any) => {
    return {label: value, value}
})

const BlankStyle = () => ({
    name: "",
    value: ""
} as StyleItem);

export default ({componentStore}: PropertyEditorProps<Record<string, string>[] | undefined>) => {
    //TODO mobx.createViewModel (непонятно как заставить работать с массивами) https://github.com/mobxjs/mobx-utils/issues/209
    const [styles, setStyles] = useState(_.cloneDeep(componentStore.styles) || [BlankStyle()]);

    const addStyle = () => {
        setStyles([...styles, {}])
    }

    return <Rows>
        {/*<div>*/}
        {/*    /!*{styles.map((item, index) => {*!/*/}
        {/*    /!*    const cellProps = {*!/*/}
        {/*    /!*        rowData: item, rowIndex: index,*!/*/}
        {/*    /!*        onBlur: () => {*!/*/}
        {/*    /!*            if (styles[styles.length - 1].name || styles[styles.length - 1].value) {*!/*/}
        {/*    /!*                addStyle()*!/*/}
        {/*    /!*            }*!/*/}
        {/*    /!*            componentStore.styles = styles*!/*/}
        {/*    /!*        }*!/*/}
        {/*    /!*    }*!/*/}
        {/*    /!*    return (*!/*/}
        {/*    /!*        <Row key={index}>*!/*/}
        {/*    /!*            <CompactCell dataKey={"name"} placeholder={"style"}*!/*/}
        {/*    /!*                         options={properties} {...cellProps} />*!/*/}
        {/*    /!*            <CompactCell dataKey={"value"} placeholder={"value"} {...cellProps} />*!/*/}
        {/*    /!*        </Row>*!/*/}
        {/*    /!*    );*!/*/}
        {/*    /!*})}*!/*/}
        {/*</div>*/}
        <div>
            <h6>CSS styles</h6>
            {styles.map((item, index) => {
                const cellProps = {
                    rowData: item, rowIndex: index,
                    onBlur: () => {
                        if (styles[styles.length - 1].name || styles[styles.length - 1].value) {
                            addStyle()
                        }
                        componentStore.styles = styles.filter(style => style.name || style.value)
                    }
                }
                return (
                    <Row key={index}>
                        <CompactCell dataKey={"name"} placeholder={"style"}
                                     options={properties} {...cellProps} />
                        <CompactCell dataKey={"value"} placeholder={"value"} {...cellProps} />
                    </Row>
                );
            })}
        </div>
    </Rows>;
}

