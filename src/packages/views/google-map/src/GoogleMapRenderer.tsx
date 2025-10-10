import {isNull, useComponentData} from '@react-form-builder/core'
import type {MapCameraChangedEvent, MapMouseEvent} from '@vis.gl/react-google-maps'
import {Map} from '@vis.gl/react-google-maps'
import {useCallback, useEffect, useMemo, useState} from 'react'
import type {Address} from './Address'
import {CustomMapControl} from './CustomMapControl'
import type {GoogleMapProps} from './GoogleMapProps'
import type {MapMarker} from './MapMarker'
import {MarkerInfo} from './MarkerInfo'
import {Markers} from './Markers'
import {toAddress} from './toAddress'
import {useGeocoding} from './useGeocoding'
import {uniqueId, useUniqueId} from './useUniqueId'

const isCorrectPosition = (pos: google.maps.LatLngLiteral) => {
  return !isNull(pos.lat) && !isNull(pos.lng) && !isNaN(pos.lat) && !isNaN(pos.lng)
}

const generateMarkerId = () => uniqueId('m')

const toMarkers = (markers?: MapMarker[]) => {
  if (!markers) return []
  return markers
    .filter(marker => marker.position && isCorrectPosition(marker.position))
    .map(marker => ({
      id: marker.id ?? generateMarkerId(),
      position: marker.position,
      zIndex: marker.zIndex ?? 1,
      title: marker.title,
      address: marker.address,
    }))
}

/**
 * Displays the Google map.
 * @param props the React component properties.
 * @returns the React element.
 */
export const GoogleMapRenderer = (props: Omit<GoogleMapProps, 'apiKey' | 'region' | 'language'>) => {
  const {
    mapId,
    colorScheme,
    collisionBehavior,
    gestureHandling,
    mapTypeId,
    showMapControl,
    mapControlPosition,
    searchPlaceholder,
    addMarkerOnSearch,
    latitude: initialLatitude,
    longitude: initialLongitude,
    zoom: initialZoom,
    allowMultipleMarkers,
    allowChangingMarkers,
    markers: initialMarkers,
    onMarkerAdd,
    onMarkerDelete,
    onMarkerClick,
    onMapClick,
    onPlaceSelect,
    markerWindowTitle,
    removeMarkerCaption,
  } = props

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedMarker, setSelectedMarker] = useState<google.maps.marker.AdvancedMarkerElement | null>(null)
  const [infoWindowShown, setInfoWindowShown] = useState(false)
  const [center, setCenter] = useState({lat: initialLatitude, lng: initialLongitude})
  const [zoom, setZoom] = useState(initialZoom)

  const {field} = useComponentData()

  const markers = useMemo(() => toMarkers(initialMarkers), [initialMarkers])
  const setMarkers = useCallback((value: Array<object>) => {
    field?.setValue?.(value)
  }, [field])

  useEffect(() => {
    setCenter({lat: initialLatitude, lng: initialLongitude})
    setZoom(initialZoom)
  }, [initialLatitude, initialLongitude, initialZoom])

  const handleMarkerClick = useCallback((id: string | null, marker?: google.maps.marker.AdvancedMarkerElement) => {
    if (marker) {
      const mapMarker = markers.find(item => item.id === id) ?? null
      onMarkerClick?.(mapMarker, marker)
    }
    setSelectedId(id)
    setSelectedMarker(marker ?? null)
    setInfoWindowShown(id !== selectedId ? true : !infoWindowShown)
  }, [selectedId, infoWindowShown, onMarkerClick, markers])

  const addMarker = useCallback((position: google.maps.LatLngLiteral, address?: Address) => {
    const newMarker = {
      id: generateMarkerId(),
      position,
      zIndex: 1,
      address: address ?? undefined
    }

    if (!allowChangingMarkers) return

    if (allowMultipleMarkers) {
      setMarkers([...markers, newMarker])
    } else {
      setMarkers([newMarker])
    }
    onMarkerAdd?.(newMarker)
  }, [allowMultipleMarkers, markers, setMarkers, onMarkerAdd, allowChangingMarkers])

  const geocoding = useGeocoding()

  const handleMapClick = useCallback((event: MapMouseEvent) => {
    onMapClick?.(event)
    if (event.detail.latLng) {
      const latLng = event.detail.latLng
      geocoding(latLng).then(response => {
        addMarker(latLng, response?.address)
      }).catch(() => {
        addMarker(latLng)
      })
    }
  }, [addMarker, geocoding, onMapClick])

  const closeMarkerInfoWindow = useCallback(() => {
    setInfoWindowShown(false)
  }, [])

  const handleMarkerDelete = useCallback(() => {
    if (!selectedId || !allowChangingMarkers) return
    const markerToDelete = markers.find(marker => marker.id === selectedId)
    if (markerToDelete) onMarkerDelete?.(markerToDelete)
    setMarkers(markers.filter(marker => marker.id !== selectedId))
    closeMarkerInfoWindow()
  }, [selectedId, closeMarkerInfoWindow, onMarkerDelete, markers, setMarkers, allowChangingMarkers])

  const onZoomChanged = useCallback((event: MapCameraChangedEvent) => {
    setZoom(event.detail.zoom)
  }, [])

  const onCameraChanged = useCallback((event: MapCameraChangedEvent) => {
    setCenter(event.detail.center)
  }, [])

  const handlePlaceSelect = useCallback((place: google.maps.places.PlaceResult) => {
    const address = place.address_components ? toAddress(place.address_components) : undefined
    if (onPlaceSelect) {
      onPlaceSelect(place, address)
    }
    if (addMarkerOnSearch) {
      const position = place.geometry?.location?.toJSON()
      if (position) addMarker(position, address)
    }
  }, [addMarker, onPlaceSelect, addMarkerOnSearch])

  const id = useUniqueId()

  const markerData = useMemo(() => {
    if (!selectedId || !field?.value) return undefined
    const data = field?.value as MapMarker[]
    return data.find(item => item.id === selectedId) ?? markers.find(item => item.id === selectedId)
  }, [field?.value, selectedId, markers])

  return (
    <Map id={id} mapId={mapId} zoom={zoom} center={center}
         onClick={handleMapClick} onZoomChanged={onZoomChanged} onCameraChanged={onCameraChanged}
         colorScheme={colorScheme} gestureHandling={gestureHandling} mapTypeId={mapTypeId}>
      <Markers markers={markers} collisionBehavior={collisionBehavior} onMarkerClick={handleMarkerClick}/>
      {infoWindowShown && selectedMarker &&
        <MarkerInfo marker={selectedMarker} markerData={markerData} allowChangingMarkers={allowChangingMarkers}
                    title={markerWindowTitle} removeMarkerCaption={removeMarkerCaption}
                    onClose={closeMarkerInfoWindow} onDelete={handleMarkerDelete}/>
      }
      {showMapControl && <CustomMapControl controlPosition={mapControlPosition} onPlaceSelect={handlePlaceSelect}
                                           placeholder={searchPlaceholder}
      />}
    </Map>
  )
}
