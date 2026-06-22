import {googleMap} from './GoogleMap'
import googleMapEnUsComponentsDescriptions from './i18n/en-US.json'

export const googleMapComponent = googleMap
export const googleMapModel = googleMap.build().model
export type {GoogleMapProps} from './GoogleMapProps'
export type {MapMarker} from './MapMarker'
export type {Address} from './Address'
export {toAddress} from './toAddress'

export {googleMapEnUsComponentsDescriptions}
export {googleMapComponentsDescriptions} from './i18n/googleMapComponentsDescriptions'
