import styled from '@emotion/styled'
import {isUndefined} from '@react-form-builder/core'
import {InfoWindow} from '@vis.gl/react-google-maps'
import {useMemo} from 'react'
import type {MapMarker} from './MapMarker'

type MarkerType = google.maps.marker.AdvancedMarkerElement

/**
 * The properties of the marker information component.
 */
interface MarkerInfoProps {
  /**
   * The selected marker.
   */
  marker: MarkerType
  /**
   * The marker data.
   */
  markerData?: MapMarker
  /**
   * If true, the user can change the markers.
   */
  allowChangingMarkers: boolean
  /**
   * The marker window title.
   */
  title: string
  /**
   * The caption for the remove marker button.
   */
  removeMarkerCaption: string
  /**
   * The callback called when the info window is closed.
   */
  onClose?: () => void
  /**
   * The callback called when the marker is deleted.
   */
  onDelete?: () => void
}

const positionToFixed = (pos: MarkerType['position']) => {
  if (!pos) return {}
  return {
    lat: Number(pos.lat)?.toFixed(6),
    lng: Number(pos.lng)?.toFixed(6)
  }
}

const DeleteButton = styled.button`
  width: 100%;
  margin-top: 10px;
  background-color: white;
  border: none;
  color: #f44336;
  padding: 0;
  cursor: pointer;
`

const InfoWindowContent = styled.div`
  padding-inline: 10px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  width: max-content;
  border-collapse: collapse;
  margin-inline-start: -10px;
`

const countrySpanStyle = {marginBottom: 10}
const infoWindowStyle = {backgroundColor: 'white'}

/**
 * Displays the marker information.
 * @param props the React component properties.
 * @returns the React element.
 */
export const MarkerInfo = (props: MarkerInfoProps) => {
  const {marker, markerData, onClose, onDelete, title, removeMarkerCaption, allowChangingMarkers} = props
  const {lat, lng} = positionToFixed(marker.position)
  const {address, city, postalCode, state, country} = markerData?.address ?? {}
  const headerContent = useMemo(() => title ? <b>{title}</b> : null, [title])
  return <InfoWindow anchor={marker} onCloseClick={onClose} style={infoWindowStyle}
                     headerContent={headerContent}>
    <>
      <InfoWindowContent>
        {!isUndefined(markerData?.address) && <>
          <span>{address}</span>
          <span>{`${city}, ${postalCode}, ${state}`}</span>
          <span style={countrySpanStyle}>{country}</span>
        </>}
        <span>{`${lat}, ${lng}`}</span>
      </InfoWindowContent>
      {allowChangingMarkers &&
        <DeleteButton onClick={onDelete}>{removeMarkerCaption}</DeleteButton>
      }
    </>
  </InfoWindow>
}
