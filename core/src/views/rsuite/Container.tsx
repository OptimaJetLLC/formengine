import {define} from "../../features/annotation/define";
import {node} from "../../features/annotation";
import {forwardRef} from "react";
import {AnnotationBuilder} from "../../features/annotation/AnnotationBuilder";
import {WithRadioButton} from "../../features/annotation/inputs/RadioButton";
import ColumnsIcon from '@rsuite/icons/Columns';

type Direction = "vertical" | "horizontal";

const Container = forwardRef((props: any, ref: any) => {
    const {direction, ...filteredProps} = props;
    return <div {...filteredProps} ref={ref} style={{
        display: "flex",
        flex: 1,
        flexDirection: direction === "vertical" ? "column" : "row"
    }}/>
});

//TODO property what say it is a container and can have children. Create smth like reactnode property?
export const container = define("Container", Container, {
    children: node,
    direction: new AnnotationBuilder<Direction>({
        component: WithRadioButton([
            {value: 'vertical', icon: <ColumnsIcon rotate={90}/>},
            {value: 'horizontal', icon: <ColumnsIcon/>},
        ])
    }).isRequired("vertical"),
}, undefined)

