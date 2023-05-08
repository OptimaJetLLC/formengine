import styled from '@emotion/styled'
import {WrapperProps} from 'fb-core'
import {DropView} from './Editable/components/DropView'

const SDiv = styled.div`
  border: 1px chartreuse solid;
  margin: 10px;
`

export const SlotWrapper = (props: WrapperProps) => {
  if (!props.children) {
    // todo тут нужна переделка drag'n'drop
    return <DropView isInner={true}/>
  }
  return <SDiv>{props.children}</SDiv>
}
