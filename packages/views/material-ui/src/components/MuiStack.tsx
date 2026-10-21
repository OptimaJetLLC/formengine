import type {StackProps} from '@mui/material'
import {Stack} from '@mui/material'
import {boolean, define, disabled, forwardRef, node, oneOf, readOnly, string} from '@react-form-builder/core'
import type {ForwardedRef} from 'react'
import {sx} from '../commonProperties'
import {layoutCategory} from './categories'
import type {DisabledProps} from './internal/DisabledProps'
import type {ReadOnlyProps} from './internal/ReadOnlyProps'

/**
 * The MuiStack component properties.
 */
export interface MuiStackProps extends StackProps, DisabledProps, ReadOnlyProps {}

const MuiStack = forwardRef((props: MuiStackProps, ref: ForwardedRef<any>) => {
  const {disabled, readOnly, ...otherProps} = props
  return <Stack {...otherProps} ref={ref} />
})

export const muiStack = define(MuiStack, 'MuiStack')
  .icon('Container')
  .category(layoutCategory)
  .kind('container')
  .props({
    children: node,
    disabled: disabled,
    readOnly: readOnly,
    // Main/cross-axis alignment and wrap belong in `sx` (Material UI v9 removed Stack system props).
    sx,
    direction: oneOf('row', 'row-reverse', 'column', 'column-reverse'),
    spacing: string,
    useFlexGap: boolean.default(true),
  })
