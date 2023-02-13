import {cx} from '@emotion/css'
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import {faCompressAlt, faExpandAlt} from '@fortawesome/free-solid-svg-icons'
import {PropsWithChildren, useState} from 'react'
import {Button, IconButton} from 'rsuite'
//https://styled-system.com/#expressive-consistent-ui-components
//https://styled-system.com/table
//Позволяет прописывать стили в виде коротких пропсов
import {color, layout, space} from 'styled-system'
import {FaIcon} from './Icons'

//TODO remove styled-system library

export const Box = styled('div')(
  layout,
  space,
  color
)

export const Rows = styled(Box)<{ margin?: number, mx?: number | string }>`
  display: flex;
  flex-direction: column;

  ${(props: any) => (props.my !== undefined) ? '' : 'margin: 10px 0;'}
  & > * {
    margin: ${(props: any) => (props.margin ?? '5') + 'px'} 0;
  }

  & > *:first-of-type {
    margin-top: 0;
  }

  & > *:last-of-type {
    margin-bottom: 0;
  }
`

export const Columns = styled(Box)<{ margin?: number }>`
  display: flex;
  flex-direction: row;
  margin: 0 10px;

  & > * {
    margin: 0 ${(props: any) => (props.margin ?? '5') + 'px'};
    flex: 1;
  }

  & > *:first-of-type {
    margin-left: 0;
  }

  & > *:last-of-type {
    margin-right: 0;
  }
`

export const LabeledInput = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;

  & > label {
    width: 100px;
    min-width: 80px;
  }
`

export const makeLabeledIconStyles = (gap: number = 10) => css`
  && {
    display: flex;
    align-items: center;
    gap: ${gap}px;

    .rs-icon {
      margin-block-start: 2px;
    }
  }
`

export const SIconButton = styled(Button)`
  ${makeLabeledIconStyles()}
`
export const FullScreenExpandable = ({children}: PropsWithChildren<any>) => {
  const [expanded, setExpanded] = useState(false)
  const icon = <FaIcon icon={(expanded ? faCompressAlt : faExpandAlt) as unknown as IconDefinition}
                       width={'1em'} height={'1em'}/>

  return <SDiv className={cx({expanded})}>
    <SExpandButton onClick={() => setExpanded(!expanded)} icon={icon} size={'sm'} appearance={'subtle'}/>
    <div className={'content'}>
      {children}
    </div>
  </SDiv>
}

const SExpandButton = styled(IconButton)`
  z-index: 9999;
  position: absolute !important;
  inset-inline-end: 10px;
  inset-block-start: 10px;
`

const SDiv = styled.div`
  position: relative;
  height: 100%;

  & > .content {
    height: 100%;
    overflow-y: auto;
  }

  &.expanded {
    z-index: 9999;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }
`
