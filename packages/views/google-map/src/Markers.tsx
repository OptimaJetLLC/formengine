import type {CollisionBehavior} from '@vis.gl/react-google-maps'
import {useCallback, useMemo, useState} from 'react'
import {AdvancedMarkerWithRef} from './AdvancedMarkerWithRef'
import type {MapMarker} from './MapMarker'

/**
 * The properties of the markers component.
 */
interface MarkersProps {
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

  const onMarkerClick = useCallback(
    (id: string | null, marker?: google.maps.marker.AdvancedMarkerElement) => {
      setSelectedId(id)
      props.onMarkerClick?.(id, marker)
    },
    [props]
  )

  const zIndexSelected = markers.length
  const zIndexHover = markers.length + 1

  const clickHandlers = useMemo(
    () =>
      markers.map(({id}) => {
        return (marker?: google.maps.marker.AdvancedMarkerElement) => onMarkerClick(id, marker)
      }),
    [markers, onMarkerClick]
  )

  const mouseEnterHandlers = useMemo(
    () =>
      markers.map(
        ({id}) =>
          () =>
            setHoverId(id)
      ),
    [markers]
  )
  const mouseLeaveHandlers = useMemo(() => markers.map(() => () => setHoverId(null)), [markers])

  const children = useMemo(
    () =>
      markers.map(({id, zIndex: zIndexDefault, position, title}, index) => {
        let zIndex = zIndexDefault
        if (hoverId === id) zIndex = zIndexHover
        if (selectedId === id) zIndex = zIndexSelected

        return (
          <AdvancedMarkerWithRef
            key={index}
            onMarkerClick={clickHandlers[index]}
            onMouseEnter={mouseEnterHandlers[index]}
            onMouseLeave={mouseLeaveHandlers[index]}
            zIndex={zIndex}
            position={position}
            collisionBehavior={collisionBehavior}
            title={title}
          />
        )
      }),
    [clickHandlers, collisionBehavior, hoverId, markers, mouseEnterHandlers, mouseLeaveHandlers, selectedId, zIndexHover, zIndexSelected]
  )

  return <>{children}</>
}
