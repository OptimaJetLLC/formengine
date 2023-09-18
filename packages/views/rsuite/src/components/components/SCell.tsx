import styled from '@emotion/styled'
import {Table} from 'rsuite'

const {Cell} = Table

export const SCell = styled(Cell)`
  padding: 0;

  & .rs-table-cell-content {
    padding: 9px 3px;
  }
`
