import styled from "@emotion/styled";

const Rows = styled.div<{ margin?: number }>`
  display: flex;
  flex-direction: column;
  margin: 10px 0;

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

const Columns = styled.div<{ margin?: number }>`
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

export {Rows, Columns, LabeledInput};