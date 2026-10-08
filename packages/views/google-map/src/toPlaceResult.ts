/**
 * Adapts a Places (New) Place to the legacy PlaceResult shape used by the public GoogleMap API.
 * @param place the Place after fetchFields.
 * @returns a PlaceResult compatible with existing onPlaceSelect consumers.
 */
export const toPlaceResult = (place: google.maps.places.Place): google.maps.places.PlaceResult => {
  const geometry =
    place.location || place.viewport
      ? {
          location: place.location ?? undefined,
          viewport: place.viewport ?? undefined,
        }
      : undefined

  return {
    address_components: place.addressComponents?.map(component => ({
      long_name: component.longText ?? '',
      short_name: component.shortText ?? '',
      types: component.types,
    })),
    formatted_address: place.formattedAddress ?? undefined,
    geometry,
    name: place.displayName ?? undefined,
    place_id: place.id,
  }
}
