import styled from '@emotion/styled'
import {ArrowDownLine, ArrowUpLine} from '@rsuite/icons'
import {t} from 'i18next'
import {observer} from 'mobx-react'
import {useState} from 'react'
import {Animation, Button} from 'rsuite'
import {Box, Rows} from '../../../../../../../ui/Containers'
import {useActionData} from '../../contexts/ActionDataContext'
import {ArgumentItem} from './ArgumentItem'
import {useClearableArguments} from './hooks/useClearableArguments'

export const ArgumentList = observer(() => {
  const [show, setShow] = useState(false)
  const data = useActionData()
  const ExpandIcon = show ? ArrowUpLine : ArrowDownLine
  useClearableArguments()

  if (!data.action.args?.length) return null

  return (
    <>
      <Animation.Collapse in={show}>
        <Box px={10}>
          <div>
            <Rows margin={1} style={{marginTop: 8}}>
              {data.action.args.map((arg, index) =>
                <ArgumentItem key={index} data={arg}/>)}
            </Rows>
          </div>
        </Box>
      </Animation.Collapse>

      <ExpandButton block onClick={() => setShow(!show)}>
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
