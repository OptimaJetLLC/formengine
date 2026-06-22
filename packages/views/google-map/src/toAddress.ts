import type {Address} from './Address'

/**
 * Converts the address components to an address object.
 * Original source code from https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform.
 * @param components the address components.
 * @returns the address object.
 */
export function toAddress(components: google.maps.GeocoderAddressComponent[]): Address {
  const result = <Address>{
    address: '',
    postalCode: '',
  }

  for (const component of components) {
    const componentType = component.types[0]

    switch (componentType) {
      case 'street_number': {
        result.address = `${component.long_name} ${result.address}`
        break
      }
      case 'route': {
        result.address += component.short_name
        break
      }
      case 'postal_code': {
        result.postalCode = `${component.long_name}${result.postalCode}`
        break
      }
      case 'postal_code_suffix': {
        result.postalCode = `${result.postalCode}-${component.long_name}`
        break
      }
      case 'locality':
        result.city = component.long_name
        break
      case 'administrative_area_level_1': {
        result.state = component.short_name
        break
      }
      case 'country':
        result.country = component.long_name
        break
      default:
        break
    }
  }

  return result
}
