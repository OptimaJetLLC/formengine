import {css} from '@emotion/react'
import styled from '@emotion/styled'

const DEFAULT_GAP = 5

export const Rows = styled.div<{ gap?: number }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({gap}) => gap ?? DEFAULT_GAP}px;
`

export const Columns = styled.div<{ gap?: number, stretchElements?: boolean }>`
  display: flex;
  gap: ${({gap}) => gap ?? DEFAULT_GAP}px;
  ${({stretchElements}) => stretchElements && '& > * { flex: 1; }'};
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

export const listItemStyle = css`
  && {
    display: flex;
    position: relative;
    background-color: var(--rs-btn-default-bg);
    border-radius: 10px;
    padding: 8px;
    padding-inline-start: 12px;
    align-items: center;
    user-select: none;
    justify-content: space-between;
  }
`

export const listStyle = css`
  && {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: ${DEFAULT_GAP}px;
  }
`

export const clickableStyle = css`
  && > * {
    cursor: pointer;

    :hover {
      background-color: var(--rs-btn-default-hover-bg);
    }
  }
`

export const ListItem = styled.div`
  ${listItemStyle}
`

export const List = styled.div<{ clickable?: boolean }>`
  ${listStyle}
  ${({clickable = false}) => clickable && clickableStyle}
`
