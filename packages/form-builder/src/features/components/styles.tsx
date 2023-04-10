import {css} from '@emotion/css'

export const compactInput = css`
  display: flex;
  flex: 1;
  padding: 4px 2px;
  border-bottom: 1px solid var(--rs-border-primary);

  input {
    padding: 2px 4px;
    line-height: 1.35;
    border-radius: 0;
    border: none;
    word-break: break-word !important;

    &:hover {
      outline: 1px solid var(--rs-border-primary) !important;
    }
  }
`
