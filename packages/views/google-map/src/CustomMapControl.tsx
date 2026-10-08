import type {ControlPosition} from '@vis.gl/react-google-maps'
import {MapControl, useMap} from '@vis.gl/react-google-maps'
import {useCallback} from 'react'
import {PlaceAutocomplete} from './AutoComplete'

/**
 * The properties of the CustomAutocompleteControl component.
 */
interface CustomAutocompleteControlProps {
  /**
   * The position of the control on the map.
   */
  controlPosition: ControlPosition
  /**
   * Callback function to handle place selection.
   * @param place the selected Place.
   */
  onPlaceSelect?: (place: google.maps.places.Place) => void
  /**
   * Callback invoked when place details cannot be loaded.
   * @param error the error from the Places widget or fetchFields.
   */
  onError?: (error: unknown) => void
  /**
   * The placeholder text for the map search input.
   */
  placeholder?: string
}

/**
 * Displays the Google map with a custom autocomplete control.
 * @param props the React component properties.
 * @returns the React element.
 */
export const CustomMapControl = (props: CustomAutocompleteControlProps) => {
  const {controlPosition, onPlaceSelect, onError, placeholder} = props
  const map = useMap()

  const handlePlaceSelect = useCallback(
    (place: google.maps.places.Place) => {
      if (map && place.viewport) {
        map.fitBounds(place.viewport)
      }
      onPlaceSelect?.(place)
    },
    [map, onPlaceSelect]
  )

  return (
    <MapControl position={controlPosition}>
      <div className="autocomplete-control">
        <PlaceAutocomplete onPlaceSelect={handlePlaceSelect} onError={onError} placeholder={placeholder} />
      </div>
    </MapControl>
  )
}
