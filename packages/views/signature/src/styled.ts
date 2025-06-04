import styled from '@emotion/styled'

export const LabelLeft = styled.label`
  text-align: left;
`

export const Rows = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

export const LabeledInput = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  label {
    margin-inline-start: 5px;
    margin-bottom: 2px;
  }

  &.required label::after {
    margin-inline-start: 3px;
    content: "*";
    color: #f44336;
  }
`
