import {boolean, define, node, number, oneOf} from '@react-form-builder/core'
import {Row} from 'antd'

export const antRow = define(Row, 'AntRow')
  .kind('container')
  .props({
    children: node,
    align: oneOf('top', 'middle', 'bottom', 'stretch').default('top'),
    gutter: number.default(0),
    justify: oneOf('start', 'end', 'center', 'space-around', 'space-between', 'space-evenly'),
    wrap: boolean.default(true),
  })
