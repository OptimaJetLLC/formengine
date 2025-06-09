import type {CollisionBehavior} from '@vis.gl/react-google-maps'
import {useCallback, useState} from 'react'
import {AdvancedMarkerWithRef} from './AdvancedMarkerWithRef'
import type {MapMarker} from './MapMarker'

/**
 * The properties of the markers component.
 */
export interface MarkersProps {
  /**
   * Coordinates of the markers
   */
  markers: MapMarker[]
  /**
   * The markers collision behavior.
   */
  collisionBehavior?: CollisionBehavior
  /**
   * The marker click event.
   * @param id the marker id.
   * @param marker the marker element.
   */
  onMarkerClick?: (id: string | null, marker?: google.maps.marker.AdvancedMarkerElement) => void
}

/**
 * The markers component.
 * @param props the React component properties.
 * @returns the React element.
 */
export const Markers = (props: MarkersProps) => {
  const {markers, collisionBehavior} = props

  const [hoverId, setHoverId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const onMarkerClick = useCallback((id: string | null, marker?: google.maps.marker.AdvancedMarkerElement) => {
    setSelectedId(id)
    props.onMarkerClick?.(id, marker)
  }, [props])

  const zIndexSelected = markers.length
  const zIndexHover = markers.length + 1

  const children = markers.map(({id, zIndex: zIndexDefault, position, title}, index) => {
    let zIndex = zIndexDefault
    if (hoverId === id) zIndex = zIndexHover
    if (selectedId === id) zIndex = zIndexSelected

    return <AdvancedMarkerWithRef
      key={index}
      onMarkerClick={marker => onMarkerClick(id, marker)}
      onMouseEnter={() => setHoverId(id)}
      onMouseLeave={() => setHoverId(null)}
      zIndex={zIndex}
      position={position}
      collisionBehavior={collisionBehavior}
      title={title}
    />
  })

  return <>{children}</>
}
