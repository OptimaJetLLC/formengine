# Interface: GoogleMapProps

Props for the GoogleMap component.

## Properties

### addMarkerOnSearch

> **addMarkerOnSearch**: `boolean`

Whether to add a marker on search.

***

### allowChangingMarkers

> **allowChangingMarkers**: `boolean`

If true, the user can change the markers.

***

### allowMultipleMarkers?

> `optional` **allowMultipleMarkers?**: `boolean`

Whether multiple markers can be added to the map.
Defaults to false.

***

### apiKey

> **apiKey**: `string`

Google Maps API key used to load the map.

***

### className?

> `optional` **className?**: `string`

The CSS class name.

***

### collisionBehavior?

> `optional` **collisionBehavior?**: `CollisionBehavior`

The markers collision behavior.

***

### colorScheme?

> `optional` **colorScheme?**: `"DARK"` \| `"FOLLOW_SYSTEM"` \| `"LIGHT"`

The color scheme to use for the map.

***

### gestureHandling?

> `optional` **gestureHandling?**: `"auto"` \| `"cooperative"` \| `"greedy"` \| `"none"`

This setting controls how the API handles gestures on the map.

***

### label?

> `optional` **label?**: `string`

The label of the component.

***

### language?

> `optional` **language?**: `string`

Use a specific language for the map.
Read more about localizing the Map: https://developers.google.com/maps/documentation/javascript/localization.
Part of: https://developers.google.com/maps/documentation/javascript/url-params.

***

### latitude

> **latitude**: `number`

Latitude of the center point on the map.

***

### longitude

> **longitude**: `number`

Longitude of the center point on the map.

***

### mapControlPosition

> **mapControlPosition**: `ControlPosition`

The position of the map control.

***

### mapId?

> `optional` **mapId?**: `string`

Cloud Map ID for map style and Advanced Markers.
When omitted or empty, Google's DEMO_MAP_ID is used and Google shows a development watermark.

***

### mapTypeId

> **mapTypeId**: `"hybrid"` \| `"roadmap"` \| `"satellite"` \| `"terrain"`

The default map type to use.

***

### markers?

> `optional` **markers?**: [`MapMarker`](../type-aliases/MapMarker.md)[]

Coordinates of the markers

***

### markerWindowTitle

> **markerWindowTitle**: `string`

The title for the marker window.

***

### onMapClick?

> `optional` **onMapClick?**: (`event`) => `void`

The callback function called when the map is clicked.

#### Parameters

##### event

`MapMouseEvent`

#### Returns

`void`

***

### onMarkerAdd?

> `optional` **onMarkerAdd?**: (`marker`) => `void`

The callback function called when a marker is added.

#### Parameters

##### marker

[`MapMarker`](../type-aliases/MapMarker.md)

#### Returns

`void`

***

### onMarkerClick?

> `optional` **onMarkerClick?**: (`marker`, `element`) => `void`

The callback function called when a marker is clicked.

#### Parameters

##### marker

[`MapMarker`](../type-aliases/MapMarker.md) \| `null`

##### element

`AdvancedMarkerElement`

#### Returns

`void`

***

### onMarkerDelete?

> `optional` **onMarkerDelete?**: (`marker`) => `void`

The callback function called when a marker is deleted.

#### Parameters

##### marker

[`MapMarker`](../type-aliases/MapMarker.md)

#### Returns

`void`

***

### onPlaceSelect?

> `optional` **onPlaceSelect?**: (`place`, `address?`) => `void`

The callback function called when a place is selected.

#### Parameters

##### place

`PlaceResult`

the selected place.

##### address?

[`Address`](../type-aliases/Address.md)

the address of the selected place.

#### Returns

`void`

***

### onPlaceSelectError?

> `optional` **onPlaceSelectError?**: (`error`) => `void`

The callback function called when place details cannot be loaded after a search selection.

#### Parameters

##### error

`unknown`

the error from the Places widget or fetchFields.

#### Returns

`void`

***

### region?

> `optional` **region?**: `string`

Sets the map to a specific region.
Read more about localizing the Map: https://developers.google.com/maps/documentation/javascript/localization.
Part of: https://developers.google.com/maps/documentation/javascript/url-params.

***

### removeMarkerCaption

> **removeMarkerCaption**: `string`

The caption for the remove marker button.

***

### searchPlaceholder?

> `optional` **searchPlaceholder?**: `string`

The search input placeholder.

***

### showMapControl

> **showMapControl**: `boolean`

Whether to show the map control.

***

### zoom

> **zoom**: `number`

Zoom level of the map.
