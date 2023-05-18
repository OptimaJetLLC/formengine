import {define, node} from '@react-form-builder/builder/view'
import {ReactNode} from 'react'
import {Col, Grid, Row} from 'rsuite'

interface RsGridProps {
  child1: ReactNode
  child2: ReactNode
}

//TODO this used for tested inner drop zones
const RsGrid = (props: RsGridProps) => {
  // todo implement
  return (
    <Grid>
      <Row>
        {[].map(() => <Col></Col>)}
        <Col xs={12}>
          {props.child1}
        </Col>
        <Col xs={12}>
          {props.child2}
        </Col>
      </Row>
    </Grid>
  )
}

export const rsGrid = define(RsGrid)
  .type('RsGrid')
  .props({
    child1: node,
    child2: node,
  })
