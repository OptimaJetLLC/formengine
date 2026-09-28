import type {AdvancedMarkerProps} from '@vis.gl/react-google-maps'
import {AdvancedMarker, useAdvancedMarkerRef} from '@vis.gl/react-google-maps'
import {useCallback} from 'react'

/**
 * The properties of the AdvancedMarkerWithRef component.
 */
interface AdvancedMarkerWithRefProps extends AdvancedMarkerProps {
  /**
   * The callback function triggered when a marker is clicked.
   */
  onMarkerClick: (marker: google.maps.marker.AdvancedMarkerElement) => void
}

/**
 * Displays the Google map with an advanced marker.
 * @param props the React component properties.
 * @returns the React element.
 */
export const AdvancedMarkerWithRef = (props: AdvancedMarkerWithRefProps) => {
  const {children, onMarkerClick, ...advancedMarkerProps} = props
  const [markerRef, marker] = useAdvancedMarkerRef()

  const handleClick = useCallback(() => {
    if (marker) onMarkerClick(marker)
  }, [marker, onMarkerClick])

  return (
    <AdvancedMarker {...advancedMarkerProps} onClick={handleClick} ref={markerRef}>
      {children}
    </AdvancedMarker>
  )
}
