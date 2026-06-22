import {useMapsLibrary} from '@vis.gl/react-google-maps'
import {useCallback} from 'react'
import type {Address} from './Address'
import {toAddress} from './toAddress'

/**
 * Represents the address response.
 */
type AddressResponse = {
  /**
   * The address of the location.
   */
  address?: Address
  /**
   * The geocoder response.
   */
  geocoderResponse: google.maps.GeocoderResponse
}

/**
 * Retrieves the address of a location.
 */
type GetAddressFn = (location: google.maps.LatLngLiteral) => Promise<AddressResponse | undefined>

/**
 * @returns the function that retrieves the address of a location.
 */
export const useGeocoding = (): GetAddressFn => {
  const geocoding = useMapsLibrary('geocoding')

  return useCallback((location: google.maps.LatLngLiteral) => {
    return new Promise((resolve, reject) => {
      if (!geocoding) return resolve(undefined)

      const geocoder = new geocoding.Geocoder()
      geocoder.geocode({location})
        .then(geocoderResponse => {
          const address = geocoderResponse?.results?.[0]?.address_components
            ? toAddress(geocoderResponse.results[0].address_components)
            : undefined
          resolve({address, geocoderResponse})
        })
        .catch(reject)
    })
  }, [geocoding])
}
