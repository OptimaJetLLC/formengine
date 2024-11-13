import {googleMap} from './GoogleMap'

export const googleMapComponent = googleMap
export const googleMapModel = googleMap.build().model
export type {GoogleMapProps} from './GoogleMapProps'
export type {MapMarker} from './MapMarker'
export type {Address} from './Address'
export {toAddress} from './toAddress'
