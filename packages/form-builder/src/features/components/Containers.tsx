import styled from '@emotion/styled'

export const Rows = styled.div<{ gap?: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({gap}) => gap ?? '5'}px;
`

export const Columns = styled.div<{ gap?: number, stretchElements?: boolean }>`
  display: flex;
  gap: ${({gap}) => gap ?? '5'}px;
  ${({stretchElements}) => stretchElements && '& > * { flex: 1; }'};
  align-items: center;
`

export const LabeledInput = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;

  & > label {
    width: 100px;
    min-width: 80px;
  }
`
