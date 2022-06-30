import {define} from '../../features/annotation/utils/define';
import {Col, Grid as RGrid, Row} from "rsuite";
import {node} from "../../features/annotation";
import {ReactNode} from "react";

interface GridProps {
    child1: ReactNode
    child2: ReactNode
}

//TODO this used for tested inner drop zones
const Grid = (props: GridProps) => {
    // todo implement
    return (
        <RGrid>
            <Row>
                {[].map(() => <Col></Col>)}
                <Col xs={12}>
                    {props.child1}
                </Col>
                <Col xs={12}>
                    {props.child2}
                </Col>
            </Row>
        </RGrid>
    )
}

export const grid = define(Grid)
    .props({
        child1: node,
        child2: node,
    })
