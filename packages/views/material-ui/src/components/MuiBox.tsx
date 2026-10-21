import type {BoxProps} from '@mui/material'
import {Box} from '@mui/material'
import {define, disabled, forwardRef, node, readOnly, size} from '@react-form-builder/core'
import type {ForwardedRef} from 'react'
import {sx} from '../commonProperties'
import {layoutCategory} from './categories'
import type {DisabledProps} from './internal/DisabledProps'
import type {ReadOnlyProps} from './internal/ReadOnlyProps'

/**
 * The MuiBox component properties.
 */
export interface MuiBoxProps extends BoxProps, DisabledProps, ReadOnlyProps {}

/**
 * Box component with flex layout.
 * @param props the component props.
 * @returns the React element.
 */
const MuiBox = forwardRef((props: MuiBoxProps, ref: ForwardedRef<any>) => {
  const {disabled, readOnly, ...otherProps} = props
  return <Box {...otherProps} ref={ref} />
})

export const muiBox = define(MuiBox, 'MuiBox')
  .icon('Container')
  .category(layoutCategory)
  .kind('container')
  .props({
    children: node,
    readOnly: readOnly,
    disabled: disabled,
    // Layout constraints such as max-width belong in `sx` (Material UI v9 removed Box system props).
    /*
    function sx(theme) {
      return {
          "maxWidth": theme.breakpoints.values.md
      }
    }
    */
    sx,
  })
  .css({
    gap: size.default('10px'),
  })
