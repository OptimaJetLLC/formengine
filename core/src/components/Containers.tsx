import styled from "@emotion/styled";
import autosize from 'autosize';
//https://styled-system.com/#expressive-consistent-ui-components
//https://styled-system.com/table
//Позволяет прописывать стили в виде коротких пропсов
import {color, layout, space} from 'styled-system';
import {Component} from "react";
import ReactDOM from "react-dom";


const Box = styled('div')(
    layout,
    space,
    color
);

const Rows = styled(Box)<{ margin?: number, mx?: number | string }>`
  display: flex;
  flex-direction: column;

  ${(props: any) => {
    console.log(props)
    return (props.my != undefined) ? "" : "margin: 10px 0;"
  }}
  & > * {
    margin: ${(props: any) => (props.margin ?? '5') + 'px'} 0;
  }

  & :first-child {
    margin-top: 0;
  }

  & :last-child {
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

  & :first-child {
    margin-left: 0;
  }

  & :last-child {
    margin-right: 0;
  }
`

const LabeledInput = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-left: 5px;
  }

  input, div {
    margin-top: 2px;
  }
`

class AutoSize extends Component {
    componentDidMount() {
        const domNode = ReactDOM.findDOMNode(this);
        autosize(domNode as Element);
    }

    render() {
        return this.props.children;
    }
}

export {Box, Rows, Columns, LabeledInput, AutoSize};