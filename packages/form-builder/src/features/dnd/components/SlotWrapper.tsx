import styled from '@emotion/styled'
import {WrapperProps} from '@react-form-builder/core'
import {DropView} from './Editable/components/DropView'

const SDiv = styled.div`
  border: 1px chartreuse solid;
  margin: 10px;
`

/**
 * React form builder component that wraps the template slot.
 * @param props the React component properties.
 * @returns the React element.
 */
export const SlotWrapper = (props: WrapperProps) => {
  if (!props.children) {
    // todo here we need a rework of drag'n'drop
    return <DropView isInner={true}/>
  }
  return <SDiv>{props.children}</SDiv>
}
