import {PropertyEditorProps} from "../../../types";
import {useState} from "react";
import {Button} from "rsuite";
import {StyleItem} from "../../../../features/style/transformStyles";
import _ from "lodash/fp";
import {CompactCell, Row} from "./components/List";
import {Rows} from "../../../../components/GroupItems";

const properties: any = require('known-css-properties').all.map((value: any) => {
    return {label: value, value}
})

export default ({componentStore}: PropertyEditorProps<Record<string, string>[] | undefined>) => {
    //TODO mobx.createViewModel (непонятно как заставить работать с массивами) https://github.com/mobxjs/mobx-utils/issues/209
    const [styles, setStyles] = useState(_.cloneDeep(componentStore.styles));

    const addStyle = () => setStyles([
        ...styles, ({0: "", 1: ""} as Record<string, string>)
    ])

    return <Rows>
        <div>
            {styles.map((item, index) => {
                const cellProps = {
                    rowData: item, rowIndex: index,
                    onBlur: () => componentStore.styles = styles
                }
                return (
                    <Row key={index}>
                        <CompactCell dataKey={StyleItem.Name} placeholder={"styleName"}
                                     options={properties} {...cellProps} />
                        <CompactCell dataKey={StyleItem.Value} placeholder={"value"} {...cellProps} />
                    </Row>
                );
            })}
        </div>
        <Button size={"xs"} style={{margin: "0 4px"}} onClick={addStyle}>
            <h6 style={{marginTop: -5}}>+</h6>
        </Button>
    </Rows>;
}

