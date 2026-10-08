import {useMapsLibrary} from '@vis.gl/react-google-maps'
import cx from 'clsx'
import {useEffect, useRef} from 'react'
import styles from './AutoComplete.module.css'

/**
 * The properties of the PlaceAutocomplete component.
 */
interface PlaceAutocompleteProps {
  /**
   * Callback invoked when a place is selected and its fields are loaded.
   * @param place the selected Place after fetchFields.
   */
  onPlaceSelect: (place: google.maps.places.Place) => void

  /**
   * Callback invoked when place details cannot be loaded or the Places widget reports an error.
   * @param error the error from fetchFields or the Places widget.
   */
  onError?: (error: unknown) => void

  /**
   * The placeholder text for the map search input.
   */
  placeholder?: string
}

const placeFields = ['addressComponents', 'displayName', 'formattedAddress', 'location', 'viewport']

/**
 * Displays the Google map with a place autocomplete input.
 * @param props the React component properties.
 * @param props.onPlaceSelect the callback function to handle place selection.
 * @param props.onError the callback function for place lookup failures.
 * @param props.placeholder the placeholder text for the map search input.
 * @returns the React element.
 */
export const PlaceAutocomplete = ({onPlaceSelect, onError, placeholder}: PlaceAutocompleteProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const onPlaceSelectRef = useRef(onPlaceSelect)
  const onErrorRef = useRef(onError)
  const placeholderRef = useRef(placeholder)
  const autocompleteRef = useRef<google.maps.places.PlaceAutocompleteElement | null>(null)
  const places = useMapsLibrary('places')

  useEffect(() => {
    onPlaceSelectRef.current = onPlaceSelect
    onErrorRef.current = onError
    placeholderRef.current = placeholder
  })

  useEffect(() => {
    if (!places || !containerRef.current) return

    const container = containerRef.current
    const autocomplete = new places.PlaceAutocompleteElement()
    let disposed = false

    autocomplete.className = styles.input
    autocomplete.placeholder = placeholderRef.current ?? null
    autocompleteRef.current = autocomplete

    const selectPlace = async (event: google.maps.places.PlacePredictionSelectEvent) => {
      const place = event.placePrediction.toPlace()

      try {
        await place.fetchFields({fields: placeFields})
        if (!disposed) onPlaceSelectRef.current(place)
      } catch (error) {
        if (!disposed) onErrorRef.current?.(error)
      }
    }

    const handlePlaceSelect = (event: google.maps.places.PlacePredictionSelectEvent) => {
      void selectPlace(event)
    }

    const handleGmpError = (event: Event) => {
      onErrorRef.current?.(event)
    }

    autocomplete.addEventListener('gmp-select', handlePlaceSelect)
    autocomplete.addEventListener('gmp-error', handleGmpError)
    container.append(autocomplete)

    return () => {
      disposed = true
      autocompleteRef.current = null
      autocomplete.removeEventListener('gmp-select', handlePlaceSelect)
      autocomplete.removeEventListener('gmp-error', handleGmpError)
      autocomplete.remove()
    }
  }, [places])

  useEffect(() => {
    if (!autocompleteRef.current) return
    autocompleteRef.current.placeholder = placeholder ?? null
  }, [placeholder])

  return <div ref={containerRef} className={cx(styles.container, 'autocomplete-container')} />
}
