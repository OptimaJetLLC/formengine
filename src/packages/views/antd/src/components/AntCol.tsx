import {define, node, number, string} from '@react-form-builder/core'
import {Col} from 'antd'

export const antCol = define(Col, 'AntCol')
  .kind('container')
  .props({
    children: node,
    flex: string,
    offset: number.default(0),
    order: number.default(0),
    pull: number.default(0),
    push: number.default(0),
    span: number,
    xs: number,
    sm: number,
    md: number,
    lg: number,
    xl: number,
    xxl: number,
  })
