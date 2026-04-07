import {useMapsLibrary} from '@vis.gl/react-google-maps'
import cx from 'clsx'
import {useEffect, useRef, useState} from 'react'
import styles from './AutoComplete.module.css'

/**
 * The properties of the PlaceAutocompleteClassic component.
 */
interface PlaceAutocompleteClassicProps {
  /**
   * Callback function to handle place selection.
   * @param place the selected place.
   */
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void

  /**
   * The placeholder text for the map search input.
   */
  placeholder?: string
}

/**
 * Displays the Google map with a place autocomplete input.
 * @param props the React component properties.
 * @param props.onPlaceSelect the callback function to handle place selection.
 * @param props.placeholder the placeholder text for the map search input.
 * @returns the React element.
 */
export const PlaceAutocompleteClassic = ({onPlaceSelect, placeholder}: PlaceAutocompleteClassicProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const places = useMapsLibrary('places')

  useEffect(() => {
    if (!places || !inputRef.current) return

    const options = {
      fields: ['geometry', 'name', 'formatted_address', 'address_components'],
    }

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options))
  }, [places])

  useEffect(() => {
    if (!placeAutocomplete) return

    const listener = placeAutocomplete.addListener('place_changed', () => {
      onPlaceSelect(placeAutocomplete.getPlace())
    })

    return () => listener.remove()
  }, [onPlaceSelect, placeAutocomplete])

  return (
    <div className={cx(styles.container, 'autocomplete-container')}>
      <input ref={inputRef} placeholder={placeholder} className={styles.input}/>
    </div>
  )
}
