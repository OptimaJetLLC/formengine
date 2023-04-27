import {css} from '@emotion/react'
import styled from '@emotion/styled'
import {Button} from 'rsuite'

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

export const makeLabeledIconStyles = (gap: number = 10) => css`
  && {
    display: flex;
    align-items: center;
    gap: ${gap}px;

    .rs-icon {
      margin-block-start: 2px;
    }
  }
`

export const SIconButton = styled(Button)`
  ${makeLabeledIconStyles()}
`
