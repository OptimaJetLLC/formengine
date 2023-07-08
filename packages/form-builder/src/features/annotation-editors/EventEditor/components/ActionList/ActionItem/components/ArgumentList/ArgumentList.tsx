import styled from '@emotion/styled'
import {useStore} from '@react-form-builder/core'
import {ArrowDownLine, ArrowUpLine} from '@rsuite/icons'
import {t} from 'i18next'
import {isEmpty} from 'lodash-es'
import {observer} from 'mobx-react'
import {useEffect, useReducer} from 'react'
import {Animation, Button} from 'rsuite'
import {useComputed} from '../../../../../../../../utils/useComputed'
import {Rows} from '../../../../../../../components/Containers'
import {useActionData} from '../../contexts/ActionDataContext'
import {ArgumentItem} from './ArgumentItem'

// Delete arguments object on unmount if it is empty.
const useClearableArguments = () => {
  const data = useActionData()

  useEffect(() => {
    return () => {
      if (isEmpty(data.args)) {
        delete data.args
      }
    }
  }, [])
}

export const ArgumentList = observer(() => {
  const store = useStore()
  const data = useActionData()
  const action = useComputed(() => store.findAction(data))
  const [show, toggleShow] = useReducer(state => !state, false)
  const ExpandIcon = show ? ArrowUpLine : ArrowDownLine
  useClearableArguments()

  if (!action.params) return null

  return (
    <>
      <Animation.Collapse in={show}>
        <div>
          <Rows gap={1} style={{marginTop: 8, paddingInline: 10}}>
            {action.params.map((arg, index) =>
              <ArgumentItem key={index} data={arg}/>)}
          </Rows>
        </div>
      </Animation.Collapse>

      <ExpandButton block onClick={toggleShow}>
        <>
          {t('actions.arguments')}
          <ExpandIcon style={{marginTop: -2}}/>
        </>
      </ExpandButton>
    </>
  )
})

const ExpandButton = styled(Button)`
  position: absolute !important;
  padding: 5px !important;
  left: 0;
  bottom: 0;
  border-radius: 0 !important;
  outline: 0 !important;
  color: var(--rs-btn-subtle-text) !important;

  &:focus {
    box-shadow: none;
    background-color: initial;
  }
`
