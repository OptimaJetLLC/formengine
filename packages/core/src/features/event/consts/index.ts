import {clear, log, reset, validate} from './actions'

export const DidMountEvent = 'onDidMount'
export const WillUnmountEvent = 'onWillUnmount'
export const DefaultActions = [log, validate, reset, clear]
