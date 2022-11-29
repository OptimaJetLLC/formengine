import styled from '@emotion/styled'
import autosize from 'autosize'
import {Component} from 'react'
import ReactDOM from 'react-dom'
//https://styled-system.com/#expressive-consistent-ui-components
//https://styled-system.com/table
//Позволяет прописывать стили в виде коротких пропсов
import {color, layout, space} from 'styled-system'

//TODO remove styled-system library

const Box = styled('div')(
  layout,
  space,
  color
)

const Rows = styled(Box)<{ margin?: number, mx?: number | string }>`
  display: flex;
  flex-direction: column;

  ${(props: any) => (props.my !== undefined) ? '' : 'margin: 10px 0;'}
  & > * {
    margin: ${(props: any) => (props.margin ?? '5') + 'px'} 0;
  }

  & > *:first-of-type {
    margin-top: 0;
  }

  & > *:last-of-type {
    margin-bottom: 0;
  }
`

const Columns = styled(Box)<{ margin?: number }>`
  display: flex;
  flex-direction: row;
  margin: 0 10px;

  & > * {
    margin: 0 ${(props: any) => (props.margin ?? '5') + 'px'};
    flex: 1;
  }

  & > *:first-of-type {
    margin-left: 0;
  }

  & > *:last-of-type {
    margin-right: 0;
  }
`

const LabeledInput = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;

  label {
    width: 100px;
    min-width: 80px;
  }
`

const Centered = styled(Box)`
  display: flex;
  flex: 1;
  text-align: center;
  align-items: center;
  justify-content: center;
`

class AutoSize extends Component {
  componentDidMount() {
    const domNode = ReactDOM.findDOMNode(this)
    autosize(domNode as Element)
  }

  render() {
    return this.props.children
  }
}

export {Box, Rows, Columns, LabeledInput, AutoSize, Centered}
