import type {ControlPosition} from '@vis.gl/react-google-maps'
import {MapControl, useMap} from '@vis.gl/react-google-maps'
import {useCallback, useEffect, useState} from 'react'
import {PlaceAutocompleteClassic} from './AutoComplete'

/**
 * The properties of the CustomAutocompleteControl component.
 */
export interface CustomAutocompleteControlProps {
  /**
   * The position of the control on the map.
   */
  controlPosition: ControlPosition
  /**
   * Callback function to handle place selection.
   * @param place the selected place.
   */
  onPlaceSelect?: (place: google.maps.places.PlaceResult) => void
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
  const {controlPosition, onPlaceSelect, placeholder} = props
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null)
  const map = useMap()

  const handlePlaceSelect = useCallback((place: google.maps.places.PlaceResult | null) => {
    setSelectedPlace(place)
    if (place) onPlaceSelect?.(place)
  }, [onPlaceSelect])

  useEffect(() => {
    if (map && selectedPlace?.geometry?.viewport) {
      map.fitBounds(selectedPlace.geometry.viewport)
    }
  }, [map, selectedPlace])

  return <MapControl position={controlPosition}>
    <div className="autocomplete-control">
      <PlaceAutocompleteClassic onPlaceSelect={handlePlaceSelect} placeholder={placeholder}/>
    </div>
  </MapControl>
}
