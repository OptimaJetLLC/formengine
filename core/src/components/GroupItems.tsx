import styled from "@emotion/styled";

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;

  & > * {
    margin: 5px 0;
  }

  & :first-child {
    margin-top: 0;
  }

  & :last-child {
    margin-bottom: 0;
  }
`

export {Rows};