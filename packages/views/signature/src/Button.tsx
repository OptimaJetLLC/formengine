import styled from '@emotion/styled'

const StyledButton = styled.button`
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;

    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    color: #fff;

    padding: 8px 16px;
    border-radius: 4px;

    background-color: #3498ff;
    border: 1px solid #3498ff;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;

    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:not(:disabled):hover {
      background-color: #2385e6;
      border-color: #2385e6;
    }

    &:not(:disabled):active {
      background-color: #1a7ad9;
      border-color: #1a7ad9;
    }

    &:focus {
      box-shadow: 0 0 0 3px rgba(52, 152, 255, 0.3);
      outline: none;
    }

    &:disabled {
      opacity: 0.65;
      cursor: not-allowed;
      pointer-events: none;
    }
  }
`

/**
 * The button component.
 * @param props the component props.
 * @returns the React component.
 */
export const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <StyledButton className={'rs-btn rs-btn-primary'} {...props}/>
}
