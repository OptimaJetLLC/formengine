import {array, boolean, cssSize, define, event, number, oneOf, string, useBuilderMode} from '@react-form-builder/core'
import {APIProvider} from '@vis.gl/react-google-maps'
import type {GoogleMapProps} from './GoogleMapProps'
import {GoogleMapRenderer} from './GoogleMapRenderer'
import {MapIcon} from './icon'

const NoApiKey = ({className}: { className?: string }) => {
  return <div className={className}>
    <p>Google Maps API key is required. Insert the key, save the form and reload the page.</p>
  </div>
}

const GoogleMapLoader = ({apiKey, region, language, ...props}: GoogleMapProps) => {
  const builderMode = useBuilderMode()

  if (!apiKey) return builderMode === 'builder' ? <NoApiKey className={props.className}/> : null

  return <APIProvider apiKey={apiKey} region={region} language={language}>
    <GoogleMapRenderer {...props}/>
  </APIProvider>
}

const controlPositions: Record<string, number> = {
  'Top left': 1,
  'Top': 2,
  'Top right': 3,
  'Left center': 4,
  'Left': 5,
  'Left bottom': 6,
  'Right': 7,
  'Right center': 8,
  'Right bottom': 9,
  'Bottom left': 10,
  'Bottom': 11,
  'Bottom right': 12,
  'Center': 13,
  'Block start inline start': 14,
  'Block start inline center': 15,
  'Block start inline end': 16,
  'Inline start block center': 17,
  'Inline start block start': 18,
  'Inline start block end': 19,
  'Inline end block start': 20,
  'Inline end block center': 21,
  'Inline end block end': 22,
  'Block end inline start': 23,
  'Block end inline center': 24,
  'Block end inline end': 25
}

export const googleMap = define(GoogleMapLoader, 'GoogleMap')
  .name('Google Map')
  .category('fields')
  .icon(MapIcon)
  .props({
    label: string,
    latitude: number.default(-33.860664),
    longitude: number.default(151.208138),
    zoom: number.default(13),
    apiKey: string.required,
    mapId: string.withEditorProps({placeholder: 'DEMO_MAP_ID'}),
    language: string,
    region: string,
    colorScheme: oneOf('DARK', 'LIGHT', 'FOLLOW_SYSTEM')
      .withEditorProps({creatable: false}),
    mapTypeId: oneOf('roadmap', 'satellite', 'hybrid', 'terrain').default('roadmap')
      .withEditorProps({creatable: false}),
    gestureHandling: oneOf('auto', 'cooperative', 'greedy', 'none')
      .withEditorProps({creatable: false}),
    showMapControl: boolean.default(true),
    mapControlPosition: oneOf(...Object.keys(controlPositions).map(key => controlPositions[key]))
      .labeled(...Object.keys(controlPositions))
      .withEditorProps({creatable: false})
      .default(2),
    searchPlaceholder: string,
    addMarkerOnSearch: boolean.default(false),
    allowMultipleMarkers: boolean.default(false),
    allowChangingMarkers: boolean.default(false),
    collisionBehavior: oneOf('REQUIRED', 'REQUIRED_AND_HIDES_OPTIONAL', 'OPTIONAL_AND_HIDES_LOWER_PRIORITY')
      .withEditorProps({creatable: false}),
    markers: array.valued.setup({editor: 'object'}),
    markerWindowTitle: string.default('Marker'),
    removeMarkerCaption: string.default('Delete marker'),
    onMarkerAdd: event,
    onMarkerClick: event,
    onMarkerDelete: event,
    onMapClick: event,
    onPlaceSelect: event,
  })
  .css({
    width: cssSize.setup({default: '100%'}).hinted('Width of the map'),
    height: cssSize.setup({default: '400px'}).hinted('Height of the map'),
  })
