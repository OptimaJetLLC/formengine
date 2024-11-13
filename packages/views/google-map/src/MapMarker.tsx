import type {Address} from './Address'

/**
 * Represents the marker data on the map.
 */
export type MapMarker = {
  /**
   *  The unique identifier of the marker.
   */
  id: string

  /**
   * Latitude and longitude of the geographical location.
   */
  position: google.maps.LatLngLiteral

  /**
   * The z-index of the marker.
   */
  zIndex: number

  /**
   * The title of the marker.
   */
  title?: string

  /**
   * The address of the location.
   */
  address?: Address
}
