import type {CollisionBehavior, ControlPosition, MapMouseEvent} from '@vis.gl/react-google-maps'
import type {Address} from './Address'
import type {MapMarker} from './MapMarker'

/**
 * Props for the GoogleMap component.
 */
export interface GoogleMapProps {
  /**
   * Latitude of the center point on the map.
   */
  latitude: number

  /**
   * Longitude of the center point on the map.
   */
  longitude: number

  /**
   * Zoom level of the map.
   */
  zoom: number

  /**
   * Google Maps API key used to load the map.
   */
  apiKey: string

  /**
   * Whether multiple markers can be added to the map.
   * Defaults to false.
   */
  allowMultipleMarkers?: boolean

  /**
   * If true, the user can change the markers.
   */
  allowChangingMarkers: boolean

  /**
   * Coordinates of the markers
   */
  markers?: MapMarker[]

  /**
   * The markers collision behavior.
   */
  collisionBehavior?: CollisionBehavior

  /**
   * The search input placeholder.
   */
  searchPlaceholder?: string

  /**
   * Cloud Map ID for map style and Advanced Markers.
   * When omitted or empty, Google's DEMO_MAP_ID is used and Google shows a development watermark.
   */
  mapId?: string

  /**
   * The callback function called when a marker is added.
   */
  onMarkerAdd?: (marker: MapMarker) => void

  /**
   * The callback function called when a marker is deleted.
   */
  onMarkerDelete?: (marker: MapMarker) => void

  /**
   * The callback function called when a marker is clicked.
   */
  onMarkerClick?: (marker: MapMarker | null, element: google.maps.marker.AdvancedMarkerElement) => void

  /**
   * The callback function called when the map is clicked.
   */
  onMapClick?: (event: MapMouseEvent) => void

  /**
   * The callback function called when a place is selected.
   * @param place the selected place.
   * @param address the address of the selected place.
   */
  onPlaceSelect?: (place: google.maps.places.PlaceResult, address?: Address) => void

  /**
   * The callback function called when place details cannot be loaded after a search selection.
   * @param error the error from the Places widget or fetchFields.
   */
  onPlaceSelectError?: (error: unknown) => void

  /**
   * The CSS class name.
   */
  className?: string

  /**
   * Sets the map to a specific region.
   * Read more about localizing the Map: https://developers.google.com/maps/documentation/javascript/localization.
   * Part of: https://developers.google.com/maps/documentation/javascript/url-params.
   */
  region?: string

  /**
   * Use a specific language for the map.
   * Read more about localizing the Map: https://developers.google.com/maps/documentation/javascript/localization.
   * Part of: https://developers.google.com/maps/documentation/javascript/url-params.
   */
  language?: string

  /**
   * The color scheme to use for the map.
   */
  colorScheme?: 'DARK' | 'LIGHT' | 'FOLLOW_SYSTEM'

  /**
   * The default map type to use.
   */
  mapTypeId: 'hybrid' | 'roadmap' | 'satellite' | 'terrain'

  /**
   * This setting controls how the API handles gestures on the map.
   */
  gestureHandling?: 'auto' | 'cooperative' | 'greedy' | 'none'

  /**
   * Whether to show the map control.
   */
  showMapControl: boolean

  /**
   * The position of the map control.
   */
  mapControlPosition: ControlPosition

  /**
   * Whether to add a marker on search.
   */
  addMarkerOnSearch: boolean

  /**
   * The title for the marker window.
   */
  markerWindowTitle: string

  /**
   * The caption for the remove marker button.
   */
  removeMarkerCaption: string

  /**
   * The label of the component.
   */
  label?: string
}
