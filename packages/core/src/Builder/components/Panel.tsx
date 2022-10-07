import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import {ArrowLeftLine, ArrowRightLine} from '@rsuite/icons'
import {observer} from 'mobx-react'
import React, {PropsWithChildren} from 'react'
import useLocalStorageState from 'use-local-storage-state'

export const enum PLACEMENT {RIGHT, LEFT}

export interface PanelProps extends PropsWithChildren<any> {
  rightPlacement?: boolean
  name: string
}

export const Panel = observer(({children, name, rightPlacement}: PanelProps) => {
  const [collapsed, setCollapsed] = useLocalStorageState(name, {
    defaultValue: false
  })

  const collapsedIcon = !rightPlacement ? ArrowRightLine : ArrowLeftLine
  const openedIcon = !rightPlacement ? ArrowLeftLine : ArrowRightLine
  const Icon = collapsed ? collapsedIcon : openedIcon

  return <PanelContainer className={cx({collapsed, rightPlacement})}>
    <ContentContainer>{children}</ContentContainer>
    <HideButton className={cx({rightPlacement})} onClick={() => setCollapsed(!collapsed)}>
      <Icon/>
    </HideButton>
  </PanelContainer>
})


export const ContentContainer = styled.div`
  overflow: hidden;
  display: flex;
  width: 280px;
  margin: 10px;

  .collapsed > & {
    transition: opacity 200ms ease-in-out;
    opacity: 0;
  }

  & > * {
    flex: 1;
  }
`

export const HideButton = styled.div`
  position: absolute;
  display: flex;
  overflow: hidden;
  width: 20px;
  height: 80px;
  inset-block-start: 50%;
  transform: translateY(-50%);
  inset-inline-end: -10px;
  align-items: center;
  cursor: pointer;
  border-radius: 20px;

  background-color: #fcfcfd;

  .rs-theme-dark & {
    background-color: #414549;
  }

  &.rightPlacement {
    inset-inline-end: initial;
    inset-inline-start: -10px;
  }

  .rs-icon {
    font-size: 2em;
    opacity: 0.6;
    position: absolute;
    inset-inline-end: -5px;
  }
`

export const PanelContainer = styled.div`
  position: relative;
  display: flex;
  width: 280px;
  transition: width 200ms ease-in-out;
  border-radius: 0 10px 10px 0;
  margin-block: 5px 15px;
  background-color: #ffffffa1;

  .rs-theme-dark & {
    background-color: #414549;
  }

  &.rightPlacement {
    border-radius: 10px 0 0 10px;
    box-shadow: none;
  }

  &.collapsed {
    width: 10px;
  }

  .rs-tree {
    width: 260px;
  }
`
