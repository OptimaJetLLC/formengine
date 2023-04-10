import styled from '@emotion/styled'

export const LabeledIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > *:first-of-type {
    margin-bottom: 2px;
  }

  & label {
      //color: ${(props: any) => props.color ?? 'var(--rs-btn-default-text)'};
  }
`
