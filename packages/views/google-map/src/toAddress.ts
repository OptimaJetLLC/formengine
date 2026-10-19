import type {Address} from './Address'

/**
 * The common address component data accepted by {@link toAddress}.
 */
export interface AddressComponentLike {
  /**
   * The full address component name.
   */
  longName: string
  /**
   * The abbreviated address component name.
   */
  shortName: string
  /**
   * The address component types.
   */
  types: string[]
}

/**
 * An address component accepted by {@link toAddress}.
 */
export type AddressComponentInput = AddressComponentLike | google.maps.GeocoderAddressComponent | google.maps.places.AddressComponent

const toAddressComponentLike = (component: AddressComponentInput): AddressComponentLike => {
  if ('longName' in component) {
    return component
  }

  if ('longText' in component) {
    return {
      longName: component.longText ?? '',
      shortName: component.shortText ?? '',
      types: component.types,
    }
  }

  return {
    longName: component.long_name,
    shortName: component.short_name,
    types: component.types,
  }
}

/**
 * Converts the address components to an address object.
 * Original source code from https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform.
 * Accepts Geocoder components, Places (New) components, or the shared AddressComponentLike shape.
 * @param components the address components.
 * @returns the address object.
 */
export function toAddress(components: AddressComponentInput[]): Address {
  const result = <Address>{
    address: '',
    postalCode: '',
  }

  for (const rawComponent of components) {
    const component = toAddressComponentLike(rawComponent)
    const componentType = component.types[0]

    switch (componentType) {
      case 'street_number': {
        result.address = `${component.longName} ${result.address}`
        break
      }
      case 'route': {
        result.address += component.shortName
        break
      }
      case 'postal_code': {
        result.postalCode = `${component.longName}${result.postalCode}`
        break
      }
      case 'postal_code_suffix': {
        result.postalCode = `${result.postalCode}-${component.longName}`
        break
      }
      case 'locality':
        result.city = component.longName
        break
      case 'administrative_area_level_1': {
        result.state = component.shortName
        break
      }
      case 'country':
        result.country = component.longName
        break
      default:
        break
    }
  }

  return result
}
