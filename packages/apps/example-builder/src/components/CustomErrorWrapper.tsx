import type {ErrorWrapperProps} from '@react-form-builder/core'
import type {CSSProperties} from 'react'

const divStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
}

const spanStyle: CSSProperties = {
  fontSize: 'medium',
  fontWeight: 'bold',
  color: '#c1730d',
}

/**
 * The custom error wrapper.
 * @param props the React component properties.
 * @returns the React element.
 */
export const CustomErrorWrapper = (props: ErrorWrapperProps) => {
  return (
    <div className={props.className} style={divStyle}>
      {props.children}
      {!!props.error && <span style={spanStyle}>{props.error}</span>}
    </div>
  )
}
