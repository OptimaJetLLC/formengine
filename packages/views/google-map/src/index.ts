// The public API exposes google.maps types, and the root tsconfig allowlists global type packages,
// so the package references them explicitly.
/// <reference types="google.maps" />

import type {Definer, Model} from '@react-form-builder/core'
import {googleMap} from './GoogleMap'
import type {GoogleMapProps} from './GoogleMapProps'
import googleMapEnUsComponentsDescriptions from './i18n/en-US.json'

export const googleMapComponent: Definer<GoogleMapProps> = googleMap
export const googleMapModel: Model = googleMap.build().model
export type {Address} from './Address'
export type {GoogleMapProps} from './GoogleMapProps'
export {googleMapComponentsDescriptions} from './i18n/googleMapComponentsDescriptions'
export type {MapMarker} from './MapMarker'
export {toAddress} from './toAddress'
export {googleMapEnUsComponentsDescriptions}
