import {clear, log, reset, setProperty, validate} from './actions'

export const DidMountEvent = 'onDidMount'
export const WillUnmountEvent = 'onWillUnmount'
export const DefaultActions = [setProperty, log, validate, reset, clear]
