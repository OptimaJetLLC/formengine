import styled from '@emotion/styled'
import {ComponentStore} from '../../stores/ComponentStore'
import {Model} from '../define'
import {screenModel} from './screenModel'

export interface InternalErrorProps {
  error: any
}

const SH1 = styled.h1`
  color: red;
`

const InternalError = ({error}: InternalErrorProps) => {
  return <SH1>{error?.message ?? JSON.stringify(error)}</SH1>
}
export const internalErrorModel = new Model(InternalError)

export function buildInternalErrorStore(error: any) {
  const componentStore = new ComponentStore(internalErrorModel.name, internalErrorModel.type)
  componentStore.props['error'] = {value: error}
  const screen = new ComponentStore(screenModel.name, screenModel.type)
  screen.children = [componentStore]
  return screen
}

export function buildInternalErrorModel(error: any) {
  const defaultProps = {error: error}
  return new Model(InternalError, undefined, undefined, undefined, defaultProps)
}
