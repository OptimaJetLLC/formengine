import {toPlaceResult} from '../../../packages/views/google-map/src/toPlaceResult'

describe('toPlaceResult', () => {
  it('adapts a Places (New) Place to the legacy PlaceResult public API shape', () => {
    const location = {toJSON: () => ({lat: -33.8568, lng: 151.2153})} as google.maps.LatLng
    const viewport = {} as google.maps.LatLngBounds
    const place = {
      addressComponents: [
        {
          longText: 'Bennelong Point',
          shortText: 'Bennelong Point',
          types: ['route'],
        },
      ],
      displayName: 'Sydney Opera House',
      formattedAddress: 'Bennelong Point, Sydney NSW 2000, Australia',
      id: 'ChIJ3S-JXmauEmsRUcIaWtf4MzE',
      location,
      viewport,
    } as unknown as google.maps.places.Place

    expect(toPlaceResult(place)).toEqual({
      address_components: [
        {
          long_name: 'Bennelong Point',
          short_name: 'Bennelong Point',
          types: ['route'],
        },
      ],
      formatted_address: 'Bennelong Point, Sydney NSW 2000, Australia',
      geometry: {location, viewport},
      name: 'Sydney Opera House',
      place_id: 'ChIJ3S-JXmauEmsRUcIaWtf4MzE',
    })
  })
})
