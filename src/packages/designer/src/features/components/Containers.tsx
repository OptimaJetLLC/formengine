import {css} from '@emotion/react'
import styled from '@emotion/styled'

const DEFAULT_GAP = 5

/**
 * The React component that displays a set of rows.
 * @param props the React component properties.
 * @param props.gap the gap between rows.
 * @returns the React element.
 */
export const Rows = styled.div<{ gap?: number }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({gap}) => gap ?? DEFAULT_GAP}px;
`

export const Columns = styled.div<{
  /**
   * The gap between columns.
   */
  gap?: number
  /**
   * Flag, if true the columns will be stretched in width, false otherwise.
   */
  stretchElements?: boolean
  /**
   * Flag, if true the columns justify space between, false otherwise.
   */
  spaceBetween?: boolean
}>`
  display: flex;
  gap: ${({gap}) => gap ?? DEFAULT_GAP}px;
  ${({stretchElements}) => stretchElements && '& > * { flex: 1; }'};
  ${({spaceBetween}) => spaceBetween && 'justify-content: space-between'};
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

export const itemStyle = css`
  background-color: var(--rs-btn-default-bg);
  border-radius: 10px;
  padding: 8px;
`

export const listItemStyle = css`
  && {
    display: flex;
    position: relative;
    ${itemStyle};
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
    overflow-y: auto;
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

/**
 * The React component that displays a list.
 * @param props the React component properties.
 * @param props.clickable flag, if true then the list is clickable, false otherwise.
 * @returns the React element.
 */
export const List = styled.div<{ clickable?: boolean }>`
  ${listStyle}
  ${({clickable = false}) => clickable && clickableStyle}
`
